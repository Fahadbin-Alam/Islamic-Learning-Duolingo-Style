import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { COURSE } from "../../data/course";
// Type-only: backendSync pulls in device storage, which a presentational screen must not load.
import type { CrewMember, CrewPayload } from "../../services/backendSync";
import type { SocialRelation, UserProfile } from "../../types";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { Mascot, type MascotMood } from "../Mascot";
import { PopIn } from "../PopIn";
import { Sheet } from "../Sheet";
import { SpeechBubble } from "../SpeechBubble";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, radii, text } from "../theme";
import { formatNumber } from "./FormattedCount";
import { useGrownUpGate } from "./GrownUpGate";
import { TextField } from "./sheetParts";

/** Same shape as the CrewState in src/TopicApp.tsx. */
export type CrewViewState =
  | { status: "idle" | "loading" | "signed_out" }
  | { status: "ready"; payload: CrewPayload }
  | { status: "error"; message: string };

export type CrewViewProps = {
  user: UserProfile;
  crew: CrewViewState;
  inviteEmail: string;
  inviteRelation: SocialRelation;
  onChangeInviteEmail: (value: string) => void;
  onChangeInviteRelation: (value: SocialRelation) => void;
  onAddFriend: () => void;
  onRemoveFriend: (member: CrewMember) => void;
  /** Someone added this learner: true adds them back (both see each other's stats), false says no. */
  onAnswerRequest?: (member: CrewMember, accept: boolean) => void;
  onRefresh: () => void;
  onCreateAccount: () => void;
  /** A guest whose account on this device logged out: the button says LOG IN, as the account sheet will. */
  hasSavedAccount?: boolean;
  /** Tabs replace the old back button; kept optional for the old call site. */
  onDone?: () => void;
  /**
   * Show the no-connection state. Default: an error whose message mentions an internet
   * connection (the message TopicApp sets for offline errors).
   */
  offline?: boolean;
  /**
   * This build has no crew server (isBackendConfigured() is false): show a friendly
   * "coming soon" state with no retry, since trying again can never work.
   */
  unavailable?: boolean;
  mascotVariant?: string;
  accent?: string;
};

// Friend avatars take a topic world color, picked from their id.
const AVATAR_COLORS = COURSE.sections.map((section) => section.accentColor);

function avatarColor(member: CrewMember) {
  if (member.relation === "you") return colors.gem;
  return AVATAR_COLORS[Math.abs(member.id) % AVATAR_COLORS.length] ?? colors.green;
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || name;
}

function initial(name: string) {
  return (firstName(name).charAt(0) || "?").toUpperCase();
}

function medalColor(index: number) {
  // Gold, silver and bronze faces with a dark numeral for contrast.
  if (index === 0) return { face: colors.gold, lip: colors.goldLip, ink: darken(colors.gold, 0.62) };
  if (index === 1) return { face: lighten(colors.inkSoft, 0.5), lip: colors.inkSoft, ink: darken(colors.inkSoft, 0.5) };
  return { face: lighten(colors.flame, 0.35), lip: darken(colors.flame, 0.15), ink: darken(colors.flame, 0.5) };
}

/** Same order as rankWeeklyRace in src/services/backendSync.ts: ties go to the learner, then the bigger total. */
export function rankCrew(me: CrewMember, friends: CrewMember[]) {
  return [me, ...friends].sort(
    (left, right) =>
      right.weeklyXp - left.weeklyXp ||
      Number(right.relation === "you") - Number(left.relation === "you") ||
      right.totalXp - left.totalXp
  );
}

function Empty({ mood, title, button, onPress, busy, mascotVariant, accent, testID, icon }: { mood: MascotMood; title: string; button?: string; onPress?: () => void; busy?: boolean; mascotVariant: string; accent: string; testID: string; icon?: "plus" }) {
  return (
    <PopIn from="up" style={styles.empty}>
      <View testID={testID} style={styles.emptyInner}>
        <Mascot variant={mascotVariant} mood={mood} size={130} accent={accent} />
        <Text style={styles.emptyTitle}>{title}</Text>
        {busy ? <ActivityIndicator color={colors.green} size="large" testID={`${testID}-busy`} /> : null}
        {button && onPress && !busy ? <GameButton label={button} icon={icon} fullWidth onPress={onPress} testID={`${testID}-button`} /> : null}
      </View>
    </PopIn>
  );
}

