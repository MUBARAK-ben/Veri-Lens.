export const uiTranslations = {
  en: {
    score: "Score",
    streak: "Streak",
    rank: "Rank",
    triageBtn: "60s Pre-Click Check",
    helper: "Click highlighted or suspicious phrases in the message/post to pin Red Flag evidence tags, or use a Forensic Lens on the right.",
    lensHeading: "Forensic X-Ray Lenses",
    lensDesc: "Activate a lens to inspect hidden signals before deciding.",
    verdictHeading: "Your Verdict",
    verdictDesc: "What is the safest, most accurate classification for this item?",
    btnScam: "Scam / Phishing",
    btnMisinfo: "False / Misleading",
    btnSafe: "Safe / Legitimate",
    nextCase: "Next Case →",
    clearPins: "Clear Pins"
  },
  ha: {
    score: "Maki",
    streak: "Jeri",
    rank: "Matsayi",
    triageBtn: "Binciken Sakan 60",
    helper: "Danna jimlolin da ke da alamar tambaya a cikin saƙon don ajiye shaida, ko yi amfani da madubin bincike a gefen dama.",
    lensHeading: "Madubin Binciken Sirri",
    lensDesc: "Zaɓi madubi guda don bincika ɓoyayyun alamu kafin yanke shawara.",
    verdictHeading: "Hukuncinka",
    verdictDesc: "Wane irin rarrabuwa ne ya fi dacewa da wannan saƙon?",
    btnScam: "Zamba / Phishing",
    btnMisinfo: "Ƙarya / Yaɗa Jita-jita",
    btnSafe: "Amintacce / Na Gaskiya",
    nextCase: "Saƙo Na Gaba →",
    clearPins: "Share Alamu"
  },
  ar: {
    score: "النقاط",
    streak: "التتابع",
    rank: "الرتبة",
    triageBtn: "فحص سريع ٦٠ ثانية",
    helper: "انقر على العبارات المشبوهة داخل الرسالة لتثبيت علامات الخطر، أو استخدم عدسات الفحص الرقمي على الجانب.",
    lensHeading: "عدسات الفحص الرقمي",
    lensDesc: "فعّل إحدى العدسات لفحص المؤشرات الخفية قبل اتخاذ قرارك.",
    verdictHeading: "قرارك النهائي",
    verdictDesc: "ما هو التصنيف الأدق والأكثر أماناً لهذه الرسالة؟",
    btnScam: "احتيال / تصيد إلكتروني",
    btnMisinfo: "معلومات مضللة / شائعة",
    btnSafe: "آمن / رسمي وموثوق",
    nextCase: "الحالة التالية ←",
    clearPins: "مسح العلامات"
  }
};

