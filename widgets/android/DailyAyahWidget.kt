package __PACKAGE__

import android.app.AlarmManager
import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.util.SizeF
import android.view.View
import android.widget.RemoteViews
import org.json.JSONObject
import java.util.Calendar
import java.util.GregorianCalendar
import java.util.TimeZone

/**
 * Home-screen widget: today's ayah, and on a taller widget today's hadith, from the app's daily card.
 * The text ships in assets/daily_widget.json (written from src/data/widgetData.ts), so it works with no
 * internet and no app open. It turns over at local midnight, the same pair the app shows that day.
 */
class DailyAyahWidget : AppWidgetProvider() {
  override fun onUpdate(context: Context, manager: AppWidgetManager, ids: IntArray) {
    ids.forEach { update(context, manager, it) }
    scheduleMidnight(context)
  }

  override fun onAppWidgetOptionsChanged(context: Context, manager: AppWidgetManager, id: Int, options: Bundle) {
    update(context, manager, id)
  }

  override fun onReceive(context: Context, intent: Intent) {
    super.onReceive(context, intent)
    when (intent.action) {
      ACTION_MIDNIGHT, Intent.ACTION_TIME_CHANGED, Intent.ACTION_TIMEZONE_CHANGED, Intent.ACTION_LOCALE_CHANGED -> {
        val manager = AppWidgetManager.getInstance(context)
        onUpdate(context, manager, manager.getAppWidgetIds(ComponentName(context, DailyAyahWidget::class.java)))
      }
    }
  }

  override fun onDisabled(context: Context) {
    alarmManager(context)?.cancel(midnightIntent(context))
  }

  companion object {
    private const val ACTION_MIDNIGHT = "com.islamiclearning.muslimo.DAILY_WIDGET_MIDNIGHT"
    /** At this height (dp) and up the widget has room for the hadith too. */
    private const val TALL_DP = 180
    private var cached: JSONObject? = null

    private fun data(context: Context): JSONObject =
      cached ?: JSONObject(context.assets.open("daily_widget.json").bufferedReader(Charsets.UTF_8).use { it.readText() }).also { cached = it }

    /** Days since 1 Jan 1970 by the phone's own date, as localDayNumber in src/data/dailyCard.ts. */
    private fun dayNumber(): Long {
      val now = GregorianCalendar()
      val utc = GregorianCalendar(TimeZone.getTimeZone("UTC"))
      utc.clear()
      utc.set(now.get(Calendar.YEAR), now.get(Calendar.MONTH), now.get(Calendar.DAY_OF_MONTH))
      return Math.floorDiv(utc.timeInMillis, 86_400_000L)
    }

    private fun language(context: Context): String {
      val code = context.resources.configuration.locales[0].language
      return if (code == "bn" || code == "ur" || code == "ar") code else "en"
    }

    private fun update(context: Context, manager: AppWidgetManager, id: Int) {
      val views = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
        RemoteViews(mapOf(SizeF(110f, 110f) to build(context, false), SizeF(250f, TALL_DP.toFloat()) to build(context, true)))
      } else {
        val minHeight = manager.getAppWidgetOptions(id).getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT, 0)
        build(context, minHeight >= TALL_DP)
      }
      manager.updateAppWidget(id, views)
    }

    private fun build(context: Context, withHadith: Boolean): RemoteViews {
      val json = data(context)
      val lang = language(context)
      val day = dayNumber()
      val labels = json.getJSONObject("labels").getJSONObject(lang)
      val ayahs = json.getJSONArray("ayahs")
      val ayah = ayahs.getJSONObject((day % ayahs.length()).toInt())
      val meaning = ayah.getJSONObject("meaning").optString(lang, "")

      val views = RemoteViews(context.packageName, R.layout.daily_ayah_widget)
      views.setTextViewText(R.id.daily_widget_ayah_label, labels.getString("ayah"))
      views.setTextViewText(R.id.daily_widget_ayah_arabic, ayah.getString("ar"))
      views.setTextViewText(R.id.daily_widget_ayah_meaning, meaning)
      views.setViewVisibility(R.id.daily_widget_ayah_meaning, if (meaning.isEmpty()) View.GONE else View.VISIBLE)
      views.setTextViewText(R.id.daily_widget_ayah_ref, labels.getString("quran").replace("{ref}", ayah.getString("ref")))

      if (withHadith) {
        val sayings = json.getJSONArray("hadith")
        val saying = sayings.getJSONObject((day % sayings.length()).toInt()).getJSONObject(lang)
        views.setTextViewText(R.id.daily_widget_hadith_label, labels.getString("hadith"))
        views.setTextViewText(R.id.daily_widget_hadith_quote, saying.getString("quote"))
        views.setTextViewText(R.id.daily_widget_hadith_ref, saying.getString("reference"))
      }
      views.setViewVisibility(R.id.daily_widget_hadith, if (withHadith) View.VISIBLE else View.GONE)

      // A tap opens the app on today's ayah and hadith.
      val open = Intent(Intent.ACTION_VIEW, Uri.parse("muslimo://daily")).setPackage(context.packageName)
      views.setOnClickPendingIntent(
        R.id.daily_widget_root,
        PendingIntent.getActivity(context, 0, open, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
      )
      return views
    }

    private fun alarmManager(context: Context) = context.getSystemService(Context.ALARM_SERVICE) as? AlarmManager

    private fun midnightIntent(context: Context): PendingIntent {
      val intent = Intent(context, DailyAyahWidget::class.java).setAction(ACTION_MIDNIGHT)
      return PendingIntent.getBroadcast(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
    }

    /** An inexact alarm just after local midnight (no exact-alarm permission needed); the 3-hour update is the backstop. */
    private fun scheduleMidnight(context: Context) {
      val next = GregorianCalendar().apply {
        add(Calendar.DAY_OF_MONTH, 1)
        set(Calendar.HOUR_OF_DAY, 0)
        set(Calendar.MINUTE, 1)
        set(Calendar.SECOND, 0)
        set(Calendar.MILLISECOND, 0)
      }
      alarmManager(context)?.set(AlarmManager.RTC, next.timeInMillis, midnightIntent(context))
    }
  }
}