// Long enough to see: a retry that fails at once must still look like it tried.
const RETRY_SPIN_MS = 800;

function Avatar({ member, size = 40 }: { member: CrewMember; size?: number }) {
  const color = avatarColor(member);
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: color, borderBottomColor: darken(color) }]}>
      <Text style={[styles.avatarText, { fontSize: Math.round(size * 0.45), lineHeight: Math.round(size * 0.58) }]} numberOfLines={1}>
        {initial(member.name)}
      </Text>
    </View>
  );
}

function RaceRow({ entry, index, onOpen }: { entry: CrewMember; index: number; onOpen: (member: CrewMember) => void }) {
  const me = entry.relation === "you";
  const medal = index < 3 ? medalColor(index) : undefined;
  const content = (
    <>
      <View style={[styles.rank, medal ? { backgroundColor: medal.face, borderBottomColor: medal.lip } : null]}>
        <Text style={[styles.rankText, medal ? { color: medal.ink } : null]}>{index + 1}</Text>
      </View>
      <Avatar member={entry} />
      <View style={styles.raceMain}>
        <Text style={styles.raceName} numberOfLines={1}>
          {me ? `${firstName(entry.name)} (you)` : firstName(entry.name)}
        </Text>
        <View style={styles.raceMeta} accessibilityLabel={`${entry.streakDays} day streak`}>
          <Icon name="flame" size={14} color={entry.streakDays > 0 ? undefined : colors.lockedLip} />
          <Text style={styles.raceMetaText} numberOfLines={1}>
            {entry.streakDays}
          </Text>
        </View>
      </View>
      <View style={styles.score}>
        <Icon name="bolt" size={18} />
        <Text style={styles.scoreText} numberOfLines={1}>
          {formatNumber(entry.weeklyXp)}
        </Text>
      </View>
    </>
  );
  return (
    <PopIn delay={Math.min(index, 6) * 70} from="up">
      {me ? (
        <View style={[styles.raceRow, styles.raceRowMe]} testID="crew-row-you">
          {content}
        </View>
      ) : (
        <Tappable onPress={() => onOpen(entry)} style={styles.raceRow} testID={`crew-row-${entry.id}`} accessibilityLabel={`${firstName(entry.name)}, ${entry.weeklyXp} XP`} pressScale={0.98}>
          {content}
        </Tappable>
      )}
    </PopIn>
  );
}

/** Someone who added this learner. Only their name shows until ADD BACK. */
function RequestRow({ member, onAnswer }: { member: CrewMember; onAnswer: (accept: boolean) => void }) {
  return (
    <View style={styles.raceRow} testID={`crew-request-${member.id}`}>
      <Avatar member={member} />
      <View style={styles.raceMain}>
        <Text style={styles.raceName} numberOfLines={1}>{firstName(member.name)}</Text>
        <Text style={styles.raceMetaText} numberOfLines={1}>Wants to race you</Text>
      </View>
      <GameButton label="Add back" size="sm" onPress={() => onAnswer(true)} testID={`crew-accept-${member.id}`} />
      <Tappable onPress={() => onAnswer(false)} style={styles.noLink} accessibilityLabel={`Say no to ${firstName(member.name)}`} hitSlop={6} testID={`crew-decline-${member.id}`}>
        <Icon name="close" size={18} color={colors.inkSoft} />
      </Tappable>
    </View>
  );
}

/** Someone this learner added who has not added them back: just the email they typed, no stats. */
function PendingRow({ member, onCancel }: { member: CrewMember; onCancel: () => void }) {
  return (
    <View style={[styles.raceRow, styles.pendingRow]} testID={`crew-pending-${member.id}`}>
      <Avatar member={member} />
      <View style={styles.raceMain}>
        <Text style={styles.raceName} numberOfLines={1}>{member.name}</Text>
        <Text style={styles.raceMetaText} numberOfLines={1}>Waiting for them to add you</Text>
      </View>
      <Tappable onPress={onCancel} style={styles.noLink} accessibilityLabel={`Cancel invite to ${member.name}`} hitSlop={6} testID={`crew-cancel-${member.id}`}>
        <Icon name="close" size={18} color={colors.inkSoft} />
      </Tappable>
    </View>
  );
}

