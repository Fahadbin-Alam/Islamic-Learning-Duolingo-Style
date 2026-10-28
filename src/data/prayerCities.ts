import type { SupportedLanguage } from "../types";

// Big cities a learner can pick for prayer-time lessons. Picking a city keeps the phone's location
// permission out of the app: times are worked out on the phone from these coordinates.

export interface PrayerCity {
  id: string;
  /** ISO country code: picks the usual calculation method there. */
  country: string;
  lat: number;
  lon: number;
  name: Record<SupportedLanguage, string>;
}

function city(id: string, country: string, lat: number, lon: number, en: string, ar: string, bn: string, ur: string): PrayerCity {
  return { id, country, lat, lon, name: { en, ar, bn, ur } };
}

export const PRAYER_CITIES: PrayerCity[] = [
  // South Asia
  city("dhaka", "BD", 23.8103, 90.4125, "Dhaka", "دكا", "ঢাকা", "ڈھاکہ"),
  city("chattogram", "BD", 22.3569, 91.7832, "Chattogram", "شيتاغونغ", "চট্টগ্রাম", "چٹاگانگ"),
  city("sylhet", "BD", 24.8949, 91.8687, "Sylhet", "سيلهيت", "সিলেট", "سلہٹ"),
  city("rajshahi", "BD", 24.3745, 88.6042, "Rajshahi", "راجشاهي", "রাজশাহী", "راجشاہی"),
  city("khulna", "BD", 22.8456, 89.5403, "Khulna", "خولنا", "খুলনা", "کھلنا"),
  city("karachi", "PK", 24.8607, 67.0011, "Karachi", "كراتشي", "করাচি", "کراچی"),
  city("lahore", "PK", 31.5204, 74.3587, "Lahore", "لاهور", "লাহোর", "لاہور"),
  city("islamabad", "PK", 33.6844, 73.0479, "Islamabad", "إسلام آباد", "ইসলামাবাদ", "اسلام آباد"),
  city("peshawar", "PK", 34.0151, 71.5249, "Peshawar", "بيشاور", "পেশোয়ার", "پشاور"),
  city("faisalabad", "PK", 31.4504, 73.135, "Faisalabad", "فيصل آباد", "ফয়সালাবাদ", "فیصل آباد"),
  city("delhi", "IN", 28.6139, 77.209, "Delhi", "دلهي", "দিল্লি", "دہلی"),
  city("mumbai", "IN", 19.076, 72.8777, "Mumbai", "مومباي", "মুম্বাই", "ممبئی"),
  city("hyderabad-in", "IN", 17.385, 78.4867, "Hyderabad", "حيدر آباد", "হায়দরাবাদ", "حیدرآباد"),
  city("kolkata", "IN", 22.5726, 88.3639, "Kolkata", "كولكاتا", "কলকাতা", "کولکاتا"),
  city("bengaluru", "IN", 12.9716, 77.5946, "Bengaluru", "بنغالور", "বেঙ্গালুরু", "بنگلور"),
  city("lucknow", "IN", 26.8467, 80.9462, "Lucknow", "لكناو", "লখনউ", "لکھنؤ"),
  city("kabul", "AF", 34.5553, 69.2075, "Kabul", "كابل", "কাবুল", "کابل"),
  // Middle East
  city("makkah", "SA", 21.3891, 39.8579, "Makkah", "مكة المكرمة", "মক্কা", "مکہ مکرمہ"),
  city("madinah", "SA", 24.5247, 39.5692, "Madinah", "المدينة المنورة", "মদিনা", "مدینہ منورہ"),
  city("riyadh", "SA", 24.7136, 46.6753, "Riyadh", "الرياض", "রিয়াদ", "ریاض"),
  city("jeddah", "SA", 21.4858, 39.1925, "Jeddah", "جدة", "জেদ্দা", "جدہ"),
  city("dubai", "AE", 25.2048, 55.2708, "Dubai", "دبي", "দুবাই", "دبئی"),
  city("abu-dhabi", "AE", 24.4539, 54.3773, "Abu Dhabi", "أبو ظبي", "আবুধাবি", "ابوظہبی"),
  city("doha", "QA", 25.2854, 51.531, "Doha", "الدوحة", "দোহা", "دوحہ"),
  city("kuwait-city", "KW", 29.3759, 47.9774, "Kuwait City", "مدينة الكويت", "কুয়েত সিটি", "کویت سٹی"),
  city("muscat", "OM", 23.588, 58.3829, "Muscat", "مسقط", "মাসকাট", "مسقط"),
  city("cairo", "EG", 30.0444, 31.2357, "Cairo", "القاهرة", "কায়রো", "قاہرہ"),
  city("alexandria", "EG", 31.2001, 29.9187, "Alexandria", "الإسكندرية", "আলেকজান্দ্রিয়া", "اسکندریہ"),
  city("amman", "JO", 31.9454, 35.9284, "Amman", "عمّان", "আম্মান", "عمان"),
  city("al-quds", "PS", 31.7683, 35.2137, "Al-Quds (Jerusalem)", "القدس", "আল-কুদস (জেরুজালেম)", "القدس (یروشلم)"),
  city("baghdad", "IQ", 33.3152, 44.3661, "Baghdad", "بغداد", "বাগদাদ", "بغداد"),
  city("damascus", "SY", 33.5138, 36.2765, "Damascus", "دمشق", "দামেস্ক", "دمشق"),
  city("beirut", "LB", 33.8938, 35.5018, "Beirut", "بيروت", "বৈরুত", "بیروت"),
  city("istanbul", "TR", 41.0082, 28.9784, "Istanbul", "إسطنبول", "ইস্তাম্বুল", "استنبول"),
  city("ankara", "TR", 39.9334, 32.8597, "Ankara", "أنقرة", "আঙ্কারা", "انقرہ"),
  // Africa
  city("casablanca", "MA", 33.5731, -7.5898, "Casablanca", "الدار البيضاء", "কাসাব্লাঙ্কা", "کاسابلانکا"),
  city("algiers", "DZ", 36.7538, 3.0588, "Algiers", "الجزائر", "আলজিয়ার্স", "الجزائر"),
  city("tunis", "TN", 36.8065, 10.1815, "Tunis", "تونس", "তিউনিস", "تیونس"),
  city("lagos", "NG", 6.5244, 3.3792, "Lagos", "لاغوس", "লাগোস", "لاگوس"),
  city("kano", "NG", 12.0022, 8.592, "Kano", "كانو", "কানো", "کانو"),
  city("nairobi", "KE", -1.2921, 36.8219, "Nairobi", "نيروبي", "নাইরোবি", "نیروبی"),
  city("mogadishu", "SO", 2.0469, 45.3182, "Mogadishu", "مقديشو", "মোগাদিশু", "موغادیشو"),
  city("johannesburg", "ZA", -26.2041, 28.0473, "Johannesburg", "جوهانسبرغ", "জোহানেসবার্গ", "جوہانسبرگ"),
  city("cape-town", "ZA", -33.9249, 18.4241, "Cape Town", "كيب تاون", "কেপটাউন", "کیپ ٹاؤن"),
  // South-east Asia and Australia
  city("kuala-lumpur", "MY", 3.139, 101.6869, "Kuala Lumpur", "كوالالمبور", "কুয়ালালামপুর", "کوالالمپور"),
  city("jakarta", "ID", -6.2088, 106.8456, "Jakarta", "جاكرتا", "জাকার্তা", "جکارتہ"),
  city("singapore", "SG", 1.3521, 103.8198, "Singapore", "سنغافورة", "সিঙ্গাপুর", "سنگاپور"),
  city("sydney", "AU", -33.8688, 151.2093, "Sydney", "سيدني", "সিডনি", "سڈنی"),
  city("melbourne", "AU", -37.8136, 144.9631, "Melbourne", "ملبورن", "মেলবোর্ন", "میلبورن"),
  // Europe
  city("london", "GB", 51.5074, -0.1278, "London", "لندن", "লন্ডন", "لندن"),
  city("birmingham", "GB", 52.4862, -1.8904, "Birmingham", "برمنغهام", "বার্মিংহাম", "برمنگھم"),
  city("manchester", "GB", 53.4808, -2.2426, "Manchester", "مانشستر", "ম্যানচেস্টার", "مانچسٹر"),
  city("bradford", "GB", 53.796, -1.7594, "Bradford", "برادفورد", "ব্র্যাডফোর্ড", "بریڈفورڈ"),
  city("paris", "FR", 48.8566, 2.3522, "Paris", "باريس", "প্যারিস", "پیرس"),
  city("berlin", "DE", 52.52, 13.405, "Berlin", "برلين", "বার্লিন", "برلن"),
  city("amsterdam", "NL", 52.3676, 4.9041, "Amsterdam", "أمستردام", "আমস্টারডাম", "ایمسٹرڈیم"),
  city("stockholm", "SE", 59.3293, 18.0686, "Stockholm", "ستوكهولم", "স্টকহোম", "اسٹاک ہوم"),
  // North America
  city("new-york", "US", 40.7128, -74.006, "New York", "نيويورك", "নিউইয়র্ক", "نیویارک"),
  city("philadelphia", "US", 39.9526, -75.1652, "Philadelphia", "فيلادلفيا", "ফিলাডেলফিয়া", "فلاڈیلفیا"),
  city("pittsburgh", "US", 40.4406, -79.9959, "Pittsburgh", "بيتسبرغ", "পিটসবার্গ", "پٹسبرگ"),
  city("washington-dc", "US", 38.9072, -77.0369, "Washington, DC", "واشنطن", "ওয়াশিংটন ডিসি", "واشنگٹن ڈی سی"),
  city("atlanta", "US", 33.749, -84.388, "Atlanta", "أتلانتا", "আটলান্টা", "اٹلانٹا"),
  city("chicago", "US", 41.8781, -87.6298, "Chicago", "شيكاغو", "শিকাগো", "شکاگو"),
  city("detroit", "US", 42.3314, -83.0458, "Detroit", "ديترويت", "ডেট্রয়েট", "ڈیٹرائٹ"),
  city("houston", "US", 29.7604, -95.3698, "Houston", "هيوستن", "হিউস্টন", "ہیوسٹن"),
  city("dallas", "US", 32.7767, -96.797, "Dallas", "دالاس", "ডালাস", "ڈیلس"),
  city("los-angeles", "US", 34.0522, -118.2437, "Los Angeles", "لوس أنجلوس", "লস অ্যাঞ্জেলেস", "لاس اینجلس"),
  city("toronto", "CA", 43.6532, -79.3832, "Toronto", "تورونتو", "টরন্টো", "ٹورنٹو"),
  city("montreal", "CA", 45.5017, -73.5673, "Montreal", "مونتريال", "মন্ট্রিয়ল", "مونٹریال"),
  city("calgary", "CA", 51.0447, -114.0719, "Calgary", "كالغاري", "ক্যালগারি", "کیلگری")
];

export function findPrayerCity(id: string | undefined) {
  return id ? PRAYER_CITIES.find((entry) => entry.id === id) : undefined;
}