export const scenarios = [
  {
    id: "case-01",
    category: "Phishing & Smishing",
    difficulty: "Beginner",
    channel: "SMS Alert",
    verdict: "scam",
    senderDisplay: "CBN-RELIEF-PORTAL",
    senderMetadata: "+234 812 000 9481 (Unverified Third-Party SMS Relay)",
    timestamp: "08:14 AM",
    forensics: {
      sender: "Display name mimics a government/relief program, but the actual origin is a standard mobile number via a bulk SMS relay.",
      url: "https://cbn-grant-claim-portal.xyz/login — '.xyz' is not an official government (.gov.ng) domain.",
      urgency: "Uses a short 3-hour deadline to push hasty clicks before people verify.",
      metadata: "Official government grants are announced through verified channels and never ask for bank PINs or OTPs on third-party forms."
    },
    locales: {
      en: {
        segments: [
          {
            id: "s1-1",
            text: "FINAL NOTICE: Your household grant allocation expires in 3 hours. ",
            isRedFlag: true,
            tactic: "Artificial Urgency",
            explanation: "Scammers create tight deadlines so victims skip checking official sources."
          },
          {
            id: "s1-2",
            text: "Confirm your BVN, card PIN, and SMS OTP here to release funds: ",
            isRedFlag: true,
            tactic: "Credential & PIN Harvesting",
            explanation: "Legitimate institutions never ask you to enter your PIN or OTP on a link sent by text."
          },
          {
            id: "s1-3",
            text: "https://cbn-grant-claim-portal.xyz/login",
            isRedFlag: true,
            isLink: true,
            tactic: "Lookalike / Non-Official Domain",
            explanation: "Attackers string official-sounding words together on cheap domains to imitate real agencies."
          }
        ],
        defenseTip: "Do not click links in unexpected payment or grant texts. Check official agency announcements directly."
      },
      ha: {
        segments: [
          {
            id: "s1-1",
            text: "SANARWAR ƘARSHE: Tallafin kuɗin gidanku zai ƙare nan da awanni 3. ",
            isRedFlag: true,
            tactic: "Gaggawar Karya",
            explanation: "Masu zamba suna sanya ƙaramin lokaci don kada mutane su bincika gaskiya."
          },
          {
            id: "s1-2",
            text: "Tabbatar da BVN, lambar sirrin kati (PIN), da lambar OTP anan don karɓar kuɗin: ",
            isRedFlag: true,
            tactic: "Satar Bayanan Sirri",
            explanation: "Babu wata hukuma ta gaskiya da za ta nemi PIN ko OTP ta hanyar hanyar haɗin SMS."
          },
          {
            id: "s1-3",
            text: "https://cbn-grant-claim-portal.xyz/login",
            isRedFlag: true,
            isLink: true,
            tactic: "Adireshin Yanar Gizo na Bogi",
            explanation: "Wannan ba adireshin gwamnati (.gov.ng) ba ne."
          }
        ],
        defenseTip: "Kada ka danna hanyoyin haɗi a cikin saƙonnin tallafi da ba ka nema ba."
      },
      ar: {
        segments: [
          {
            id: "s1-1",
            text: "إشعار أخير: ستنتهي صلاحية منحة الدعم المخصصة لك خلال ٣ ساعات فقط. ",
            isRedFlag: true,
            tactic: "استعجال مفتعل",
            explanation: "يستخدم المحتالون مهلة زمنية قصيرة لدفع الضحية للتصرف دون تحقق."
          },
          {
            id: "s1-2",
            text: "أكّد رقم الهوية البنكية والرمز السري للبطاقة ورمز التحقق (OTP) هنا لصرف المبلغ: ",
            isRedFlag: true,
            tactic: "سرقة البيانات السرية",
            explanation: "لا تطلب أي جهة رسمية الرقم السري أو رمز OTP عبر رابط نصي."
          },
          {
            id: "s1-3",
            text: "https://cbn-grant-claim-portal.xyz/login",
            isRedFlag: true,
            isLink: true,
            tactic: "نطاق إلكتروني مزيف",
            explanation: "الامتداد .xyz ليس نطاقاً حكومياً رسمياً."
          }
        ],
        defenseTip: "لا تنقر على الروابط في الرسائل النصية غير المتوقعة، وتحقق دائماً من الموقع الرسمي للجهة."
      }
    }
  },
  {
    id: "case-02",
    category: "Viral Misinformation",
    difficulty: "Intermediate",
    channel: "WhatsApp Forward",
    verdict: "misinformation",
    senderDisplay: "Forwarded many times",
    senderMetadata: "Shared across group chats without primary source attribution",
    timestamp: "Yesterday",
    forensics: {
      sender: "Forwarded chain message with no named author, institution, or verifiable primary report.",
      url: "No official link provided—only an unverified claim encouraging mass forwarding.",
      urgency: "Tells readers to 'share immediately before it gets deleted'—a classic viral amplification hook.",
      metadata: "Sensational medical cures circulating as 'secretly suppressed' facts lack peer-reviewed evidence."
    },
    locales: {
      en: {
        segments: [
          {
            id: "s2-1",
            text: "Doctors are hiding this simple mixture that cures malaria and typhoid overnight! ",
            isRedFlag: true,
            tactic: "Unverified Health Claim",
            explanation: "Claims of 'hidden cures' bypassing proper medical care put people at serious risk."
          },
          {
            id: "s2-2",
            text: "Forward this to at least 7 groups right now before authorities take this post down.",
            isRedFlag: true,
            tactic: "Forced Virality & Censorship Bait",
            explanation: "Chain prompts pressure users to spread unvetted claims before anyone checks the facts."
          }
        ],
        defenseTip: "Pause before forwarding health claims. Cross-check with public health authorities or qualified doctors."
      },
      ha: {
        segments: [
          {
            id: "s2-1",
            text: "Likitoci suna ɓoye wannan haɗin magani mai sauƙi da ke warkar da zazzabin cizon sauro da typhoid cikin dare ɗaya! ",
            isRedFlag: true,
            tactic: "Da'awar Lafiya Marar Tushe",
            explanation: "Magungunan da ba a tantance ba suna jefa lafiyar mutane cikin haɗari."
          },
          {
            id: "s2-2",
            text: "Tura wannan zuwa guruf-guruf akalla 7 yanzu kafin a goge saƙon.",
            isRedFlag: true,
            tactic: "Tursasa Yaɗa Saƙo",
            explanation: "Masu yaɗa jita-jita suna amfani da wannan dabara don saƙon ya bazu da sauri."
          }
        ],
        defenseTip: "Dakata kafin tura saƙonnin kiwon lafiya. Tabbatar da sahihanci daga hukumar lafiya."
      },
      ar: {
        segments: [
          {
            id: "s2-1",
            text: "الأطباء يخفون هذه الخلطة البسيطة التي تشفي من الملاريا والتيفوئيد في ليلة واحدة! ",
            isRedFlag: true,
            tactic: "ادعاء طبي غير موثق",
            explanation: "الادعاءات العلاجية المجهولة المصدر تعرّض صحة الناس للخطر."
          },
          {
            id: "s2-2",
            text: "أعد إرسال هذه الرسالة إلى ٧ مجموعات فوراً قبل أن تقوم الجهات بحذفها.",
            isRedFlag: true,
            tactic: "تحفيز الانتشار السريع",
            explanation: "الضغط لإعادة النشر قبل الحذف أسلوب شائع لنشر الشائعات."
          }
        ],
        defenseTip: "توقف وتحقق من المعلومات الصحية عبر المصادر الطبية الرسمية قبل إعادة إرسالها."
      }
    }
  },
  {
    id: "case-03",
    category: "Job & Advance-Fee Scams",
    difficulty: "Beginner",
    channel: "Email / DM Offer",
    verdict: "scam",
    senderDisplay: "Global Remote Careers HR <hr-recruitment@gmail.com>",
    senderMetadata: "Free @gmail.com address; generic greeting; no interview conducted",
    timestamp: "11:42 AM",
    forensics: {
      sender: "Uses a free @gmail.com address instead of an official company corporate domain.",
      url: "Asks for direct bank transfer for 'onboarding & laptop clearance' rather than an HR portal.",
      urgency: "Demands payment within 4 hours to avoid losing the job slot.",
      metadata: "Legitimate employers never ask job candidates to pay upfront fees to get hired."
    },
    locales: {
      en: {
        segments: [
          {
            id: "s3-1",
            text: "Congratulations! You have been selected for a remote Data Entry role ($3,200/month) with no interview required. ",
            isRedFlag: true,
            tactic: "Too-Good-To-Be-True Offer",
            explanation: "High-paying roles offered instantly with zero screening are classic recruitment bait."
          },
          {
            id: "s3-2",
            text: "Pay a refundable $45 registration and equipment clearance fee today to receive your offer letter.",
            isRedFlag: true,
            tactic: "Advance-Fee Fraud",
            explanation: "Real employers pay you for your work—they never ask applicants to pay upfront fees."
          }
        ],
        defenseTip: "Never pay a registration, training, or clearance fee to secure a job offer."
      },
      ha: {
        segments: [
          {
            id: "s3-1",
            text: "Taya murna! An zaɓe ka don aikin kwamfuta daga gida ($3,200 a wata) ba tare da an yi maka tambayoyi (interview) ba. ",
            isRedFlag: true,
            tactic: "Tayin Aiki Mai Ban Mamaki",
            explanation: "Babban albashi ba tare da tantancewa ba alama ce ta zamba."
          },
          {
            id: "s3-2",
            text: "Biya kuɗin rajista $45 yau don karɓar takardar kama aiki.",
            isRedFlag: true,
            tactic: "Karɓar Kuɗi Kafin Aiki",
            explanation: "Kamfanoni na gaskiya ba sa neman kuɗi daga masu neman aiki."
          }
        ],
        defenseTip: "Kada ka taɓa biyan kuɗin rajista ko horo don samun aiki."
      },
      ar: {
        segments: [
          {
            id: "s3-1",
            text: "تهانينا! تم قبولك لوظيفة إدخال بيانات عن بُعد براتب ٣٢٠٠ دولار شهرياً دون الحاجة لمقابلة شخصية. ",
            isRedFlag: true,
            tactic: "عرض مغرٍ غير واقعي",
            explanation: "الوظائف ذات الرواتب المرتفعة دون مقابلة أو تقييم غالباً ما تكون مصيدة احتيال."
          },
          {
            id: "s3-2",
            text: "يرجى تحويل رسوم تسجيل وتخليص أجهزة بقيمة ٤٥ دولاراً اليوم لاستلام عقد العمل.",
            isRedFlag: true,
            tactic: "احتيال الرسوم المسبقة",
            explanation: "جهات التوظيف الحقيقية لا تطلب رسوماً مالية من المتقدمين."
          }
        ],
        defenseTip: "لا تدفع أي رسوم تسجيل أو تدريب مقابل الحصول على عرض وظيفي."
      }
    }
  },
  {
    id: "case-04",
    category: "Safe / Baseline Check",
    difficulty: "Beginner",
    channel: "Security Advisory",
    verdict: "legitimate",
    senderDisplay: "Campus IT & Security Desk",
    senderMetadata: "Verified internal bulletin • No external login links",
    timestamp: "10:00 AM",
    forensics: {
      sender: "Comes from a known internal desk with clear context and zero credential requests.",
      url: "Contains no suspicious redirect or login form asking for passwords/OTPs.",
      urgency: "Gives a calm heads-up about scheduled maintenance rather than threatening account suspension.",
      metadata: "Consistent with standard security hygiene: reminds users to never share passwords."
    },
    locales: {
      en: {
        segments: [
          {
            id: "s4-1",
            text: "Reminder: Scheduled network maintenance takes place Sunday from 02:00 to 04:00 WAT. ",
            isRedFlag: false,
            tactic: null,
            explanation: ""
          },
          {
            id: "s4-2",
            text: "IT support will never ask for your password via email, chat, or phone.",
            isRedFlag: false,
            tactic: null,
            explanation: ""
          }
        ],
        defenseTip: "Not every alert is a scam. Legitimate notices inform you calmly without demanding secrets or urgent payments."
      },
      ha: {
        segments: [
          {
            id: "s4-1",
            text: "Tunatarwa: Za a yi gyaran hanyar sadarwa ranar Lahadi daga ƙarfe 02:00 zuwa 04:00 na dare. ",
            isRedFlag: false,
            tactic: null,
            explanation: ""
          },
          {
            id: "s4-2",
            text: "Sashen IT ba zai taɓa tambayar kalmar sirrinka (password) ta imel ko waya ba.",
            isRedFlag: false,
            tactic: null,
            explanation: ""
          }
        ],
        defenseTip: "Ba kowane saƙo ne zamba ba. Sanarwa ta gaskiya ba ta neman bayanan sirri ko kuɗi."
      },
      ar: {
        segments: [
          {
            id: "s4-1",
            text: "تذكير: ستُجرى صيانة مجدولة للشبكة يوم الأحد من الساعة ٢:٠٠ إلى ٤:٠٠ فجراً. ",
            isRedFlag: false,
            tactic: null,
            explanation: ""
          },
          {
            id: "s4-2",
            text: "لن يطلب فريق الدعم الفني كلمة المرور الخاصة بك عبر البريد الإلكتروني أو الهاتف أبداً.",
            isRedFlag: false,
            tactic: null,
            explanation: ""
          }
        ],
        defenseTip: "ليست كل التنبيهات احتيالاً؛ الإشعارات الرسمية تُعلمك بهدوء دون طلب بيانات سرية أو روابط مشبوهة."
      }
    }
  }
];