/** Crew tab: weekly XP race, a grown-up-gated invite sheet, and friendly empty states. */
export function CrewView({
  user,
  crew,
  inviteEmail,
  inviteRelation,
  onChangeInviteEmail,
  onChangeInviteRelation,
  onAddFriend,
  onRemoveFriend,
  onAnswerRequest,
  onRefresh,
  onCreateAccount,
  offline,
  unavailable,
  hasSavedAccount = false,
  mascotVariant = "muslim_man",
  // The brand green like the Mascot's own default; the app passes the topic accent.
  accent = colors.green
}: CrewViewProps) {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [friendSheet, setFriendSheet] = useState<CrewMember | undefined>(undefined);
  const [lastFriend, setLastFriend] = useState<CrewMember | undefined>(undefined);
  // The friend card turns into "Remove?" in place, so a curious tap is never one tap from removing.
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const retryTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { ask, gate } = useGrownUpGate();
  const payload = crew.status === "ready" ? crew.payload : undefined;
  const race = payload ? rankCrew(payload.me, payload.friends) : [];
  const myRank = race.findIndex((entry) => entry.relation === "you") + 1;
  const isOffline = offline ?? (crew.status === "error" && /internet connection/i.test(crew.message));
  const signedOut = crew.status === "signed_out" || !user.hasAccount;
  const emptyProps = { mascotVariant, accent };

  // Nothing else starts the first load when Crew is a tab.
  const refresh = useRef(onRefresh);
  refresh.current = onRefresh;
  useEffect(() => {
    if (crew.status === "idle" && user.hasAccount && !unavailable) refresh.current();
  }, [crew.status, unavailable, user.hasAccount]);
  useEffect(() => () => clearTimeout(retryTimer.current), []);

  const retry = () => {
    setRetrying(true);
    clearTimeout(retryTimer.current);
    retryTimer.current = setTimeout(() => setRetrying(false), RETRY_SPIN_MS);
    onRefresh();
  };

  const openInvite = () => ask(() => setInviteOpen(true));
  const openFriend = (member: CrewMember) => {
    setConfirmRemove(false);
    setLastFriend(member);
    setFriendSheet(member);
  };
  const closeFriend = () => setFriendSheet(undefined);
  const shownFriend = friendSheet ?? lastFriend;
  const canAdd = Boolean(inviteEmail.trim());
  const requests = payload?.requests ?? [];
  const pending = payload?.pending ?? [];
  // Saying yes lets a stranger see this learner's progress, so a grown-up answers it, like inviting.
  const answer = (member: CrewMember, accept: boolean) => (accept ? ask(() => onAnswerRequest?.(member, true)) : onAnswerRequest?.(member, false));
  const waiting =
    requests.length || pending.length ? (
      <View style={[styles.race, styles.waiting]} testID="crew-waiting">
        {requests.map((member) => (
          <RequestRow key={`request_${member.id}`} member={member} onAnswer={(accept) => answer(member, accept)} />
        ))}
        {pending.map((member) => (
          <PendingRow key={`pending_${member.id}`} member={member} onCancel={() => onRemoveFriend(member)} />
        ))}
      </View>
    ) : null;
  const add = () => {
    if (!canAdd) return;
    setInviteOpen(false);
    onAddFriend();
  };

  let body: React.ReactNode;
  if (unavailable) {
    body = <Empty {...emptyProps} testID="crew-soon" mood="happy" title="Crew is coming soon!" />;
  } else if (signedOut) {
    // An account without a server session (made offline), or a saved one that logged out, logs in; everyone else signs up.
    body = (
      <Empty
        {...emptyProps}
        testID="crew-signed-out"
        mood="wave"
        title="Race your friends!"
        button={user.hasAccount || hasSavedAccount ? "Log in" : "Sign up"}
        onPress={onCreateAccount}
      />
    );
  } else if (isOffline) {
    body = <Empty {...emptyProps} testID="crew-offline" mood="sad" title="No internet" button="Try again" onPress={retry} busy={retrying} />;
  } else if (crew.status === "error") {
    // The backend message can be technical; children see a short line. TopicApp logs the real one.
    body = <Empty {...emptyProps} testID="crew-error" mood="sad" title="Oops!" button="Try again" onPress={retry} busy={retrying} />;
  } else if (!payload) {
    body = <Empty {...emptyProps} testID="crew-loading" mood="think" title="Finding your crew..." busy />;
  } else if (!payload.friends.length && !waiting) {
    body = <Empty {...emptyProps} testID="crew-empty" mood="wave" title="Add a friend to race!" button="Invite" icon="plus" onPress={openInvite} />;
  } else if (!payload.friends.length) {
    body = (
      <>
        {waiting}
        <View style={styles.inviteWrap}>
          <GameButton label="Invite" icon="plus" fullWidth onPress={openInvite} testID="crew-invite" />
        </View>
      </>
    );
  } else {
    body = (
      <>
        {waiting}
        <View style={styles.mascotRow}>
          <Mascot variant={mascotVariant} mood={myRank === 1 ? "cheer" : "happy"} size={78} accent={accent} />
          <View style={styles.bubbleWrap}>
            <SpeechBubble>{`You're #${myRank} this week!`}</SpeechBubble>
          </View>
        </View>

        <View style={styles.race} testID="crew-race">
          {race.map((entry, index) => (
            <RaceRow key={`${entry.relation}_${entry.id}`} entry={entry} index={index} onOpen={openFriend} />
          ))}
        </View>

        <View style={styles.inviteWrap}>
          <GameButton label="Invite" icon="plus" fullWidth onPress={openInvite} testID="crew-invite" />
        </View>
      </>
    );
  }

  const canRefresh = !signedOut && !unavailable && (crew.status === "ready" || crew.status === "error");

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        testID="crew-view"
        refreshControl={canRefresh ? <RefreshControl refreshing={false} onRefresh={onRefresh} tintColor={colors.green} colors={[colors.green]} /> : undefined}
      >
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            Crew
          </Text>
          {payload ? (
            <View style={styles.weekPill} accessibilityLabel={`${payload.me.weeklyXp} XP this week`}>
              <Icon name="bolt" size={20} />
              <Text style={styles.weekText} numberOfLines={1}>{`${formatNumber(payload.me.weeklyXp)} XP`}</Text>
            </View>
          ) : null}
        </View>
        {body}
      </ScrollView>

      <Sheet visible={inviteOpen} onClose={() => setInviteOpen(false)} testID="crew-invite-sheet">
        <View style={styles.sheetHead}>
          <Text style={styles.sheetTitle} numberOfLines={2}>
            Invite a friend
          </Text>
          <Tappable onPress={() => setInviteOpen(false)} style={styles.sheetClose} accessibilityLabel="Close" hitSlop={8} pressScale={0.9}>
            <Icon name="close" size={20} color={colors.inkSoft} />
          </Tappable>
        </View>
        <TextField
          value={inviteEmail}
          onChangeText={onChangeInviteEmail}
          placeholder="Their email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="done"
          onSubmitEditing={add}
          testID="crew-email"
          accessibilityLabel="Friend's email"
        />
        <View style={styles.chips}>
          {(["friend", "parent"] as const).map((relation) => {
            const active = inviteRelation === relation;
            return (
              <Tappable
                key={relation}
                onPress={() => onChangeInviteRelation(relation)}
                style={[styles.chip, active ? styles.chipActive : null]}
                accessibilityRole="radio"
                accessibilityState={{ checked: active }}
                testID={`crew-relation-${relation}`}
                pressScale={0.95}
              >
                <Icon name={relation === "parent" ? "family" : "people"} size={22} />
                <Text style={[styles.chipText, active ? styles.chipTextActive : null]} numberOfLines={1}>
                  {relation === "parent" ? "Parent" : "Friend"}
                </Text>
              </Tappable>
            );
          })}
        </View>
        <GameButton label="Add" icon="plus" fullWidth disabled={!canAdd} onPress={add} testID="crew-add" />
      </Sheet>

      <Sheet visible={friendSheet !== undefined} onClose={closeFriend} testID="crew-friend-sheet">
        {shownFriend && confirmRemove ? (
          <PopIn key="confirm" style={styles.friendSheet}>
            <Mascot variant={mascotVariant} mood="sad" size={88} accent={accent} />
            <Text style={styles.sheetTitleCenter} numberOfLines={2}>
              {`Remove ${firstName(shownFriend.name)}?`}
            </Text>
            <GameButton label="Keep" fullWidth onPress={() => setConfirmRemove(false)} testID="crew-remove-keep" />
            <GameButton
              label="Remove"
              variant="secondary"
              color={colors.wrongInk}
              fullWidth
              onPress={() => {
                closeFriend();
                onRemoveFriend(shownFriend);
              }}
              testID={`crew-remove-${shownFriend.id}`}
            />
          </PopIn>
        ) : shownFriend ? (
          <View style={styles.friendSheet}>
            <Avatar member={shownFriend} size={72} />
            <Text style={styles.sheetTitleCenter} numberOfLines={2}>
              {firstName(shownFriend.name)}
            </Text>
            <View style={styles.friendStats}>
              <View style={styles.friendStat}>
                <Icon name="flame" size={22} />
                <Text style={styles.friendStatText}>{shownFriend.streakDays}</Text>
              </View>
              <View style={styles.friendStat}>
                <Icon name="bolt" size={22} />
                <Text style={styles.friendStatText}>{formatNumber(shownFriend.weeklyXp)}</Text>
              </View>
            </View>
            <GameButton label="OK" fullWidth onPress={closeFriend} testID="crew-friend-ok" />
            <Tappable onPress={() => setConfirmRemove(true)} style={styles.removeLink} accessibilityLabel={`Remove ${firstName(shownFriend.name)}`} testID={`crew-ask-remove-${shownFriend.id}`}>
              <Text style={styles.removeLinkText}>Remove</Text>
            </Tappable>
          </View>
        ) : null}
      </Sheet>
      {gate}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.snow
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    flexGrow: 1
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8
  },
  title: {
    ...text.h1,
    flexShrink: 1,
    marginRight: "auto"
  },
  weekPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radii.pill,
    backgroundColor: lighten(colors.gold, 0.78)
  },
  weekText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 22,
    color: darken(colors.gold, 0.55)
  },
  mascotRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 12
  },
  bubbleWrap: {
    flex: 1,
    minWidth: 0,
    marginLeft: 6
  },
  race: {
    gap: 8
  },
  raceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.line,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white
  },
  raceRowMe: {
    backgroundColor: lighten(colors.gem, 0.88),
    borderColor: lighten(colors.gem, 0.45),
    borderBottomColor: colors.gem
  },
  rank: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  rankText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 20,
    color: colors.inkSoft
  },
  avatar: {
    borderBottomWidth: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  avatarText: {
    fontFamily: fonts.displayHeavy,
    color: colors.white
  },
  raceMain: {
    flex: 1,
    minWidth: 0
  },
  raceName: {
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 21,
    color: colors.ink
  },
  raceMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  raceMetaText: {
    ...text.tiny,
    fontSize: 12,
    lineHeight: 16,
    flexShrink: 1
  },
  score: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2
  },
  scoreText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 24,
    color: colors.goldLip
  },
  inviteWrap: {
    marginTop: 18
  },
  sheetHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14
  },
  sheetTitle: {
    ...text.h2,
    flex: 1,
    minWidth: 0
  },
  sheetTitleCenter: {
    ...text.h2,
    textAlign: "center",
    flexShrink: 1
  },
  sheetClose: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.mist,
    alignItems: "center",
    justifyContent: "center"
  },
  friendSheet: {
    alignItems: "center",
    gap: 12
  },
  friendStats: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 6
  },
  friendStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.mist
  },
  friendStatText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 24,
    color: colors.ink
  },
  waiting: {
    marginBottom: 16
  },
  pendingRow: {
    backgroundColor: colors.snow
  },
  noLink: {
    minWidth: 36,
    minHeight: 36,
    alignItems: "center",
    justifyContent: "center"
  },
  removeLink: {
    minHeight: 40,
    paddingHorizontal: 16,
    justifyContent: "center"
  },
  removeLinkText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 20,
    color: colors.wrongInk
  },
  chips: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
    marginBottom: 16
  },
  chip: {
    flex: 1,
    flexBasis: 0,
    minWidth: 0,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.line,
    backgroundColor: colors.white
  },
  chipActive: {
    borderColor: colors.gem,
    backgroundColor: lighten(colors.gem, 0.88)
  },
  chipText: {
    fontFamily: fonts.display,
    fontSize: 17,
    lineHeight: 22,
    color: colors.inkSoft,
    flexShrink: 1
  },
  chipTextActive: {
    color: colors.gemLip
  },
  empty: {
    flex: 1,
    justifyContent: "center"
  },
  emptyInner: {
    alignItems: "center",
    gap: 14,
    paddingVertical: 24
  },
  emptyTitle: {
    ...text.h2,
    textAlign: "center",
    flexShrink: 1
  }
});
