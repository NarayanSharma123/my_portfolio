import * as Fi from "react-icons/fi";
import * as Si from "react-icons/si";

// Safe icon resolver: missing icon par undefined return nahi hoga.
const si = (name) => Si[name] || Fi.FiGlobe;

const iconMap = {
  // =====================================
  // DEVELOPMENT & PROGRAMMING
  // =====================================
  FiCode: Fi.FiCode,
  FiCodepen: Fi.FiCodepen,
  FiTerminal: Fi.FiTerminal,
  FiCommand: Fi.FiCommand,
  FiGitBranch: Fi.FiGitBranch,
  FiGitCommit: Fi.FiGitCommit,
  FiGitMerge: Fi.FiGitMerge,
  FiGitPullRequest: Fi.FiGitPullRequest,
  FiDatabase: Fi.FiDatabase,
  FiServer: Fi.FiServer,
  FiCpu: Fi.FiCpu,
  FiHardDrive: Fi.FiHardDrive,
  FiPackage: Fi.FiPackage,
  FiBox: Fi.FiBox,
  FiLayers: Fi.FiLayers,
  FiCloud: Fi.FiCloud,
  FiWifi: Fi.FiWifi,
  FiGlobe: Fi.FiGlobe,

  // =====================================
  // AI / ML / DATA SCIENCE
  // =====================================
  FiActivity: Fi.FiActivity,
  FiZap: Fi.FiZap,
  FiAperture: Fi.FiAperture,
  FiTarget: Fi.FiTarget,
  FiCrosshair: Fi.FiCrosshair,
  FiTrendingUp: Fi.FiTrendingUp,
  FiBarChart: Fi.FiBarChart,
  FiBarChart2: Fi.FiBarChart2,
  FiPieChart: Fi.FiPieChart,
  FiSliders: Fi.FiSliders,
  FiGitGraph: Fi.FiGitBranch,

  // =====================================
  // WEB & APP DEVELOPMENT
  // =====================================
  FiMonitor: Fi.FiMonitor,
  FiSmartphone: Fi.FiSmartphone,
  FiTablet: Fi.FiTablet,
  FiLaptop: Fi.FiMonitor,
  FiLayout: Fi.FiLayout,
  FiGrid: Fi.FiGrid,
  FiMousePointer: Fi.FiMousePointer,
  FiSmartphoneCharging: Fi.FiSmartphone,
  FiExternalLink: Fi.FiExternalLink,
  FiLink: Fi.FiLink,
  FiRefreshCw: Fi.FiRefreshCw,

  // =====================================
  // DESIGN & CREATIVE SERVICES
  // =====================================
  FiPenTool: Fi.FiPenTool,
  FiEdit: Fi.FiEdit,
  FiEdit2: Fi.FiEdit2,
  FiEdit3: Fi.FiEdit3,
  FiFeather: Fi.FiFeather,
  FiType: Fi.FiType,
  FiImage: Fi.FiImage,
  FiImages: Fi.FiImage,
  FiCamera: Fi.FiCamera,
  FiVideo: Fi.FiVideo,
  FiFilm: Fi.FiFilm,
  FiCrop: Fi.FiCrop,
  FiPalette: Fi.FiDroplet,
  FiBrush: Fi.FiPenTool,

  // =====================================
  // MARKETING & SOCIAL MEDIA
  // =====================================
  FiShare: Fi.FiShare,
  FiShare2: Fi.FiShare2,
  FiAtSign: Fi.FiAtSign,
  FiHash: Fi.FiHash,
  FiMessageSquare: Fi.FiMessageSquare,
  FiMessageCircle: Fi.FiMessageCircle,
  FiThumbsUp: Fi.FiThumbsUp,
  FiHeart: Fi.FiHeart,
  FiPlay: Fi.FiPlay,
  FiRadio: Fi.FiRadio,
  FiSend: Fi.FiSend,
  FiUsers: Fi.FiUsers,

  // =====================================
  // SOCIAL MEDIA & BRAND ICONS
  // =====================================

  // Professional & Developer Platforms
  SiLinkedin: si("SiLinkedin"),
  SiGithub: si("SiGithub"),
  SiGitlab: si("SiGitlab"),
  SiBitbucket: si("SiBitbucket"),
  SiStackoverflow: si("SiStackoverflow"),
  SiDevdotto: si("SiDevdotto"),
  SiHashnode: si("SiHashnode"),
  SiMedium: si("SiMedium"),
  SiCodepen: si("SiCodepen"),
  SiBehance: si("SiBehance"),
  SiDribbble: si("SiDribbble"),
  SiFigma: si("SiFigma"),

  // Social Networking
  SiInstagram: si("SiInstagram"),
  SiFacebook: si("SiFacebook"),
  SiX: si("SiX"),
  SiTwitter: si("SiTwitter"),
  SiThreads: si("SiThreads"),
  SiSnapchat: si("SiSnapchat"),
  SiPinterest: si("SiPinterest"),
  SiReddit: si("SiReddit"),
  SiTumblr: si("SiTumblr"),
  SiMastodon: si("SiMastodon"),
  SiBluesky: si("SiBluesky"),
  SiVK: si("SiVk"),

  // Video & Streaming
  SiYoutube: si("SiYoutube"),
  SiTiktok: si("SiTiktok"),
  SiTwitch: si("SiTwitch"),
  SiVimeo: si("SiVimeo"),
  SiKick: si("SiKick"),
  SiDailymotion: si("SiDailymotion"),
  SiRumble: si("SiRumble"),

  // Messaging & Communication
  SiWhatsapp: si("SiWhatsapp"),
  SiTelegram: si("SiTelegram"),
  SiDiscord: si("SiDiscord"),
  SiSlack: si("SiSlack"),
  SiSkype: si("SiSkype"),
  SiMessenger: si("SiMessenger"),
  SiLine: si("SiLine"),
  SiViber: si("SiViber"),
  SiWeChat: si("SiWechat"),

  // Music & Audio
  SiSpotify: si("SiSpotify"),
  SiSoundcloud: si("SiSoundcloud"),
  SiAppleMusic: si("SiApplemusic"),
  SiDeezer: si("SiDeezer"),
  SiAudible: si("SiAudible"),

  // Other Platforms
  SiPatreon: si("SiPatreon"),
  SiBuyMeACoffee: si("SiBuymeacoffee"),
  SiKoFi: si("SiKofi"),
  SiSubstack: si("SiSubstack"),

  // =====================================
  // PORTFOLIO & PROFESSIONAL
  // =====================================
  FiUser: Fi.FiUser,
  FiUserCheck: Fi.FiUserCheck,
  FiBriefcase: Fi.FiBriefcase,
  FiAward: Fi.FiAward,
  FiStar: Fi.FiStar,
  FiBook: Fi.FiBook,
  FiBookOpen: Fi.FiBookOpen,
  FiGraduationCap: Fi.FiBookOpen,
  FiCertificate: Fi.FiAward,
  FiFileText: Fi.FiFileText,
  FiFolder: Fi.FiFolder,
  FiClipboard: Fi.FiClipboard,
  FiCheckCircle: Fi.FiCheckCircle,
  FiShield: Fi.FiShield,

  // =====================================
  // CONTACT & COMMUNICATION
  // =====================================
  FiMail: Fi.FiMail,
  FiPhone: Fi.FiPhone,
  FiMessage: Fi.FiMessageCircle,
  FiMapPin: Fi.FiMapPin,
  FiNavigation: Fi.FiNavigation,
  FiGlobe2: Fi.FiGlobe,
  FiCalendar: Fi.FiCalendar,
  FiClock: Fi.FiClock,

  // =====================================
  // GENERAL & UI
  // =====================================
  FiHome: Fi.FiHome,
  FiSettings: Fi.FiSettings,
  FiTool: Fi.FiTool,
  FiSearch: Fi.FiSearch,
  FiEye: Fi.FiEye,
  FiLock: Fi.FiLock,
  FiKey: Fi.FiKey,
  FiDownload: Fi.FiDownload,
  FiUpload: Fi.FiUpload,
  FiPlus: Fi.FiPlus,
  FiMinus: Fi.FiMinus,
  FiX: Fi.FiX,
  FiCheck: Fi.FiCheck,
  FiMenu: Fi.FiMenu,
  FiMoreHorizontal: Fi.FiMoreHorizontal,
  FiMoreVertical: Fi.FiMoreVertical,
  FiArrowRight: Fi.FiArrowRight,
  FiArrowLeft: Fi.FiArrowLeft,
  FiArrowUpRight: Fi.FiArrowUpRight,
  FiChevronDown: Fi.FiChevronDown,
  FiChevronRight: Fi.FiChevronRight,
  FiExternal: Fi.FiExternalLink,

  // =====================================
  // THEME & STATUS
  // =====================================
  FiSun: Fi.FiSun,
  FiMoon: Fi.FiMoon,
  FiAlertCircle: Fi.FiAlertCircle,
  FiAlertTriangle: Fi.FiAlertTriangle,
  FiInfo: Fi.FiInfo,
  FiHelpCircle: Fi.FiHelpCircle,
  FiCheckSquare: Fi.FiCheckSquare,
  FiXCircle: Fi.FiXCircle,
};

export default iconMap;
