import SwiftUI
import WidgetKit

// Home-screen widget: today's ayah and, on the large size, today's hadith, from the app's daily card.
// The text ships inside the widget (DailyData.swift, written from src/data/widgetData.ts), so it works with
// no internet and no app open. It turns over at local midnight, the same pair the app shows that day.

struct DailyWidgetData: Decodable {
  struct Labels: Decodable { let ayah: String; let hadith: String; let quran: String }
  struct Ayah: Decodable { let ref: String; let ar: String; let meaning: [String: String] }
  struct Saying: Decodable { let quote: String; let reference: String }
  let labels: [String: Labels]
  let ayahs: [Ayah]
  let hadith: [[String: Saying]]

  static let shared: DailyWidgetData? = try? JSONDecoder().decode(DailyWidgetData.self, from: Data(dailyWidgetJSON.utf8))
}

/// The phone's language if the app speaks it, else English.
func widgetLanguage() -> String {
  let code = String((Locale.preferredLanguages.first ?? "en").prefix(2))
  return ["bn", "ur", "ar"].contains(code) ? code : "en"
}

/// Days since 1 Jan 1970 by the phone's own date, as localDayNumber in src/data/dailyCard.ts. Always the
/// Gregorian date, as in the app, even when the phone shows another calendar.
func dayNumber(_ date: Date) -> Int {
  var local = Calendar(identifier: .gregorian)
  local.timeZone = TimeZone.current
  var utc = Calendar(identifier: .gregorian)
  utc.timeZone = TimeZone(identifier: "UTC")!
  let parts = local.dateComponents([.year, .month, .day], from: date)
  let midnight = utc.date(from: DateComponents(year: parts.year, month: parts.month, day: parts.day)) ?? date
  return Int(floor(midnight.timeIntervalSince1970 / 86_400))
}

struct DailyEntry: TimelineEntry {
  let date: Date
  let ayahLabel: String
  let arabic: String
  let meaning: String?
  let ayahRef: String
  let hadithLabel: String
  let quote: String
  let quoteRef: String

  static func on(_ date: Date) -> DailyEntry {
    let lang = widgetLanguage()
    guard let data = DailyWidgetData.shared, !data.ayahs.isEmpty, !data.hadith.isEmpty,
          let labels = data.labels[lang] ?? data.labels["en"] else {
      return DailyEntry(date: date, ayahLabel: "Muslimo", arabic: "", meaning: nil, ayahRef: "", hadithLabel: "", quote: "", quoteRef: "")
    }
    let day = dayNumber(date)
    let ayah = data.ayahs[day % data.ayahs.count]
    let sayings = data.hadith[day % data.hadith.count]
    let saying = sayings[lang] ?? sayings["en"]
    return DailyEntry(
      date: date,
      ayahLabel: labels.ayah,
      arabic: ayah.ar,
      meaning: ayah.meaning[lang],
      ayahRef: labels.quran.replacingOccurrences(of: "{ref}", with: ayah.ref),
      hadithLabel: labels.hadith,
      quote: saying?.quote ?? "",
      quoteRef: saying?.reference ?? ""
    )
  }
}

struct DailyProvider: TimelineProvider {
  func placeholder(in context: Context) -> DailyEntry { DailyEntry.on(Date()) }

  func getSnapshot(in context: Context, completion: @escaping (DailyEntry) -> Void) {
    completion(DailyEntry.on(Date()))
  }

  // Today's entry, then the next one at local midnight; WidgetKit asks again after that.
  func getTimeline(in context: Context, completion: @escaping (Timeline<DailyEntry>) -> Void) {
    let now = Date()
    let calendar = Calendar(identifier: .gregorian)
    let tomorrow = calendar.startOfDay(for: calendar.date(byAdding: .day, value: 1, to: now) ?? now.addingTimeInterval(86_400))
    completion(Timeline(entries: [DailyEntry.on(now), DailyEntry.on(tomorrow)], policy: .atEnd))
  }
}

private let green = Color(red: 0x17 / 255, green: 0x8A / 255, blue: 0x56 / 255)
private let greenSoft = Color(red: 0xE4 / 255, green: 0xF7 / 255, blue: 0xEE / 255)
private let blue = Color(red: 0x16 / 255, green: 0x83 / 255, blue: 0xD1 / 255)
private let blueSoft = Color(red: 0xEA / 255, green: 0xF6 / 255, blue: 0xFF / 255)
private let ink = Color(red: 0x1F / 255, green: 0x2D / 255, blue: 0x27 / 255)
private let inkSoft = Color(red: 0x4A / 255, green: 0x5A / 255, blue: 0x53 / 255)

struct DailyWidgetView: View {
  @Environment(\.widgetFamily) var family
  let entry: DailyEntry

  var body: some View {
    VStack(alignment: .leading, spacing: 6) {
      Text(entry.ayahLabel)
        .font(.caption.weight(.bold))
        .foregroundColor(green)
        .lineLimit(1)
        .padding(.horizontal, 8)
        .padding(.vertical, 2)
        .background(Capsule().fill(greenSoft))
      Text(entry.arabic)
        .font(.system(size: family == .systemSmall ? 18 : 22))
        .foregroundColor(ink)
        .multilineTextAlignment(.center)
        .environment(\.layoutDirection, .rightToLeft)
        .minimumScaleFactor(0.5)
        .lineLimit(family == .systemSmall ? 4 : 3)
        .frame(maxWidth: .infinity)
      if family != .systemSmall, let meaning = entry.meaning {
        Text(meaning)
          .font(.footnote)
          .foregroundColor(inkSoft)
          .multilineTextAlignment(.center)
          .minimumScaleFactor(0.8)
          .lineLimit(family == .systemLarge ? 4 : 2)
          .frame(maxWidth: .infinity)
      }
      Text(entry.ayahRef)
        .font(.caption2.weight(.bold))
        .foregroundColor(green)
        .lineLimit(1)
        .frame(maxWidth: .infinity)
      if family == .systemLarge && !entry.quote.isEmpty {
        Spacer(minLength: 4)
        VStack(alignment: .leading, spacing: 3) {
          Text(entry.hadithLabel).font(.caption.weight(.bold)).foregroundColor(blue).lineLimit(1)
          Text(entry.quote).font(.footnote).foregroundColor(ink).lineLimit(4).minimumScaleFactor(0.8)
          Text(entry.quoteRef).font(.caption2).foregroundColor(inkSoft).lineLimit(1)
        }
        .padding(10)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(RoundedRectangle(cornerRadius: 14).fill(blueSoft))
      }
    }
    .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
    .widgetURL(URL(string: "muslimo://daily"))
    .dailyWidgetBackground()
  }
}

extension View {
  /// iOS 17 asks widgets for a container background; older phones get the plain padding.
  @ViewBuilder func dailyWidgetBackground() -> some View {
    if #available(iOSApplicationExtension 17.0, *) {
      containerBackground(for: .widget) { Color.white }
    } else {
      padding().background(Color.white)
    }
  }
}

@main
struct DailyWidget: Widget {
  var body: some WidgetConfiguration {
    StaticConfiguration(kind: "DailyWidget", provider: DailyProvider()) { entry in
      DailyWidgetView(entry: entry)
    }
    .configurationDisplayName("Ayah of the day")
    .description("Today's ayah and hadith from Muslimo.")
    .supportedFamilies([.systemSmall, .systemMedium, .systemLarge])
  }
}
