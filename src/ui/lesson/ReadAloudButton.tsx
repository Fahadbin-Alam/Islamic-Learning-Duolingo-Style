import React from "react";
import { StyleSheet, View } from "react-native";
import { t } from "../../i18n";
import { Icon } from "../Icon";
import { Tappable } from "../Tappable";
import { colors, lip, radii } from "../theme";

/** As tall as the big button beside it (CONTINUE, CHECK), lip and all. */
export const READ_BUTTON = 54;

/**
 * The speaker beside a lesson's big button: the teacher reads out the page (next to CONTINUE) or the question (next
 * to CHECK). While it reads, the button fills and shows a stop square; a tap stops it.
 */
export function ReadAloudButton({ reading, onPress, testID = "learn-read-aloud" }: { reading: boolean; onPress: () => void; testID?: string }) {
  return (
    <Tappable
      onPress={onPress}
      style={styles.readButton}
      pressScale={0.92}
      accessibilityRole="button"
      accessibilityLabel={reading ? t("Stop") : t("Read it to me")}
      accessibilityState={{ selected: reading }}
      testID={testID}
    >
      <View style={[styles.readLip, reading ? styles.readLipOn : null]} />
      <View style={[styles.readFace, reading ? styles.readFaceOn : null]}>
        {reading ? <View style={styles.readStop} testID={`${testID}-stop`} /> : <Icon name="speaker" size={26} color={colors.gem} />}
      </View>
    </Tappable>
  );
}

/** A lesson's big button with the speaker before it (on the reading side), or alone when there is nothing to read. */
export function WithReadAloud({
  onRead,
  reading,
  testID,
  children
}: {
  onRead?: () => void;
  reading: boolean;
  testID?: string;
  children: React.ReactNode;
}) {
  if (!onRead) return <>{children}</>;
  return (
    <View style={styles.barRow}>
      <ReadAloudButton reading={reading} onPress={onRead} testID={testID} />
      <View style={styles.barMain}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  barRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8
  },
  barMain: {
    flex: 1,
    minWidth: 0
  },
  readButton: {
    width: READ_BUTTON,
    height: READ_BUTTON + lip.button
  },
  readLip: {
    position: "absolute",
    left: 0,
    right: 0,
    top: lip.button,
    height: READ_BUTTON,
    borderRadius: radii.button,
    backgroundColor: colors.lineLip
  },
  readLipOn: {
    backgroundColor: colors.gemLip
  },
  readFace: {
    width: READ_BUTTON,
    height: READ_BUTTON,
    borderRadius: radii.button,
    borderWidth: 2,
    borderColor: colors.line,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center"
  },
  readFaceOn: {
    borderColor: colors.gem,
    backgroundColor: colors.gem
  },
  readStop: {
    width: 16,
    height: 16,
    borderRadius: 3,
    backgroundColor: colors.white
  }
});
