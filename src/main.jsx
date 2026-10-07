import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AlertTriangle,
  AudioLines,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  CircleDollarSign,
  Eraser,
  FileSpreadsheet,
  FileCheck2,
  LayoutDashboard,
  Languages,
  MapPin,
  Menu,
  MessageSquareText,
  Mic,
  MousePointer2,
  PackageCheck,
  PhoneCall,
  ReceiptText,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Truck,
  Upload,
  UserRoundCheck,
  UsersRound,
  Workflow,
  X,
} from "lucide-react";
import "./styles.css";

const roles = [
  { id: "owner", name: "Michael Chan", initials: "MC", color: "#dd8058" },
  { id: "gm", name: "王志强", initials: "WZ", color: "#468e7a" },
  { id: "salesLead", name: "陈明", initials: "CM", color: "#3d80b3" },
  { id: "sales", name: "Nguyen Thi Lan", initials: "NL", color: "#9571b8" },
  { id: "procLead", name: "李芳", initials: "LF", color: "#bc8c42" },
  { id: "proc", name: "Pham Huy", initials: "PH", color: "#638c9c" },
  { id: "admin", name: "Tran Mai", initials: "TM", color: "#cf6674" },
];

const translations = {
  zh: {
    dashboard: "经营总览",
    sales: "销售工作台",
    production: "订单生产协同",
    procurement: "采购工作台",
    admin: "行政工作台",
    approvals: "审批中心",
    alerts: "预警中心",
    assistant: "智能助手",
    import: "Excel 导入",
    settings: "系统设置",
    greeting: "早上好，Michael",
    summary: "越南工厂今天运转平稳，但有 3 项需要优先处理。",
    workspace: "工作台",
    manage: "管理",
    offlineDemo: "本地离线演示数据",
    annotationMode: "演示标注",
    annotationModeActive: "关闭标注",
    clearMarkup: "清除标注",
    roleSwitch: "演示角色切换",
    openNav: "打开导航",
    closeNav: "关闭导航",
    notifications: "通知",
    view: "查看",
    all: "查看全部",
    askSuggestion: "智能建议",
    brand: "智能工作台",
    factoryDemo: "越南工厂 · 本地演示",
    send: "发送",
  },
  en: {
    dashboard: "Business Overview",
    sales: "Sales Desk",
    production: "Order & Production",
    procurement: "Procurement Desk",
    admin: "Administration",
    approvals: "Approvals",
    alerts: "Alerts",
    assistant: "AI Assistant",
    import: "Excel Import",
    settings: "Settings",
    greeting: "Good morning, Michael",
    summary: "The Vietnam factory is stable today. Three items need attention.",
    workspace: "WORKSPACE",
    manage: "MANAGE",
    offlineDemo: "Local offline demonstration data",
    annotationMode: "Presentation Markup",
    annotationModeActive: "Exit Markup",
    clearMarkup: "Clear Markup",
    roleSwitch: "Demo Role Switcher",
    openNav: "Open navigation",
    closeNav: "Close navigation",
    notifications: "Notifications",
    view: "View",
    all: "View all",
    askSuggestion: "AI suggestion",
    brand: "Intelligent Workbench",
    factoryDemo: "Vietnam Factory · Local Demo",
    send: "Send",
  },
  vi: {
    dashboard: "Tổng quan vận hành",
    sales: "Bàn làm việc Kinh doanh",
    production: "Đơn hàng & Sản xuất",
    procurement: "Bàn làm việc Mua hàng",
    admin: "Hành chính",
    approvals: "Phê duyệt",
    alerts: "Cảnh báo",
    assistant: "Trợ lý thông minh",
    import: "Nhập Excel",
    settings: "Cài đặt",
    greeting: "Chào buổi sáng, Michael",
    summary: "Nhà máy Việt Nam hoạt động ổn định. Có 3 việc cần ưu tiên.",
    workspace: "KHÔNG GIAN LÀM VIỆC",
    manage: "QUẢN LÝ",
    offlineDemo: "Dữ liệu demo cục bộ, ngoại tuyến",
    annotationMode: "Đánh dấu trình bày",
    annotationModeActive: "Tắt đánh dấu",
    clearMarkup: "Xóa đánh dấu",
    roleSwitch: "Chuyển vai trò demo",
    openNav: "Mở điều hướng",
    closeNav: "Đóng điều hướng",
    notifications: "Thông báo",
    view: "Xem",
    all: "Xem tất cả",
    askSuggestion: "Gợi ý AI",
    brand: "Bàn làm việc thông minh",
    factoryDemo: "Nhà máy Việt Nam · Demo cục bộ",
    send: "Gửi",
  },
};

const roleTitles = {
  owner: { zh: "老板", en: "Owner", vi: "Chủ doanh nghiệp" },
  gm: { zh: "总经理", en: "General Manager", vi: "Tổng giám đốc" },
  salesLead: { zh: "销售负责人", en: "Sales Lead", vi: "Trưởng kinh doanh" },
  sales: { zh: "销售员工", en: "Sales Representative", vi: "Nhân viên kinh doanh" },
  procLead: { zh: "采购负责人", en: "Procurement Lead", vi: "Trưởng mua hàng" },
  proc: { zh: "采购员工", en: "Procurement Specialist", vi: "Nhân viên mua hàng" },
  admin: { zh: "行政员工", en: "Administration Specialist", vi: "Nhân viên hành chính" },
};

function roleTitle(roleId, language) {
  return roleTitles[roleId]?.[language] || roleTitles[roleId]?.zh || "";
}

const roleFocusCopy = {
  owner: {
    zh: { label: "本角色工作重点", eyebrow: "EPAC 演示总结 · 老板视角", title: "老板的工作重点", summary: "用一张经营看板看清销售结果、现金回款和团队风险，把时间放在最需要决策的事情上。", keywords: ["经营结果", "回款风险", "重点决策"] },
    en: { label: "Role Focus", eyebrow: "EPAC DEMO SUMMARY · OWNER VIEW", title: "Owner Focus", summary: "Use one business view to see sales results, cash collection, and team risks, then spend time on the decisions that matter most.", keywords: ["Business results", "Collection risk", "Key decisions"] },
    vi: { label: "Trọng tâm vai trò", eyebrow: "TÓM TẮT DEMO EPAC · GÓC NHÌN CHỦ DOANH NGHIỆP", title: "Trọng tâm của chủ doanh nghiệp", summary: "Dùng một bảng điều hành để nhìn rõ kết quả bán hàng, dòng tiền thu về và rủi ro của đội ngũ; tập trung thời gian vào các quyết định quan trọng nhất.", keywords: ["Kết quả kinh doanh", "Rủi ro thu tiền", "Quyết định trọng tâm"] },
  },
  gm: {
    zh: { label: "本角色工作重点", eyebrow: "EPAC 演示总结 · 总经理视角", title: "总经理的工作重点", summary: "把销售、采购、生产和回款之间卡住的问题变成明确责任、协同动作和完成时间。", keywords: ["跨部门协同", "风险闭环", "推进落地"] },
    en: { label: "Role Focus", eyebrow: "EPAC DEMO SUMMARY · GM VIEW", title: "General Manager Focus", summary: "Turn blockers between sales, procurement, production, and collection into clear ownership, coordinated actions, and deadlines.", keywords: ["Cross-team coordination", "Risk closure", "Execution"] },
    vi: { label: "Trọng tâm vai trò", eyebrow: "TÓM TẮT DEMO EPAC · GÓC NHÌN TỔNG GIÁM ĐỐC", title: "Trọng tâm của Tổng giám đốc", summary: "Biến các điểm nghẽn giữa bán hàng, mua hàng, sản xuất và thu tiền thành trách nhiệm, hành động phối hợp và thời hạn rõ ràng.", keywords: ["Phối hợp liên phòng ban", "Khép kín rủi ro", "Thúc đẩy thực thi"] },
  },
  salesLead: {
    zh: { label: "本角色工作重点", eyebrow: "EPAC 演示总结 · 销售负责人视角", title: "销售负责人的工作重点", summary: "让每位销售员的客户推进、拜访质量、报价跟进和回款结果都看得见、管得住。", keywords: ["团队执行", "客户推进", "回款管理"] },
    en: { label: "Role Focus", eyebrow: "EPAC DEMO SUMMARY · SALES LEAD VIEW", title: "Sales Lead Focus", summary: "Make every salesperson's customer progress, visit quality, quote follow-up, and collection results visible and manageable.", keywords: ["Team execution", "Customer progress", "Collection management"] },
    vi: { label: "Trọng tâm vai trò", eyebrow: "TÓM TẮT DEMO EPAC · GÓC NHÌN TRƯỞNG KINH DOANH", title: "Trọng tâm của Trưởng kinh doanh", summary: "Theo dõi được và quản lý được tiến độ khách hàng, chất lượng thăm gặp, theo dõi báo giá và kết quả thu tiền của từng nhân viên kinh doanh.", keywords: ["Thực thi đội ngũ", "Tiến độ khách hàng", "Quản lý thu tiền"] },
  },
  sales: {
    zh: { label: "本角色工作重点", eyebrow: "EPAC 演示总结 · 销售员工视角", title: "销售员工的工作重点", summary: "每天清楚知道该跟进哪个客户，并能用越南语自然录入，让 AI 自动形成规范的客户记录和下一步动作。", keywords: ["今日跟进", "自然录入", "客户成交"] },
    en: { label: "Role Focus", eyebrow: "EPAC DEMO SUMMARY · SALES REPRESENTATIVE VIEW", title: "Sales Representative Focus", summary: "Know exactly which customer to follow up with each day, then use natural Vietnamese input for AI to create structured records and next actions.", keywords: ["Today's follow-ups", "Natural-language entry", "Customer conversion"] },
    vi: { label: "Trọng tâm vai trò", eyebrow: "TÓM TẮT DEMO EPAC · GÓC NHÌN NHÂN VIÊN KINH DOANH", title: "Trọng tâm của nhân viên kinh doanh", summary: "Mỗi ngày biết rõ cần theo dõi khách hàng nào và có thể nhập bằng tiếng Việt tự nhiên để AI tự tạo hồ sơ chuẩn cùng bước tiếp theo.", keywords: ["Theo dõi hôm nay", "Nhập liệu tự nhiên", "Chốt khách hàng"] },
  },
  procLead: {
    zh: { label: "本角色工作重点", eyebrow: "EPAC 演示总结 · 采购负责人视角", title: "采购负责人的工作重点", summary: "提前识别原料价格和交期风险，让采购决策既控制成本，也不影响订单交付。", keywords: ["价格比对", "交期保障", "供应商决策"] },
    en: { label: "Role Focus", eyebrow: "EPAC DEMO SUMMARY · PROCUREMENT LEAD VIEW", title: "Procurement Lead Focus", summary: "Identify material-price and delivery risks early, so procurement decisions control cost without affecting customer delivery.", keywords: ["Price comparison", "Delivery assurance", "Supplier decisions"] },
    vi: { label: "Trọng tâm vai trò", eyebrow: "TÓM TẮT DEMO EPAC · GÓC NHÌN TRƯỞNG MUA HÀNG", title: "Trọng tâm của Trưởng mua hàng", summary: "Nhận diện sớm rủi ro giá nguyên liệu và thời hạn giao, để quyết định mua hàng vừa kiểm soát chi phí vừa không ảnh hưởng giao đơn.", keywords: ["So sánh giá", "Bảo đảm giao hàng", "Quyết định nhà cung cấp"] },
  },
  proc: {
    zh: { label: "本角色工作重点", eyebrow: "EPAC 演示总结 · 采购员工视角", title: "采购员工的工作重点", summary: "按采购流程完成询价、比价、下单和催交，确保每一批原料按时、按要求到货。", keywords: ["询价比价", "催交到货", "流程执行"] },
    en: { label: "Role Focus", eyebrow: "EPAC DEMO SUMMARY · PROCUREMENT SPECIALIST VIEW", title: "Procurement Specialist Focus", summary: "Complete inquiry, comparison, ordering, and expediting steps so every material batch arrives on time and as required.", keywords: ["Inquiry and comparison", "Expedite delivery", "Process execution"] },
    vi: { label: "Trọng tâm vai trò", eyebrow: "TÓM TẮT DEMO EPAC · GÓC NHÌN NHÂN VIÊN MUA HÀNG", title: "Trọng tâm của nhân viên mua hàng", summary: "Hoàn thành hỏi giá, so sánh giá, đặt hàng và thúc giao theo quy trình, bảo đảm từng lô nguyên liệu đến đúng hạn và đúng yêu cầu.", keywords: ["Hỏi giá, so sánh giá", "Thúc giao, nhận hàng", "Thực thi quy trình"] },
  },
  admin: {
    zh: { label: "本角色工作重点", eyebrow: "EPAC 演示总结 · 行政人员视角", title: "行政人员的工作重点", summary: "把行政流程、公司文件和会议决定沉淀为可查询、可交接、可持续跟进的资料库。", keywords: ["流程管理", "资料归档", "会议待办"], note: "人员可以变动，但制度、文件、会议记录和未完成事项不会随人员离开而丢失。" },
    en: { label: "Role Focus", eyebrow: "EPAC DEMO SUMMARY · ADMINISTRATION VIEW", title: "Administration Focus", summary: "Turn administrative processes, company documents, and meeting decisions into a searchable, transferable, and continuously tracked knowledge base.", keywords: ["Process management", "Document archive", "Meeting actions"], note: "People may change, but policies, documents, meeting records, and unfinished actions stay with the company." },
    vi: { label: "Trọng tâm vai trò", eyebrow: "TÓM TẮT DEMO EPAC · GÓC NHÌN HÀNH CHÍNH", title: "Trọng tâm của hành chính", summary: "Lưu trữ quy trình hành chính, tài liệu công ty và quyết định cuộc họp thành kho dữ liệu có thể tra cứu, bàn giao và theo dõi liên tục.", keywords: ["Quản lý quy trình", "Lưu trữ tài liệu", "Việc cần làm sau họp"], note: "Nhân sự có thể thay đổi, nhưng quy định, tài liệu, biên bản họp và các việc chưa hoàn thành không bị mất theo người rời đi." },
  },
};

const navItems = [
  { id: "dashboard", icon: LayoutDashboard, group: "workspace" },
  { id: "sales", icon: BriefcaseBusiness, group: "workspace" },
  { id: "production", icon: PackageCheck, group: "workspace" },
  { id: "procurement", icon: Truck, group: "workspace" },
  { id: "admin", icon: UsersRound, group: "workspace" },
  { id: "approvals", icon: ClipboardCheck, group: "manage" },
  { id: "alerts", icon: Bell, group: "manage" },
  { id: "assistant", icon: Sparkles, group: "manage" },
  { id: "import", icon: FileSpreadsheet, group: "manage" },
];

const roleNavigation = {
  owner: {
    workspace: ["dashboard", "production", "procurement"],
    manage: ["approvals", "import"],
  },
  gm: {
    workspace: ["dashboard", "sales", "production", "procurement"],
    manage: ["approvals", "import"],
  },
  salesLead: {
    workspace: ["dashboard", "sales", "production"],
    manage: ["approvals", "import"],
  },
  sales: {
    workspace: ["dashboard", "sales"],
    manage: [],
  },
  procLead: {
    workspace: ["dashboard", "procurement", "production"],
    manage: ["approvals", "import"],
  },
  proc: {
    workspace: ["dashboard", "procurement"],
    manage: [],
  },
  admin: {
    workspace: ["dashboard", "admin"],
    manage: ["approvals"],
  },
};

const kpis = [
  { label: "本月已下订单金额", value: "¥ 12.84M", delta: "+12.6%", direction: "up", detail: "较上月同期" },
  { label: "累计回款率", value: "76.8%", delta: "+3.2%", direction: "up", detail: "累计订单口径" },
  { label: "预估平均毛利率", value: "22.4%", delta: "-1.1%", direction: "down", detail: "重点关注低毛利订单" },
  { label: "逾期应收", value: "¥ 1.26M", delta: "8 笔", direction: "down", detail: "需本周推进" },
];

const alerts = [
  {
    priority: "high",
    title: "订单 SO-2026-0918 存在交期风险",
    detail: "PE 原料尚未到货，预计完工日期晚于承诺交期 2 天。",
    owner: "采购部 · 李芳",
    time: "10 分钟前",
    tag: "订单交期",
  },
  {
    priority: "high",
    title: "Pacific Foods Co. 回款已逾期 14 天",
    detail: "应收 ¥286,000，销售负责人尚未提交回款推进记录。",
    owner: "销售部 · 陈明",
    time: "28 分钟前",
    tag: "逾期应收",
  },
  {
    priority: "medium",
    title: "3 份报价已超过 3 天未跟进",
    detail: "其中 GreenBite Packaging 报价金额最高，约 ¥178,000。",
    owner: "销售部 · Nguyen Thi Lan",
    time: "今天 08:40",
    tag: "报价跟进",
  },
  {
    priority: "medium",
    title: "铝箔材料最新报价上涨 8.7%",
    detail: "供应商 VietFoil 报价高于近 90 日采购均价，建议启动比价。",
    owner: "采购部 · 李芳",
    time: "昨天",
    tag: "价格异常",
  },
];

function localizedAlert(alert, language) {
  const localized = {
    "订单 SO-2026-0918 存在交期风险": {
      en: ["Order SO-2026-0918 has a delivery risk", "PE material has not arrived; expected completion is 2 days after the promised date.", "Procurement · Li Fang", "10 minutes ago", "Order delivery"],
      vi: ["Đơn SO-2026-0918 có rủi ro giao hàng", "Nguyên liệu PE chưa đến; dự kiến hoàn thành chậm hơn cam kết 2 ngày.", "Mua hàng · Li Fang", "10 phút trước", "Giao đơn"],
    },
    "Pacific Foods Co. 回款已逾期 14 天": {
      en: ["Pacific Foods Co. collection is 14 days overdue", "Receivable ¥286,000; the sales lead has not yet submitted a collection progress record.", "Sales · Chen Ming", "28 minutes ago", "Overdue collection"],
      vi: ["Pacific Foods Co. quá hạn thu tiền 14 ngày", "Phải thu ¥286,000; trưởng kinh doanh chưa cập nhật tiến độ thu tiền.", "Kinh doanh · Chen Ming", "28 phút trước", "Công nợ quá hạn"],
    },
    "3 份报价已超过 3 天未跟进": {
      en: ["3 quotes have not been followed up for more than 3 days", "GreenBite Packaging has the largest quoted value, approximately ¥178,000.", "Sales · Nguyen Thi Lan", "Today 08:40", "Quote follow-up"],
      vi: ["3 báo giá chưa được theo dõi quá 3 ngày", "GreenBite Packaging có giá trị báo giá cao nhất, khoảng ¥178,000.", "Kinh doanh · Nguyen Thi Lan", "Hôm nay 08:40", "Theo dõi báo giá"],
    },
    "铝箔材料最新报价上涨 8.7%": {
      en: ["Latest foil quote increased by 8.7%", "VietFoil is above the 90-day purchasing average; start a supplier comparison.", "Procurement · Li Fang", "Yesterday", "Price anomaly"],
      vi: ["Báo giá nhôm mới nhất tăng 8.7%", "VietFoil cao hơn mức mua trung bình 90 ngày; nên bắt đầu so sánh nhà cung cấp.", "Mua hàng · Li Fang", "Hôm qua", "Bất thường giá"],
    },
  };
  if (language === "zh" || !localized[alert.title]) return alert;
  const [title, detail, owner, time, tag] = localized[alert.title][language];
  return { ...alert, title, detail, owner, time, tag };
}

const alertCopy = (zh, en, vi) => ({ zh, en, vi });

function roleAlertItem(priority, title, detail, owner, time, tag) {
  return { priority, title, detail, owner, time, tag };
}

const roleAlertProfiles = {
  owner: {
    copy: alertCopy("经营预警中心", "Business Risk Center", "Trung tâm rủi ro vận hành"),
    description: alertCopy("聚焦影响订单、回款、交付和利润的经营事项，查看全公司的重点风险。", "Focus on company-wide risks affecting orders, collections, delivery, and margin.", "Tập trung các rủi ro toàn công ty ảnh hưởng đơn hàng, thu tiền, giao hàng và lợi nhuận."),
    items: [
      roleAlertItem("high", alertCopy("Natura Foods 订单存在 2 天交期风险", "Natura Foods order has a 2-day delivery risk", "Đơn Natura Foods có rủi ro giao chậm 2 ngày"), alertCopy("PE 原料未到，需今天确认替代方案和客户沟通口径。", "PE material is outstanding; confirm the recovery plan and customer message today.", "Nguyên liệu PE chưa về; cần chốt phương án thay thế và thông điệp cho khách hôm nay."), alertCopy("采购负责人 + 销售负责人", "Procurement Lead + Sales Lead", "Trưởng mua hàng + Trưởng kinh doanh"), alertCopy("10 分钟前", "10 minutes ago", "10 phút trước"), alertCopy("交期风险", "Delivery risk", "Rủi ro giao hàng")),
      roleAlertItem("high", alertCopy("Pacific Foods 回款逾期 14 天", "Pacific Foods collection is 14 days overdue", "Pacific Foods quá hạn thu tiền 14 ngày"), alertCopy("¥286,000 尚未锁定付款日期，需要销售负责人提交回款计划。", "¥286,000 has no committed payment date; the sales lead needs a collection plan.", "Khoản ¥286,000 chưa có ngày thanh toán cam kết; trưởng sales cần nộp kế hoạch thu tiền."), alertCopy("销售负责人 · 陈明", "Sales Lead · Chen Ming", "Trưởng kinh doanh · Chen Ming"), alertCopy("28 分钟前", "28 minutes ago", "28 phút trước"), alertCopy("逾期应收", "Overdue collection", "Công nợ quá hạn")),
      roleAlertItem("medium", alertCopy("GreenBite 高价值机会待推进", "GreenBite high-value opportunity needs action", "Cơ hội giá trị cao GreenBite cần thúc đẩy"), alertCopy("¥178,000 报价已超过 3 天未跟进，样品反馈仍未确认。", "The ¥178,000 quote has been idle for over 3 days and sample feedback is pending.", "Báo giá ¥178,000 chưa theo dõi quá 3 ngày, phản hồi mẫu vẫn chưa xác nhận."), alertCopy("销售部 · Nguyen Thi Lan", "Sales · Nguyen Thi Lan", "Kinh doanh · Nguyen Thi Lan"), alertCopy("今天 08:40", "Today 08:40", "Hôm nay 08:40"), alertCopy("重点机会", "Key opportunity", "Cơ hội trọng điểm")),
      roleAlertItem("medium", alertCopy("铝箔报价高于 90 日均价 8.7%", "Foil quote is 8.7% above the 90-day average", "Báo giá nhôm cao hơn bình quân 90 ngày 8,7%"), alertCopy("三家供应商已完成比价，等待采购建议和金额决策。", "Three supplier quotes are compared; a purchase recommendation and amount decision are pending.", "Đã so sánh 3 nhà cung cấp; đang chờ đề xuất mua và quyết định giá trị."), alertCopy("采购负责人 · 李芳", "Procurement Lead · Li Fang", "Trưởng mua hàng · Li Fang"), alertCopy("昨天", "Yesterday", "Hôm qua"), alertCopy("价格决策", "Price decision", "Quyết định giá")),
      roleAlertItem("normal", alertCopy("年度供货合同等待用印", "Annual supply contract awaits sealing", "Hợp đồng cung ứng năm chờ đóng dấu"), alertCopy("合同审批已完成，行政待执行盖章和归档。", "Approval is complete; administration needs to seal and archive.", "Phê duyệt đã xong; hành chính cần đóng dấu và lưu hồ sơ."), alertCopy("行政部 · Tran Mai", "Administration · Tran Mai", "Hành chính · Tran Mai"), alertCopy("今天", "Today", "Hôm nay"), alertCopy("合同流程", "Contract workflow", "Quy trình hợp đồng")),
    ],
  },
  gm: {
    copy: alertCopy("跨部门风险中心", "Cross-functional Risk Center", "Trung tâm rủi ro liên phòng ban"),
    description: alertCopy("只显示需要总经理协调、决策或督办的跨部门事项。", "Only shows issues requiring general-manager coordination, decisions, or escalation.", "Chỉ hiển thị việc cần Tổng giám đốc điều phối, quyết định hoặc đôn đốc."),
    items: [
      roleAlertItem("high", alertCopy("Natura Foods 交期风险待跨部门闭环", "Natura Foods delivery risk needs cross-functional closure", "Rủi ro giao Natura Foods cần khép kín liên phòng ban"), alertCopy("采购确认 PE 替代来源，销售今天 15:00 前同步客户。", "Procurement confirms alternate PE; sales updates the customer by 15:00 today.", "Mua hàng xác nhận PE thay thế; sales cập nhật khách trước 15:00 hôm nay."), alertCopy("李芳 + 陈明", "Li Fang + Chen Ming", "Li Fang + Chen Ming"), alertCopy("10 分钟前", "10 minutes ago", "10 phút trước"), alertCopy("交期闭环", "Delivery closure", "Khép kín giao hàng")),
      roleAlertItem("high", alertCopy("Pacific Foods 回款计划未提交", "Pacific Foods collection plan not submitted", "Chưa nộp kế hoạch thu tiền Pacific Foods"), alertCopy("回款已逾期 14 天，需销售负责人锁定付款日期并提交计划。", "Collection is 14 days overdue; the sales lead must lock a payment date and submit a plan.", "Công nợ quá hạn 14 ngày; trưởng sales cần chốt ngày thanh toán và nộp kế hoạch."), alertCopy("销售负责人 · 陈明", "Sales Lead · Chen Ming", "Trưởng kinh doanh · Chen Ming"), alertCopy("28 分钟前", "28 minutes ago", "28 phút trước"), alertCopy("回款风险", "Collection risk", "Rủi ro thu tiền")),
      roleAlertItem("medium", alertCopy("PE 采购申请等待决策", "PE purchase request awaits decision", "Đề nghị mua PE chờ quyết định"), alertCopy("PR-2026-0318 金额 ¥486,000，直接影响重点订单排产。", "PR-2026-0318 is ¥486,000 and directly affects a key order's production.", "PR-2026-0318 trị giá ¥486,000, ảnh hưởng trực tiếp kế hoạch sản xuất đơn trọng điểm."), alertCopy("采购负责人 · 李芳", "Procurement Lead · Li Fang", "Trưởng mua hàng · Li Fang"), alertCopy("已等待 26 小时", "Waiting 26 hours", "Đã chờ 26 giờ"), alertCopy("待决策", "Decision needed", "Cần quyết định")),
      roleAlertItem("normal", alertCopy("年度供货合同待行政执行", "Annual supply contract awaits administration", "Hợp đồng cung ứng năm chờ hành chính xử lý"), alertCopy("审批已完成，需确认盖章、扫描和台账归档完成时间。", "Approval is complete; confirm timing for sealing, scanning, and archive entry.", "Phê duyệt đã xong; cần xác nhận thời gian đóng dấu, quét và lưu sổ."), alertCopy("行政部 · Tran Mai", "Administration · Tran Mai", "Hành chính · Tran Mai"), alertCopy("今天", "Today", "Hôm nay"), alertCopy("流程跟进", "Workflow follow-up", "Theo dõi quy trình")),
    ],
  },
  salesLead: {
    copy: alertCopy("销售团队预警", "Sales Team Alerts", "Cảnh báo đội kinh doanh"),
    description: alertCopy("只显示销售团队的报价、客户推进、订单交付沟通与回款事项。", "Only shows sales-team items for quotes, account progress, delivery communication, and collection.", "Chỉ hiển thị việc của đội sales: báo giá, tiến độ khách, giao hàng và thu tiền."),
    items: [
      roleAlertItem("high", alertCopy("GreenBite 报价超过 3 天未跟进", "GreenBite quote idle for over 3 days", "Báo giá GreenBite chưa theo dõi quá 3 ngày"), alertCopy("Nguyen Thi Lan 尚未录入客户反馈，需今天完成电话记录。", "Nguyen Thi Lan has not logged customer feedback; complete a call record today.", "Nguyen Thi Lan chưa ghi nhận phản hồi khách; cần hoàn thành ghi nhận cuộc gọi hôm nay."), alertCopy("Nguyen Thi Lan", "Nguyen Thi Lan", "Nguyen Thi Lan"), alertCopy("今天 08:40", "Today 08:40", "Hôm nay 08:40"), alertCopy("报价跟进", "Quote follow-up", "Theo dõi báo giá")),
      roleAlertItem("high", alertCopy("Pacific Foods 回款承诺未更新", "Pacific Foods payment commitment not updated", "Chưa cập nhật cam kết thanh toán Pacific Foods"), alertCopy("¥286,000 已逾期 14 天，请提交分客户催收计划。", "¥286,000 is 14 days overdue; submit a customer-level collection plan.", "¥286,000 quá hạn 14 ngày; hãy nộp kế hoạch thu tiền theo khách hàng."), alertCopy("陈明", "Chen Ming", "Chen Ming"), alertCopy("28 分钟前", "28 minutes ago", "28 phút trước"), alertCopy("回款跟进", "Collection follow-up", "Theo dõi thu tiền")),
      roleAlertItem("medium", alertCopy("Saigon Harvest 样品已签收待报价", "Saigon Harvest samples received; quote pending", "Saigon Harvest đã nhận mẫu, chờ báo giá"), alertCopy("客户已签收 2 天，尚未创建报价或下一步跟进时间。", "Samples were received 2 days ago; no quote or next-step time is logged.", "Khách đã nhận mẫu 2 ngày nhưng chưa có báo giá hoặc lịch bước tiếp theo."), alertCopy("Le Hoa", "Le Hoa", "Le Hoa"), alertCopy("今天", "Today", "Hôm nay"), alertCopy("样品转化", "Sample conversion", "Chuyển đổi mẫu")),
      roleAlertItem("normal", alertCopy("Natura Foods 需要客户交期沟通", "Natura Foods needs customer delivery communication", "Natura Foods cần trao đổi giao hàng với khách"), alertCopy("原料到货风险可能影响交付，请确认销售对外沟通已完成。", "A material arrival risk may affect delivery; confirm customer communication is complete.", "Rủi ro nguyên liệu có thể ảnh hưởng giao hàng; xác nhận đã trao đổi với khách."), alertCopy("陈明", "Chen Ming", "Chen Ming"), alertCopy("今天 15:00 前", "By 15:00 today", "Trước 15:00 hôm nay"), alertCopy("客户沟通", "Customer communication", "Trao đổi khách hàng")),
    ],
  },
  sales: {
    copy: alertCopy("我的跟进提醒", "My Follow-up Reminders", "Nhắc việc theo dõi của tôi"),
    description: alertCopy("只显示我负责客户的下一步动作，不显示采购、生产和全公司经营预警。", "Only shows next actions for my accounts, not procurement, production, or company-wide risks.", "Chỉ hiển thị bước tiếp theo của khách tôi phụ trách, không hiển thị cảnh báo mua hàng, sản xuất hoặc toàn công ty."),
    items: [
      roleAlertItem("high", alertCopy("GreenBite 报价需要今天跟进", "Follow up GreenBite's quote today", "Cần theo dõi báo giá GreenBite hôm nay"), alertCopy("报价 ¥178,000 已发出第 4 天，请确认样品反馈、预算和下单时间。", "The ¥178,000 quote is on day 4; confirm sample feedback, budget, and order timing.", "Báo giá ¥178,000 đã sang ngày thứ 4; xác nhận phản hồi mẫu, ngân sách và thời gian đặt hàng."), alertCopy("我的客户 · GreenBite Packaging", "My account · GreenBite Packaging", "Khách của tôi · GreenBite Packaging"), alertCopy("今天 11:00", "Today 11:00", "Hôm nay 11:00"), alertCopy("报价跟进", "Quote follow-up", "Theo dõi báo giá")),
      roleAlertItem("medium", alertCopy("Saigon Harvest 样品已签收待报价", "Saigon Harvest samples received; quote pending", "Saigon Harvest đã nhận mẫu, chờ báo giá"), alertCopy("样品签收已 2 天，请补充报价并约定下一次客户联系时间。", "Samples were received 2 days ago; create the quote and schedule the next contact.", "Khách đã nhận mẫu 2 ngày; hãy tạo báo giá và hẹn lần liên hệ tiếp theo."), alertCopy("我的客户 · Saigon Harvest", "My account · Saigon Harvest", "Khách của tôi · Saigon Harvest"), alertCopy("今天 14:00", "Today 14:00", "Hôm nay 14:00"), alertCopy("样品跟进", "Sample follow-up", "Theo dõi mẫu")),
      roleAlertItem("medium", alertCopy("Pacific Foods 需要更新付款承诺", "Update Pacific Foods payment commitment", "Cần cập nhật cam kết thanh toán Pacific Foods"), alertCopy("客户付款承诺日已过，请记录最新付款日期并同步销售负责人。", "The promised payment date has passed; log the new date and notify the sales lead.", "Ngày cam kết thanh toán đã qua; hãy ghi nhận ngày mới và thông báo trưởng sales."), alertCopy("我的客户 · Pacific Foods Co.", "My account · Pacific Foods Co.", "Khách của tôi · Pacific Foods Co."), alertCopy("今天", "Today", "Hôm nay"), alertCopy("回款跟进", "Collection follow-up", "Theo dõi thu tiền")),
      roleAlertItem("normal", alertCopy("GreenBite 样品寄送截止周五", "GreenBite samples due by Friday", "Mẫu GreenBite cần gửi trước thứ Sáu"), alertCopy("请确认第二版样品、快递单号和下周回访时间已录入。", "Confirm the revised sample, courier tracking number, and next week's follow-up are logged.", "Xác nhận mẫu phiên bản 2, mã vận đơn và lịch theo dõi tuần sau đã được ghi nhận."), alertCopy("我的客户 · GreenBite Packaging", "My account · GreenBite Packaging", "Khách của tôi · GreenBite Packaging"), alertCopy("周五前", "By Friday", "Trước thứ Sáu"), alertCopy("拜访后动作", "Post-visit action", "Việc sau thăm gặp")),
    ],
  },
  procLead: {
    copy: alertCopy("采购团队预警", "Procurement Team Alerts", "Cảnh báo đội mua hàng"),
    description: alertCopy("聚焦供应商价格、到货交期、比价决策和采购审批。", "Focus on supplier pricing, delivery dates, comparison decisions, and purchase approvals.", "Tập trung vào giá nhà cung cấp, hạn giao, quyết định so sánh và phê duyệt mua hàng."),
    items: [
      roleAlertItem("high", alertCopy("PE 原料到货影响 Natura Foods 排产", "PE arrival affects Natura Foods production", "PE về hàng ảnh hưởng sản xuất Natura Foods"), alertCopy("PO-2026-0451 需要确认现货或替代供应商，并更新预计到货时间。", "PO-2026-0451 needs available stock or an alternative supplier confirmed, with ETA updated.", "Cần xác nhận hàng sẵn hoặc nhà cung cấp thay thế cho PO-2026-0451 và cập nhật ETA."), alertCopy("采购员工 · Pham Huy", "Procurement · Pham Huy", "Mua hàng · Pham Huy"), alertCopy("今天 10:30", "Today 10:30", "Hôm nay 10:30"), alertCopy("催交风险", "Expedite risk", "Rủi ro thúc giao")),
      roleAlertItem("medium", alertCopy("铝箔 12μ 比价等待采购建议", "12μ foil comparison awaits recommendation", "So sánh nhôm 12μ chờ đề xuất mua"), alertCopy("Golden Star 价格最低，Mekong Materials 交期最快，请给出推荐方案。", "Golden Star has the lowest price and Mekong Materials the fastest lead time; submit a recommendation.", "Golden Star có giá thấp nhất, Mekong Materials giao nhanh nhất; hãy đưa đề xuất."), alertCopy("采购负责人 · 李芳", "Procurement Lead · Li Fang", "Trưởng mua hàng · Li Fang"), alertCopy("今天 16:00 前", "By 16:00 today", "Trước 16:00 hôm nay"), alertCopy("比价决策", "Comparison decision", "Quyết định so sánh")),
      roleAlertItem("normal", alertCopy("PR-2026-0318 等待总经理审批", "PR-2026-0318 awaits GM approval", "PR-2026-0318 chờ Tổng giám đốc phê duyệt"), alertCopy("金额 ¥486,000，请提前准备供应商订单和交期确认资料。", "For ¥486,000, prepare the supplier PO and delivery-confirmation materials in advance.", "Với giá trị ¥486,000, hãy chuẩn bị trước PO nhà cung cấp và hồ sơ xác nhận giao hàng."), alertCopy("采购负责人 · 李芳", "Procurement Lead · Li Fang", "Trưởng mua hàng · Li Fang"), alertCopy("已等待 26 小时", "Waiting 26 hours", "Đã chờ 26 giờ"), alertCopy("审批跟进", "Approval follow-up", "Theo dõi phê duyệt")),
    ],
  },
  proc: {
    copy: alertCopy("我的采购提醒", "My Procurement Reminders", "Nhắc việc mua hàng của tôi"),
    description: alertCopy("只显示我负责的询价、催交、到货和入库动作。", "Only shows my quote requests, expediting, receiving, and warehouse actions.", "Chỉ hiển thị việc tôi phụ trách: hỏi giá, thúc giao, nhận hàng và nhập kho."),
    items: [
      roleAlertItem("high", alertCopy("PE 原料需要优先催交", "PE material needs urgent expediting", "Nguyên liệu PE cần thúc giao gấp"), alertCopy("请在 10:30 前确认 PO-2026-0451 是否可提前到货并更新 ETA。", "By 10:30, confirm whether PO-2026-0451 can arrive early and update the ETA.", "Trước 10:30, xác nhận PO-2026-0451 có thể về sớm không và cập nhật ETA."), alertCopy("我的采购单 · PO-2026-0451", "My PO · PO-2026-0451", "PO của tôi · PO-2026-0451"), alertCopy("今天 10:30", "Today 10:30", "Hôm nay 10:30"), alertCopy("催交", "Expedite", "Thúc giao")),
      roleAlertItem("medium", alertCopy("铝箔询价信息待补全", "Foil quotation details need completion", "Thông tin hỏi giá nhôm cần hoàn thiện"), alertCopy("请补充三家供应商的现货量、付款条件和有效期。", "Add stock availability, payment terms, and validity for all three suppliers.", "Bổ sung tồn kho, điều kiện thanh toán và hiệu lực của 3 nhà cung cấp."), alertCopy("我的询价 · 铝箔 12μ", "My inquiry · 12μ foil", "Yêu cầu hỏi giá của tôi · Nhôm 12μ"), alertCopy("今天 14:00", "Today 14:00", "Hôm nay 14:00"), alertCopy("询价补全", "Quote completion", "Hoàn thiện hỏi giá")),
      roleAlertItem("normal", alertCopy("牛皮纸待确认入库", "Kraft paper awaits receiving confirmation", "Giấy kraft chờ xác nhận nhập kho"), alertCopy("PO-2026-0447 已到货，请核实数量与质量状态并完成入库记录。", "PO-2026-0447 has arrived; verify quantity and quality, then complete receiving.", "PO-2026-0447 đã về; kiểm tra số lượng, chất lượng và hoàn tất nhập kho."), alertCopy("我的采购单 · PO-2026-0447", "My PO · PO-2026-0447", "PO của tôi · PO-2026-0447"), alertCopy("今天", "Today", "Hôm nay"), alertCopy("到货入库", "Receiving", "Nhập kho")),
    ],
  },
  admin: {
    copy: alertCopy("我的行政提醒", "My Administration Reminders", "Nhắc việc hành chính của tôi"),
    description: alertCopy("只显示需要我处理的请假、用印、招聘和入离职流程。", "Only shows leave, seals, recruitment, onboarding, and offboarding work assigned to me.", "Chỉ hiển thị việc nghỉ phép, đóng dấu, tuyển dụng, nhận việc và nghỉ việc được giao cho tôi."),
    items: [
      roleAlertItem("high", alertCopy("Nguyen Van Minh 请假待行政确认", "Nguyen Van Minh leave needs administration confirmation", "Đơn nghỉ của Nguyen Van Minh chờ hành chính xác nhận"), alertCopy("销售负责人已同意，请更新请假记录并通知考勤。", "The sales lead has approved; update the leave record and notify attendance.", "Trưởng sales đã đồng ý; hãy cập nhật nghỉ phép và thông báo chấm công."), alertCopy("我的流程 · 请假申请", "My workflow · Leave request", "Quy trình của tôi · Đơn nghỉ phép"), alertCopy("今天", "Today", "Hôm nay"), alertCopy("请假办理", "Leave processing", "Xử lý nghỉ phép")),
      roleAlertItem("medium", alertCopy("年度供货合同待盖章归档", "Annual supply contract awaits sealing and filing", "Hợp đồng cung ứng năm chờ đóng dấu và lưu"), alertCopy("总经理审批完成后，执行盖章、扫描并写入合同台账。", "After GM approval, seal, scan, and add the contract to the register.", "Sau khi TGĐ duyệt, đóng dấu, quét và ghi vào sổ hợp đồng."), alertCopy("我的流程 · 合同用印", "My workflow · Contract seal", "Quy trình của tôi · Đóng dấu hợp đồng"), alertCopy("待审批后执行", "Execute after approval", "Thực hiện sau khi duyệt"), alertCopy("合同用印", "Contract seal", "Đóng dấu hợp đồng")),
      roleAlertItem("normal", alertCopy("Tran Minh 入职资料本周完成", "Tran Minh onboarding documents due this week", "Hồ sơ nhận việc Tran Minh hoàn tất tuần này"), alertCopy("请准备劳动合同、工牌、工位和入职培训清单。", "Prepare the employment contract, badge, workstation, and onboarding checklist.", "Chuẩn bị hợp đồng lao động, thẻ nhân viên, chỗ ngồi và checklist hội nhập."), alertCopy("我的流程 · 员工入职", "My workflow · Onboarding", "Quy trình của tôi · Nhận việc"), alertCopy("本周", "This week", "Tuần này"), alertCopy("入职办理", "Onboarding", "Nhận việc")),
    ],
  },
};

function getRoleAlertCenter(roleId, language) {
  const profile = roleAlertProfiles[roleId] || roleAlertProfiles.owner;
  const text = (value) => value?.[language] || value?.zh || value;
  const items = profile.items.map((item) => ({
    ...item,
    title: text(item.title),
    detail: text(item.detail),
    owner: text(item.owner),
    time: text(item.time),
    tag: text(item.tag),
  }));
  const counts = {
    high: items.filter((item) => item.priority === "high").length,
    medium: items.filter((item) => item.priority === "medium").length,
    normal: items.filter((item) => item.priority === "normal").length,
  };
  const summary = language === "vi"
    ? [`${counts.high} việc ưu tiên cao`, `${counts.medium} việc cần theo dõi`, `${counts.normal} việc cần xử lý`]
    : language === "en"
      ? [`${counts.high} high-priority items`, `${counts.medium} items to follow up`, `${counts.normal} assigned actions`]
      : [`${counts.high} 项高优先级`, `${counts.medium} 项待跟进`, `${counts.normal} 项我的待办`];
  return { title: text(profile.copy), copy: text(profile.description), items, summary };
}

const orders = [
  { code: "SO-2026-0926", customer: "Freshway Vietnam", product: "Stand-up pouch", amount: "¥ 428,000", status: "生产中", date: "09/18", risk: "normal", owner: "Nguyen Thi Lan" },
  { code: "SO-2026-0918", customer: "Natura Foods", product: "Aluminum foil sachet", amount: "¥ 362,000", status: "待原料", date: "09/15", risk: "high", owner: "陈明" },
  { code: "SO-2026-0912", customer: "Pacific Foods Co.", product: "Printed roll film", amount: "¥ 286,000", status: "待发货", date: "09/12", risk: "medium", owner: "陈明" },
  { code: "SO-2026-0909", customer: "Happy Bean", product: "Kraft paper bag", amount: "¥ 196,000", status: "已排产", date: "09/21", risk: "normal", owner: "Nguyen Thi Lan" },
];

const salesTasks = [
  { status: "待跟进", customer: "GreenBite Packaging", action: "报价发出后第 4 天，建议电话确认打样反馈", value: "¥ 178,000", age: "4 天" },
  { status: "待跟进", customer: "Saigon Harvest", action: "样品已签收，尚未提交报价", value: "预计 ¥ 96,000", age: "2 天" },
  { status: "回款风险", customer: "Pacific Foods Co.", action: "付款承诺日已过，请更新回款计划", value: "¥ 286,000", age: "逾期 14 天" },
];

const suppliers = [
  { material: "铝箔 12μ", supplier: "VietFoil", quote: "¥ 25.80/kg", change: "+8.7%", delivery: "12 天", score: "B", selected: false },
  { material: "铝箔 12μ", supplier: "Golden Star", quote: "¥ 24.60/kg", change: "+2.5%", delivery: "16 天", score: "A", selected: true },
  { material: "铝箔 12μ", supplier: "Mekong Materials", quote: "¥ 25.10/kg", change: "+4.1%", delivery: "10 天", score: "B+", selected: false },
];

const salesLocale = {
  zh: {
    ownerEyebrow: "SALES COMMAND CENTER · SEPTEMBER 2026",
    ownerTitle: "销售经营总览",
    ownerCopy: "看订单、回款、重点客户和团队风险，确定当天要推动的事项。",
    leadEyebrow: "SALES LEAD · TEAM EXECUTION",
    leadTitle: "销售负责人工作台",
    leadCopy: "分配团队跟进，盯住报价、交付和回款风险。",
    repEyebrow: "SALES · TODAY'S ACTIONS",
    repTitle: "我的销售工作台",
    repCopy: "查看今日客户任务，用 AI 录入拜访、报价和回款进展。",
    crmEyebrow: "SALES PIPELINE · CUSTOMER JOURNEY",
    crmTitle: "销售全过程",
    crmCopy: "管理客户从建档到回款的进度、记录和下一步任务。",
    order: "本月已下订单", cash: "累计回款率", margin: "平均毛利率", overdue: "逾期应收",
    funnel: "销售漏斗与转化", keyCustomers: "10 家重点客户健康度", teamScore: "销售团队组合评分",
    risks: "老板今日经营重点", viewSales: "进入销售全过程", askAI: "询问 AI",
    today: "今天需要完成", schedule: "今日跟进节奏", myPipeline: "我的客户机会", missing: "待补记录",
    visits: "本周拜访执行", conversion: "报价与订单转化", coaching: "需要辅导的销售员",
    stage: "阶段", owner: "负责人", next: "下一步", value: "预计金额", health: "健康度",
    visit: "拜访", factoryAudit: "客户验厂", sample: "打样", orderStage: "下订", delivery: "交付", reconciliation: "对账 / 回款",
    prospect: "潜在客户建档 / 询价", addProspect: "新建潜在客户", recordVisit: "记录拜访", uploadPhoto: "上传现场照片",
    visitTypes: "拜访类型统计", flow: "销售流程", aiEntry: "AI 自然语言录入",
    aiHint: "例如：今天下午上门拜访 GreenBite，客户对铝箔袋有兴趣，预计 18 万，下周寄样。",
    analyze: "让 AI 识别并生成记录", confirm: "确认保存到客户记录", extracted: "AI 已识别，等待你确认",
    assistantTitle: "AI 工作助手", assistantCopy: "使用自然语言查询、录入、翻译和分析业务数据。",
    queryMode: "查询与分析", recordMode: "自然语言录入", sourceLanguage: "识别语言", translated: "自动翻译",
    customer: "客户", action: "动作", amount: "预计金额", followUp: "下次跟进", photo: "现场照片",
    reminder: "提醒", done: "已完成", due: "今天", score: "综合得分", noData: "暂无需要补充的记录",
    conversionNote: ["拜访 → 验厂 28.6%", "打样 → 下订 38.1%", "下订 → 回款 76.8%"],
    risksData: [["PE 原料未到，交期可能延误 2 天", "销售 + 采购"], ["客户对账完成，回款逾期 14 天", "陈明"], ["报价 4 天未跟进，存在机会流失风险", "Nguyen Thi Lan"]],
    scoreNotes: ["拜访 8 · 订单 ¥1.86M", "回款风险待推进", "新客户建档领先", "报价转订单需辅导"],
    scoreWeights: ["订单与毛利 35%", "回款 25%", "拜访开发 20%", "流程 10%", "协同 10%"],
    missingData: ["上次拜访尚未上传现场照片与客户反馈", "样品已签收 2 天，尚未记录客户反馈", "需要补充客户付款承诺日期"],
  },
  en: {
    ownerEyebrow: "SALES COMMAND CENTER · SEPTEMBER 2026",
    ownerTitle: "Sales Business Overview",
    ownerCopy: "Track orders, collections, key accounts, and team risks to set today's priorities.",
    leadEyebrow: "SALES LEAD · TEAM EXECUTION",
    leadTitle: "Sales Lead Workspace",
    leadCopy: "Assign team follow-ups and control quote, delivery, and collection risks.",
    repEyebrow: "SALES · TODAY'S ACTIONS",
    repTitle: "My Sales Workspace",
    repCopy: "See today's customer tasks and use AI to log visits, quotes, and collections.",
    crmEyebrow: "SALES PIPELINE · CUSTOMER JOURNEY",
    crmTitle: "End-to-End Sales Process",
    crmCopy: "Manage customer progress, records, and next actions from registration to collection.",
    order: "Orders This Month", cash: "Collection Rate", margin: "Average Margin", overdue: "Overdue Receivables",
    funnel: "Sales Funnel & Conversion", keyCustomers: "Health of 10 Key Accounts", teamScore: "Sales Team Composite Score",
    risks: "Owner's Operating Priorities Today", viewSales: "Open Sales Process", askAI: "Ask AI",
    today: "Must Complete Today", schedule: "Today's Follow-up Rhythm", myPipeline: "My Customer Opportunities", missing: "Records to Complete",
    visits: "This Week's Visit Execution", conversion: "Quote & Order Conversion", coaching: "Sales Reps Needing Coaching",
    stage: "Stage", owner: "Owner", next: "Next step", value: "Expected value", health: "Health",
    visit: "Visit", factoryAudit: "Customer Factory Audit", sample: "Sampling", orderStage: "Order", delivery: "Delivery", reconciliation: "Reconciliation / Collection",
    prospect: "Prospect Registration / Inquiry", addProspect: "New Prospect", recordVisit: "Log Visit", uploadPhoto: "Upload Site Photos",
    visitTypes: "Visit Type Statistics", flow: "Sales Process", aiEntry: "AI Natural-language Entry",
    aiHint: "Example: I visited GreenBite this afternoon. They are interested in foil pouches, expected value RMB 180k, send samples next week.",
    analyze: "Let AI Extract a Record", confirm: "Confirm and Save to Customer", extracted: "AI extracted the following. Please confirm.",
    assistantTitle: "AI Work Assistant", assistantCopy: "Query, record, translate, and analyze business data in natural language.",
    queryMode: "Query & Analysis", recordMode: "Natural-language Entry", sourceLanguage: "Detected language", translated: "Auto-translated",
    customer: "Customer", action: "Action", amount: "Expected value", followUp: "Next follow-up", photo: "Site photos",
    reminder: "Reminder", done: "Done", due: "Today", score: "Composite score", noData: "No records need completing",
    conversionNote: ["Visit → Audit 28.6%", "Sample → Order 38.1%", "Order → Collection 76.8%"],
    risksData: [["PE material has not arrived; delivery may be delayed by 2 days", "Sales + Procurement"], ["Reconciliation is complete; collection is 14 days overdue", "Chen Ming"], ["Quote has not been followed up for 4 days; opportunity may be lost", "Nguyen Thi Lan"]],
    scoreNotes: ["8 visits · Orders ¥1.86M", "Collection risk needs action", "Leading in prospect registration", "Needs quote-to-order coaching"],
    scoreWeights: ["Orders & margin 35%", "Collection 25%", "Visits & development 20%", "Process 10%", "Collaboration 10%"],
    missingData: ["The last visit has no site photos or customer feedback", "Sample was received 2 days ago; feedback was not logged", "Add the customer's promised payment date"],
  },
  vi: {
    ownerEyebrow: "SALES COMMAND CENTER · SEPTEMBER 2026",
    ownerTitle: "Tổng quan kinh doanh",
    ownerCopy: "Theo dõi đơn hàng, thu tiền, khách hàng trọng điểm và rủi ro để xác định ưu tiên hôm nay.",
    leadEyebrow: "SALES LEAD · TEAM EXECUTION",
    leadTitle: "Bàn làm việc Trưởng kinh doanh",
    leadCopy: "Phân công theo dõi và kiểm soát rủi ro báo giá, giao hàng, thu tiền.",
    repEyebrow: "SALES · TODAY'S ACTIONS",
    repTitle: "Bàn làm việc kinh doanh của tôi",
    repCopy: "Xem việc khách hàng hôm nay và dùng AI ghi nhận thăm gặp, báo giá, thu tiền.",
    crmEyebrow: "SALES PIPELINE · CUSTOMER JOURNEY",
    crmTitle: "Quy trình kinh doanh từ đầu đến cuối",
    crmCopy: "Quản lý tiến độ, hồ sơ và việc tiếp theo của khách hàng từ tạo mới đến thu tiền.",
    order: "Đơn hàng tháng này", cash: "Tỷ lệ thu tiền", margin: "Biên lợi nhuận TB", overdue: "Công nợ quá hạn",
    funnel: "Phễu bán hàng & chuyển đổi", keyCustomers: "Sức khỏe 10 khách hàng trọng điểm", teamScore: "Điểm tổng hợp đội kinh doanh",
    risks: "Ưu tiên vận hành hôm nay", viewSales: "Mở quy trình kinh doanh", askAI: "Hỏi AI",
    today: "Việc phải xong hôm nay", schedule: "Nhịp theo dõi hôm nay", myPipeline: "Cơ hội khách hàng của tôi", missing: "Hồ sơ cần bổ sung",
    visits: "Thực hiện thăm gặp tuần này", conversion: "Chuyển đổi báo giá & đơn hàng", coaching: "Nhân viên cần hỗ trợ",
    stage: "Giai đoạn", owner: "Phụ trách", next: "Bước tiếp theo", value: "Giá trị dự kiến", health: "Tình trạng",
    visit: "Thăm gặp", factoryAudit: "Khách hàng đánh giá nhà máy", sample: "Làm mẫu", orderStage: "Đặt hàng", delivery: "Giao hàng", reconciliation: "Đối soát / Thu tiền",
    prospect: "Tạo khách hàng tiềm năng / Yêu cầu báo giá", addProspect: "Tạo khách hàng tiềm năng", recordVisit: "Ghi nhận thăm gặp", uploadPhoto: "Tải ảnh hiện trường",
    visitTypes: "Thống kê loại hình thăm gặp", flow: "Quy trình kinh doanh", aiEntry: "Nhập liệu AI bằng ngôn ngữ tự nhiên",
    aiHint: "Ví dụ: Chiều nay tôi đến thăm GreenBite. Khách quan tâm túi nhôm, dự kiến 180.000 RMB, gửi mẫu vào tuần sau.",
    analyze: "Để AI nhận diện và tạo hồ sơ", confirm: "Xác nhận lưu vào hồ sơ khách hàng", extracted: "AI đã nhận diện thông tin, vui lòng xác nhận.",
    assistantTitle: "Trợ lý công việc AI", assistantCopy: "Tra cứu, nhập liệu, dịch và phân tích dữ liệu nghiệp vụ bằng ngôn ngữ tự nhiên.",
    queryMode: "Tra cứu & phân tích", recordMode: "Nhập liệu ngôn ngữ tự nhiên", sourceLanguage: "Ngôn ngữ nhận diện", translated: "Tự động dịch",
    customer: "Khách hàng", action: "Hoạt động", amount: "Giá trị dự kiến", followUp: "Lần theo dõi tiếp", photo: "Ảnh hiện trường",
    reminder: "Nhắc việc", done: "Đã xong", due: "Hôm nay", score: "Điểm tổng hợp", noData: "Không có hồ sơ cần bổ sung",
    conversionNote: ["Thăm gặp → Đánh giá 28.6%", "Làm mẫu → Đặt hàng 38.1%", "Đặt hàng → Thu tiền 76.8%"],
    risksData: [["Nguyên liệu PE chưa đến; giao hàng có thể trễ 2 ngày", "Kinh doanh + Mua hàng"], ["Đã đối soát; công nợ quá hạn 14 ngày", "陈明"], ["Báo giá chưa được theo dõi 4 ngày; có nguy cơ mất cơ hội", "Nguyen Thi Lan"]],
    scoreNotes: ["8 lượt thăm gặp · Đơn hàng ¥1.86M", "Rủi ro thu tiền cần xử lý", "Dẫn đầu tạo khách hàng tiềm năng", "Cần hỗ trợ chuyển báo giá thành đơn"],
    scoreWeights: ["Đơn hàng & lợi nhuận 35%", "Thu tiền 25%", "Thăm gặp & phát triển 20%", "Quy trình 10%", "Phối hợp 10%"],
    missingData: ["Lần thăm gặp trước chưa có ảnh hiện trường và phản hồi khách hàng", "Khách đã nhận mẫu 2 ngày nhưng chưa ghi nhận phản hồi", "Cần bổ sung ngày khách cam kết thanh toán"],
  },
};

const keyAccounts = [
  ["GreenBite Packaging", "Nguyen Thi Lan", "报价后跟进 / Quote follow-up", "¥178K", "需跟进", "watch"],
  ["Natura Foods", "陈明", "客户验厂整改 / Audit corrective action", "¥362K", "交期风险", "risk"],
  ["Pacific Foods Co.", "陈明", "财务对账与回款 / Collection", "¥286K", "逾期 14 天", "risk"],
  ["Freshway Vietnam", "Nguyen Thi Lan", "生产进度同步 / Production update", "¥428K", "健康", "good"],
  ["Saigon Harvest", "Le Hoa", "打样后报价 / Quote after sample", "¥96K", "待跟进", "watch"],
  ["Happy Bean", "Nguyen Thi Lan", "已排产 / Scheduled", "¥196K", "健康", "good"],
  ["Mekong Organics", "Pham Quang", "潜在客户建档 / Inquiry", "¥124K", "新机会", "good"],
  ["Blue Ocean Foods", "Le Hoa", "客户来厂验厂 / Customer audit", "¥245K", "本周", "watch"],
  ["VietTaste", "Pham Quang", "打样寄送 / Sample delivery", "¥156K", "待反馈", "watch"],
  ["Lotus Coffee", "Nguyen Thi Lan", "财务对账 / Reconciliation", "¥205K", "健康", "good"],
];

function accountText(value, language) {
  const dictionary = {
    "报价后跟进 / Quote follow-up": ["报价后跟进", "Quote follow-up", "Theo dõi sau báo giá"],
    "客户验厂整改 / Audit corrective action": ["客户验厂整改", "Audit corrective action", "Khắc phục sau đánh giá nhà máy"],
    "财务对账与回款 / Collection": ["财务对账与回款", "Reconciliation & collection", "Đối soát và thu tiền"],
    "生产进度同步 / Production update": ["生产进度同步", "Production update", "Cập nhật tiến độ sản xuất"],
    "打样后报价 / Quote after sample": ["打样后报价", "Quote after sample", "Báo giá sau làm mẫu"],
    "已排产 / Scheduled": ["已排产", "Scheduled", "Đã lên kế hoạch sản xuất"],
    "潜在客户建档 / Inquiry": ["潜在客户建档", "Prospect registration", "Tạo hồ sơ khách hàng tiềm năng"],
    "客户来厂验厂 / Customer audit": ["客户来厂验厂", "Customer factory audit", "Khách hàng đánh giá nhà máy"],
    "打样寄送 / Sample delivery": ["打样寄送", "Sample delivery", "Gửi mẫu"],
    "财务对账 / Reconciliation": ["财务对账", "Reconciliation", "Đối soát"],
  };
  return dictionary[value]?.[{ zh: 0, en: 1, vi: 2 }[language]] || value;
}

function healthText(value, language) {
  const dictionary = { "需跟进": ["需跟进", "Follow up", "Cần theo dõi"], "待跟进": ["待跟进", "Awaiting follow-up", "Chờ theo dõi"], "交期风险": ["交期风险", "Delivery risk", "Rủi ro giao hàng"], "逾期 14 天": ["逾期 14 天", "14 days overdue", "Quá hạn 14 ngày"], "健康": ["健康", "Healthy", "Tốt"], "新机会": ["新机会", "New opportunity", "Cơ hội mới"], "本周": ["本周", "This week", "Tuần này"], "待反馈": ["待反馈", "Awaiting feedback", "Chờ phản hồi"] };
  return dictionary[value]?.[{ zh: 0, en: 1, vi: 2 }[language]] || value;
}

function getAssistantReply(prompt, language = "zh", savedVisits = []) {
  const query = prompt.toLowerCase();
  const latestVisit = savedVisits[0];
  const asksKeyFollowUp = /重点客户.*(没有|未).*跟进|没有.*及时跟进|及时跟进|key.*account.*follow|follow.*key.*account/.test(query);
  const asksCollectionOwner = /哪个销售员.*回款|回款.*哪个销售员|回款.*(弱|推进)|collection.*(weak|progress)|who.*collection/.test(query);
  const procurement = /采购|供应商|原料|mua|nhà cung cấp|nguyên liệu|procurement|supplier|foil/.test(query);
  const delivery = /交期|订单|giao hàng|đơn hàng|delivery|order/.test(query);
  const followUp = /报价|跟进|báo giá|theo dõi|quote|follow/.test(query);
  if (latestVisit && asksKeyFollowUp) {
    return language === "vi"
      ? "GreenBite Packaging đã được Nguyen Thi Lan ghi nhận thăm gặp trực tiếp hôm nay, nên không còn là khách hàng chưa có hoạt động theo dõi. Bước tiếp theo là gửi mẫu trước thứ Sáu và gọi lại vào tuần sau. Các khách hàng trọng điểm vẫn cần thúc đẩy là Saigon Harvest (đã nhận mẫu nhưng chưa có phản hồi/báo giá) và Pacific Foods Co. (công nợ quá hạn 14 ngày). Đề xuất: trưởng nhóm kiểm tra việc gửi mẫu GreenBite vào thứ Sáu và yêu cầu cập nhật cam kết thanh toán Pacific Foods hôm nay."
      : language === "en"
        ? "Nguyen Thi Lan logged an on-site visit to GreenBite Packaging today, so it is no longer an account with no follow-up activity. The next action is to send samples by Friday and call again next week. Saigon Harvest still needs action because its sample feedback and quote are pending, while Pacific Foods Co. remains 14 days overdue. Recommendation: the sales lead should verify GreenBite sample dispatch on Friday and require a payment-commitment update for Pacific Foods today."
        : "GreenBite Packaging 已由 Nguyen Thi Lan 在今天完成上门拜访并录入系统，已不属于“未及时跟进”的重点客户；下一步是周五前寄样、下周电话确认反馈。目前仍需优先推动的是 Saigon Harvest（样品已签收但反馈与报价未推进）和 Pacific Foods Co.（回款已逾期 14 天）。建议销售负责人周五核验 GreenBite 寄样，今天要求陈明更新 Pacific Foods 的付款承诺。";
  }
  if (asksCollectionOwner) {
    return language === "vi"
      ? "Tiến độ thu tiền yếu nhất hiện là Chen Ming: Pacific Foods Co. còn ¥286,000, đã quá hạn 14 ngày và chưa cập nhật cam kết thanh toán mới. Nguyen Thi Lan vừa hoàn thành thăm gặp GreenBite với cơ hội dự kiến ¥180,000; việc này đang được theo dõi đúng nhịp và chưa phải rủi ro thu tiền. Đề xuất: Chen Ming liên hệ khách hàng hôm nay, ghi rõ ngày cam kết thanh toán và báo cáo lại cho trưởng nhóm trước cuối ngày."
      : language === "en"
        ? "Chen Ming has the weakest collection progress: Pacific Foods Co. has ¥286,000 overdue for 14 days and no updated payment commitment. Nguyen Thi Lan has just completed the GreenBite visit for an expected ¥180,000 opportunity, which is now on a defined follow-up rhythm rather than a collection risk. Recommendation: Chen Ming should contact the customer today, record a committed payment date, and report back to the sales lead before day end."
        : "当前回款推进较弱的是陈明：Pacific Foods Co. 的 ¥286,000 已逾期 14 天，且尚未更新客户付款承诺。Nguyen Thi Lan 刚完成 GreenBite 的上门拜访，预计机会金额 ¥180,000，已进入明确的寄样与回访节奏，暂不是回款风险。建议陈明今天联系客户、补录明确付款承诺日期，并在下班前向销售负责人反馈。";
  }
  const replies = language === "vi" ? {
    procurement: "Trong ba báo giá nhôm 12μ, Golden Star có giá thấp nhất (¥24.60/kg) và điểm nhà cung cấp A, nhưng thời hạn là 16 ngày. Mekong Materials giao nhanh nhất, 10 ngày. Nếu SO-2026-0918 cần nguyên liệu gấp, hãy hỏi Mekong về hàng sẵn có trước.",
    delivery: "Có 2 đơn cần ưu tiên: SO-2026-0918 thiếu nguyên liệu PE và dự kiến trễ 2 ngày; SO-2026-0912 chờ giao nhưng Pacific Foods Co. vẫn có công nợ quá hạn. Mua hàng cần xác nhận ngày nguyên liệu về hôm nay, kinh doanh cần cập nhật kế hoạch giao và thu tiền.",
    followUp: "Có 3 báo giá chưa được theo dõi quá 3 ngày. Giá trị cao nhất là GreenBite Packaging (¥178,000), đã gửi báo giá 4 ngày. Nguyen Thi Lan nên gọi hôm nay để xác nhận phản hồi về mẫu và giá.",
    general: "Nhà máy hôm nay vận hành ổn định. Đơn hàng tháng này là ¥12.84M, tỷ lệ thu tiền lũy kế 76.8%. Ưu tiên SO-2026-0918, công nợ Pacific Foods Co. và 3 báo giá chưa theo dõi.",
  } : language === "en" ? {
    procurement: "Among the three 12μ foil quotes, Golden Star has the lowest price (¥24.60/kg) and an A supplier rating, but its lead time is 16 days. Mekong Materials is fastest at 10 days. For the urgent SO-2026-0918 requirement, ask Mekong about available stock first.",
    delivery: "Two orders need priority action: SO-2026-0918 lacks PE material and is expected to slip by 2 days; SO-2026-0912 awaits shipment while Pacific Foods Co. has overdue receivables. Procurement should confirm the material arrival today, and sales should align delivery and collection plans.",
    followUp: "Three quotes have not been followed up for more than 3 days. GreenBite Packaging is the largest at ¥178,000 and has been open for 4 days. Nguyen Thi Lan should call today to confirm sample and price feedback.",
    general: "The factory is stable today. Orders this month are ¥12.84M and the cumulative collection rate is 76.8%. Prioritize SO-2026-0918, Pacific Foods Co.'s overdue collection, and three unaddressed quotes.",
  } : {
    procurement: "铝箔 12μ 的三家报价中，Golden Star 价格最低（¥24.60/kg）且供应商评分为 A，但交期为 16 天；Mekong Materials 交期最快（10 天）。若 SO-2026-0918 的原料需求紧急，建议优先向 Mekong Materials 询问现货。",
    delivery: "当前有 2 笔订单需要优先推进：SO-2026-0918 因 PE 原料未到货，预计晚于交期 2 天；SO-2026-0912 已待发货，但客户 Pacific Foods Co. 仍有逾期应收。建议采购部今天确认原料到货，销售部同步客户交付与回款安排。",
    followUp: "共有 3 份报价超过 3 天未跟进。金额最高的是 GreenBite Packaging（¥178,000），报价已发出 4 天。建议今天由 Nguyen Thi Lan 电话确认客户对打样与价格的反馈。",
    general: "今天工厂整体运行平稳。本月已下订单金额为 ¥12.84M，累计回款率 76.8%。优先处理交期风险订单 SO-2026-0918、Pacific Foods Co. 的逾期回款，以及 3 份未跟进报价。",
  };
  return procurement ? replies.procurement : delivery ? replies.delivery : followUp ? replies.followUp : replies.general;
}

function PresentationMarkup({ enabled, clearSignal }) {
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [drawing, setDrawing] = useState(false);
  const [strokes, setStrokes] = useState([]);

  useEffect(() => {
    setDrawing(false);
    setStrokes([]);
    if (!enabled) return undefined;

    const getPoint = (event) => ({ x: event.clientX, y: event.clientY });
    const moveCursor = (event) => setCursor(getPoint(event));
    const startDrawing = (event) => {
      moveCursor(event);
      if (event.button !== 2) return;
      event.preventDefault();
      setDrawing(true);
      setStrokes((current) => [...current, [getPoint(event)]]);
    };
    const extendStroke = (event) => {
      moveCursor(event);
      if (!(event.buttons & 2)) return;
      event.preventDefault();
      setStrokes((current) => {
        if (!current.length) return current;
        const next = current.slice();
        next[next.length - 1] = [...next[next.length - 1], getPoint(event)];
        return next;
      });
    };
    const stopDrawing = (event) => {
      moveCursor(event);
      if (event.button === 2) setDrawing(false);
    };
    const blockContextMenu = (event) => event.preventDefault();

    window.addEventListener("mousemove", extendStroke, true);
    window.addEventListener("mousedown", startDrawing, true);
    window.addEventListener("mouseup", stopDrawing, true);
    window.addEventListener("contextmenu", blockContextMenu, true);
    return () => {
      window.removeEventListener("mousemove", extendStroke, true);
      window.removeEventListener("mousedown", startDrawing, true);
      window.removeEventListener("mouseup", stopDrawing, true);
      window.removeEventListener("contextmenu", blockContextMenu, true);
    };
  }, [enabled]);

  useEffect(() => {
    if (enabled) setStrokes([]);
  }, [clearSignal, enabled]);

  if (!enabled) return null;

  return (
    <div className="presentation-markup" aria-hidden="true">
      <svg className="markup-canvas" width="100%" height="100%">
        {strokes.map((stroke, index) => stroke.length > 1 && (
          <polyline
            key={index}
            points={stroke.map((point) => `${point.x},${point.y}`).join(" ")}
            className="markup-stroke"
          />
        ))}
      </svg>
      <div className={`presentation-cursor ${drawing ? "is-drawing" : ""}`} style={{ left: cursor.x, top: cursor.y }}>
        <MousePointer2 size={58} fill="#ffffff" strokeWidth={2.5} />
      </div>
    </div>
  );
}

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [language, setLanguage] = useState("zh");
  const [roleId, setRoleId] = useState("owner");
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [imported, setImported] = useState(false);
  const [response, setResponse] = useState("");
  const [entryPreview, setEntryPreview] = useState(null);
  const [savedVisits, setSavedVisits] = useState([]);
  const [lastSavedVisit, setLastSavedVisit] = useState(null);
  const [annotationMode, setAnnotationMode] = useState(false);
  const [markupClearSignal, setMarkupClearSignal] = useState(0);
  const [showRoleFocus, setShowRoleFocus] = useState(false);
  const t = translations[language];
  const role = roles.find((item) => item.id === roleId);
  const navigation = roleNavigation[roleId] || roleNavigation.owner;
  const workspaceNavigation = navItems.filter((item) => item.group === "workspace" && navigation.workspace.includes(item.id));
  const managementNavigation = navItems.filter((item) => item.group === "manage" && navigation.manage.includes(item.id));
  const alertCenter = getRoleAlertCenter(roleId, language);

  const pageTitle = useMemo(() => {
    if (activePage === "alerts") return getRoleAlertCenter(roleId, language).title;
    const item = navItems.find((nav) => nav.id === activePage);
    return item ? t[item.id] : t.dashboard;
  }, [activePage, language, roleId, t]);

  function navigateTo(page) {
    const allowed = page === "dashboard" || page === "alerts" || navigation.workspace.includes(page) || navigation.manage.includes(page);
    setActivePage(allowed ? page : "dashboard");
  }

  function askAssistant(prompt) {
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt) return;
    setResponse(getAssistantReply(cleanPrompt, language, savedVisits));
    setEntryPreview(null);
  }

  function captureSalesRecord(prompt) {
    if (!prompt.trim()) return;
    setEntryPreview({
      customer: prompt.includes("GreenBite") ? "GreenBite Packaging" : "GreenBite Packaging",
      action: language === "vi" ? "Thăm gặp trực tiếp" : language === "en" ? "On-site visit" : "上门拜访",
      amount: "¥ 180,000",
      followUp: language === "vi" ? "Gửi mẫu trước thứ Sáu, gọi lại tuần sau" : language === "en" ? "Send samples by Friday; call next week" : "周五前寄样，下周电话跟进",
      language: language === "vi" ? "Tiếng Việt" : language === "en" ? "English" : "中文",
      visitType: "onSite",
    });
    setResponse("");
  }

  function saveSalesRecord(record) {
    const savedRecord = {
      ...record,
      id: `visit-${Date.now()}`,
      recordedBy: "Nguyen Thi Lan",
      recordedAt: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false }),
    };
    setSavedVisits((visits) => [savedRecord, ...visits]);
    setLastSavedVisit(savedRecord);
    setEntryPreview(null);
    setResponse("");
  }

  function renderPage() {
    switch (activePage) {
      case "sales":
        return <SalesPage language={language} role={role} onAsk={askAssistant} onCapture={captureSalesRecord} onSaveRecord={saveSalesRecord} entryPreview={entryPreview} lastSavedVisit={lastSavedVisit} savedVisits={savedVisits} />;
      case "production":
        return <ProductionPage language={language} />;
      case "procurement":
        return <ProcurementPage language={language} />;
      case "admin":
        return <AdminPage language={language} />;
      case "approvals":
        return <ApprovalsPage language={language} role={role} />;
      case "alerts":
        return <AlertsPage language={language} role={role} />;
      case "assistant":
        return <AssistantPage language={language} query={query} setQuery={setQuery} response={response} onAsk={askAssistant} onCapture={captureSalesRecord} onSaveRecord={saveSalesRecord} entryPreview={entryPreview} />;
      case "import":
        return <ImportPage language={language} imported={imported} setImported={setImported} />;
      default:
        return <RoleDashboard language={language} role={role} onNavigate={navigateTo} onAsk={askAssistant} onSaveRecord={saveSalesRecord} savedVisits={savedVisits} onShowRoleFocus={() => setShowRoleFocus(true)} />;
    }
  }

  return (
    <div className={`app-shell ${annotationMode ? "presentation-mode" : ""}`}>
      <aside className={`sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <div className="brand">
          <span className="brand-logo-wrap"><img className="brand-logo" src={`${import.meta.env.BASE_URL}assets/epac-logo.png`} alt="EPAC 易帕包装" /></span>
          <div className="brand-copy"><strong>{t.brand}</strong><span>INTELLIGENT WORKBENCH</span></div>
        </div>
        <div className="factory-chip"><span className="pulse" /> {t.factoryDemo}</div>
        <nav>
          {workspaceNavigation.length > 0 && <p className="nav-heading">{t.workspace}</p>}
          {workspaceNavigation.map((item) => (
            <NavButton key={item.id} item={item} active={activePage === item.id} text={t[item.id]} onClick={() => { navigateTo(item.id); setSidebarOpen(false); }} />
          ))}
          {managementNavigation.length > 0 && <p className="nav-heading nav-heading-spaced">{t.manage}</p>}
          {managementNavigation.map((item) => (
            <NavButton key={item.id} item={item} active={activePage === item.id} text={t[item.id]} onClick={() => { navigateTo(item.id); setSidebarOpen(false); }} />
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-button"><Settings size={18} /><span>{t.settings}</span></button>
          <div className="security-note"><ShieldCheck size={15} /> {t.offlineDemo}</div>
        </div>
      </aside>

      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}

      <main className="main-content">
        <header className="topbar">
          <button className="menu-button icon-button" onClick={() => setSidebarOpen(true)} aria-label={t.openNav}><Menu size={21} /></button>
          <div className="breadcrumb"><span>EPAC Intelligent Workbench</span><span className="divider">/</span><strong>{pageTitle}</strong></div>
          <div className="topbar-actions">
            <div className={`demo-control ${annotationMode ? "is-running" : ""}`}>
              <button className="demo-button" onClick={() => setAnnotationMode((active) => !active)} title={annotationMode ? t.annotationModeActive : t.annotationMode}>
                <MousePointer2 size={15} /><span>{annotationMode ? t.annotationModeActive : t.annotationMode}</span>
              </button>
              {annotationMode && <button className="markup-clear-button" onClick={() => setMarkupClearSignal((count) => count + 1)} title={t.clearMarkup}>
                <Eraser size={15} /><span>{t.clearMarkup}</span>
              </button>}
            </div>
            {showRoleFocus && <RoleFocusButton language={language} active onClick={() => setShowRoleFocus(false)} />}
            <button className="icon-button notification-button" aria-label={alertCenter.title} title={alertCenter.title} onClick={() => navigateTo("alerts")}><Bell size={19} /><span>{alertCenter.items.length}</span></button>
            <div className="language-switch">
              <Languages size={16} />
              <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Language">
                <option value="zh">中文</option>
                <option value="en">English</option>
                <option value="vi">Tiếng Việt</option>
              </select>
            </div>
            <div className="role-switcher">
              <button className="profile-button" onClick={() => setRoleMenuOpen(!roleMenuOpen)}>
                <span className="avatar" style={{ background: role.color }}>{role.initials}</span>
                <span className="profile-copy"><strong>{role.name}</strong><small>{roleTitle(role.id, language)}</small></span>
                <ChevronDown size={16} />
              </button>
              {roleMenuOpen && (
                <div className="role-menu">
                  <p>{t.roleSwitch}</p>
                  {roles.map((person) => <button key={person.id} onClick={() => { setRoleId(person.id); setActivePage("dashboard"); setRoleMenuOpen(false); setShowRoleFocus(false); if (person.id === "sales") setLanguage("vi"); }}>
                    <span className="avatar small" style={{ background: person.color }}>{person.initials}</span><span><strong>{person.name}</strong><small>{roleTitle(person.id, language)}</small></span>
                  </button>)}
                </div>
              )}
            </div>
          </div>
        </header>
        <PresentationMarkup enabled={annotationMode} clearSignal={markupClearSignal} />
        <section className="page-content">
          {renderPage()}
          {showRoleFocus && <RoleFocusOverlay role={role} language={language} />}
        </section>
      </main>
    </div>
  );
}

function NavButton({ item, active, text, onClick }) {
  const Icon = item.icon;
  return <button className={`nav-button ${active ? "active" : ""}`} onClick={onClick}><Icon size={18} /><span>{text}</span>{item.id === "alerts" && <b>5</b>}</button>;
}

const roleDashboards = {
  gm: {
    eyebrow: "GENERAL MANAGER · DAILY EXECUTION", title: "总经理执行台", copy: "协调交期、回款和审批，推动跨部门问题闭环。", action: "查看经营风险", actionPage: "alerts", ask: "本周最需要处理什么？",
    metrics: [["今日需推进异常", "5", "2 项跨部门"], ["高风险订单", "2", "均涉及原料交期"], ["逾期应收", "¥ 1.26M", "8 笔待推进"], ["待我审批", "4", "1 项超过 24 小时"]],
    titleOne: "今日跨部门推进事项", titleTwo: "部门今日状态",
    tasks: [["交期风险", "SO-2026-0918 · Natura Foods", "PE 原料到货晚于生产需求，需采购确认现货、销售同步客户。", "采购 + 销售"], ["回款风险", "Pacific Foods Co. · ¥286,000", "回款已逾期 14 天，销售负责人需要今天提交催款计划。", "销售部"], ["价格异常", "铝箔 12μ · VietFoil", "报价高于 90 日均价 8.7%，需要确认替代供应商和安全库存。", "采购部"]],
    pulse: [["销售部", "3 项报价待跟进", "需关注"], ["采购部", "1 项原料到货风险", "高优先级"], ["行政部", "2 项合同等待审批", "正常"]],
  },
  salesLead: {
    eyebrow: "SALES LEAD · TEAM EXECUTION", title: "销售负责人工作台", copy: "分配团队跟进，盯住报价、交付和回款风险。", action: "进入销售工作台", actionPage: "sales", ask: "哪些报价没有跟进？",
    metrics: [["本月团队订单", "¥ 12.84M", "+12.6%", true], ["待跟进报价", "12", "3 项已超期"], ["重点机会", "¥ 1.38M", "7 个客户"], ["逾期应收", "¥ 1.26M", "8 笔订单"]],
    titleOne: "需要分配或推动的事项", titleTwo: "团队执行脉搏",
    tasks: [["报价跟进", "GreenBite Packaging · ¥178,000", "报价已经发出 4 天，未记录客户反馈。建议指定业务员今天电话跟进。", "Nguyen Thi Lan"], ["订单交付", "SO-2026-0918 · Natura Foods", "原料未到导致排产风险。请同步采购确认到货时间，并向客户预沟通。", "陈明"], ["客户回款", "Pacific Foods Co. · ¥286,000", "回款逾期 14 天，需要更新客户付款承诺和催款记录。", "陈明"]],
    pulse: [["Nguyen Thi Lan", "2 个重点报价待推进", "今天截止"], ["Pham Quang", "4 笔订单生产正常", "正常"], ["Le Hoa", "1 笔应收逾期", "需跟进"]],
  },
  sales: {
    eyebrow: "SALES · TODAY'S ACTIONS", title: "销售员工工作台", copy: "查看今日客户任务，用 AI 录入拜访、报价和回款进展。", action: "查看我的客户", actionPage: "sales", ask: "哪些报价没有跟进？",
    metrics: [["我的本月订单", "¥ 1.86M", "完成目标 74%", true], ["今天待跟进", "4", "含 1 项超期"], ["进行中报价", "6", "预计 ¥ 536,000"], ["我的应收逾期", "¥ 286K", "1 位重点客户"]],
    titleOne: "我今天要做什么", titleTwo: "我的客户机会",
    tasks: [["优先跟进", "GreenBite Packaging", "报价 ¥178,000 已发出 4 天，请确认打样反馈、预算和下单时间。", "今天 11:00"], ["订单协同", "Freshway Vietnam · SO-2026-0926", "订单正在生产中，请在今天下午向客户发送生产进度更新。", "今天 15:00"], ["回款推进", "Pacific Foods Co.", "逾期 ¥286,000，请记录客户承诺付款日期并同步负责人。", "今天"]],
    pulse: [["GreenBite Packaging", "报价已发，待反馈", "¥178,000"], ["Saigon Harvest", "样品已签收，待报价", "¥96,000"], ["Happy Bean", "订单已排产", "¥196,000"]],
  },
  procLead: {
    eyebrow: "PROCUREMENT LEAD · SUPPLY CONTROL", title: "采购负责人工作台", copy: "决策比价与交期，处理供应商和采购风险。", action: "进入采购工作台", actionPage: "procurement", ask: "比较铝箔供应商报价",
    metrics: [["本月采购金额", "¥ 5.42M", "较上月 +4.8%"], ["待比价申请", "6", "2 项今日到期"], ["临近到货", "9", "未来 7 天"], ["价格异常", "3", "铝箔涨幅明显"]],
    titleOne: "采购负责人优先事项", titleTwo: "供应链风险状态",
    tasks: [["催交", "PO-2026-0451 · PE 原料", "预计到货晚于 SO-2026-0918 生产需求，需要确认现货或替代供应商。", "Pham Huy"], ["比价决策", "铝箔 12μ · 3 家供应商", "Golden Star 价格最低，Mekong Materials 交期最快，请确认采购建议。", "今天"], ["审批", "PR-2026-0318 · PE 原料 18 吨", "采购申请金额 ¥486,000，直接影响重点订单交期。", "待总经理"]],
    pulse: [["VietFoil", "报价高于均价 8.7%", "需比价"], ["Golden Star", "价格最优，交期 16 天", "可选"], ["Mekong Materials", "交期最快，10 天", "可选"]],
  },
  proc: {
    eyebrow: "PROCUREMENT · TODAY'S ACTIONS", title: "采购员工工作台", copy: "处理询价、催交、到货和采购申请。", action: "查看采购任务", actionPage: "procurement", ask: "哪些采购订单临近到货？",
    metrics: [["我的待办", "7", "2 项今天到期"], ["待询价物料", "3", "共 6 家供应商"], ["待催交订单", "2", "影响 1 笔销售订单"], ["待审批申请", "1", "PR-2026-0318"]],
    titleOne: "我今天要做什么", titleTwo: "我的采购单状态",
    tasks: [["优先催交", "PO-2026-0451 · PE 原料", "联系供应商确认 09/14 是否能提前到货，并更新预计到货时间。", "今天 10:30"], ["询价", "铝箔 12μ · 18 吨", "向 Golden Star、Mekong Materials 获取最新价格、现货量和付款条件。", "今天 14:00"], ["入库确认", "PO-2026-0447 · 牛皮纸", "核实到货数量与质量状态，完成入库记录。", "今天"]],
    pulse: [["PO-2026-0451", "PE 原料 · 待到货", "高优先级"], ["PO-2026-0447", "牛皮纸 · 待入库", "今天"], ["PR-2026-0318", "待总经理审批", "¥486,000"]],
  },
  admin: {
    eyebrow: "ADMINISTRATION · DAILY OPERATIONS", title: "行政工作台", copy: "办理请假、用印、招聘和入离职流程。", action: "行政文件数据上传", actionPage: "admin", ask: "本周最需要处理什么？",
    metrics: [["待处理申请", "7", "3 项请假"], ["待用印合同", "3", "1 项待总经理"], ["招聘待办", "2", "销售专员面试"], ["入离职事项", "3", "本周完成"]],
    titleOne: "我今天要做什么", titleTwo: "流程状态",
    tasks: [["请假审批", "Nguyen Van Minh · 年假 2 天", "销售负责人已审批，等待行政确认并更新请假记录。", "今天"], ["合同用印", "客户年度供货合同", "总经理审批完成后，执行盖章、扫描和台账归档。", "待审批"], ["员工入职", "Tran Minh · 09/12 入职", "准备劳动合同、工牌、工位和入职培训清单。", "本周"]],
    pulse: [["请假申请", "3 项等待行政确认", "今天"], ["合同用印", "2 项等待总经理审批", "待处理"], ["招聘入职", "Tran Minh 09/12 入职", "进行中"]],
  },
};

function RoleDashboard({ language, role, onNavigate, onAsk, onSaveRecord, savedVisits, onShowRoleFocus }) {
  const [showAdminKnowledgeUpload, setShowAdminKnowledgeUpload] = useState(false);
  const [showMeetingRecorder, setShowMeetingRecorder] = useState(false);
  const [adminKnowledge, setAdminKnowledge] = useState(null);
  if (role.id === "owner") return <OwnerSalesDashboard language={language} onNavigate={onNavigate} onAsk={onAsk} savedVisits={savedVisits} onShowRoleFocus={onShowRoleFocus} />;
  if (role.id === "gm") return <GeneralManagerDashboard language={language} role={role} onNavigate={onNavigate} onSaveRecord={onSaveRecord} onShowRoleFocus={onShowRoleFocus} />;
  if (role.id === "salesLead") return <SalesLeadDashboard language={language} onNavigate={onNavigate} onAsk={onAsk} savedVisits={savedVisits} onShowRoleFocus={onShowRoleFocus} />;
  if (role.id === "sales") return <SalesRepDashboard language={language} onNavigate={onNavigate} onAsk={onAsk} onSaveRecord={onSaveRecord} savedVisits={savedVisits} onShowRoleFocus={onShowRoleFocus} />;
  const config = getLocalizedRoleDashboard(role.id, language);
  return <div className="work-page role-dashboard">
    <PageIntro eyebrow={config.eyebrow} title={config.title} copy={config.copy} actions={role.id === "admin"
      ? <><RoleFocusButton language={language} onClick={onShowRoleFocus} /><button className="secondary-button" onClick={() => setShowMeetingRecorder(true)}><AudioLines size={16} /> {language === "zh" ? "会议记录" : language === "en" ? "Meeting record" : "Ghi nhận cuộc họp"}</button><button className="primary-button" onClick={() => setShowAdminKnowledgeUpload(true)}><Upload size={16} /> {config.action}</button></>
      : <><RoleFocusButton language={language} onClick={onShowRoleFocus} /><button className="primary-button" onClick={() => onNavigate(config.actionPage)}><Upload size={16} /> {config.action}</button></>} />
    <section className="metric-strip">{config.metrics.map(([label, value, note, positive]) => <MiniMetric key={label} label={label} value={value} note={note} positive={positive} />)}</section>
    <RoleAIHub language={language} role={role} onSaveRecord={onSaveRecord} adminKnowledge={adminKnowledge} />
    <section className="dashboard-grid role-grid">
      <article className="panel"><PanelHead title={config.titleOne} action={translations[language].all} onClick={() => onNavigate(config.actionPage)} /><div className="role-task-list">{config.tasks.map(([label, title, detail, deadline]) => <div className="role-task" key={title}><span className={`role-task-label ${label.includes("风险") || label.includes("催交") || label.includes("risk") || label.includes("Expedite") || label.includes("Rủi ro") ? "critical" : ""}`}>{label}</span><div><strong>{title}</strong><p>{detail}</p><small>{deadline}</small></div><button onClick={() => onNavigate(config.actionPage)} aria-label={`${translations[language].view} ${title}`}><ChevronDown size={17} /></button></div>)}</div></article>
      <article className="panel role-pulse"><PanelHead title={config.titleTwo} /><div>{config.pulse.map(([name, detail, status]) => <div className="pulse-row" key={name}><span className="avatar small" style={{ background: role.color }}>{name.slice(0, 1)}</span><div><strong>{name}</strong><small>{detail}</small></div><b>{status}</b></div>)}</div><div className="role-ai-note"><Sparkles size={17} /><span>{config.aiNote}</span></div></article>
    </section>
    {role.id === "admin" && showAdminKnowledgeUpload && <AdminKnowledgeUploadModal language={language} onComplete={setAdminKnowledge} onClose={() => setShowAdminKnowledgeUpload(false)} />}
    {role.id === "admin" && showMeetingRecorder && <AdminMeetingRecorderModal language={language} onClose={() => setShowMeetingRecorder(false)} />}
  </div>;
}

function AdminKnowledgeUploadModal({ language, onComplete, onClose }) {
  const [files, setFiles] = useState([]);
  const [phase, setPhase] = useState("idle");
  const l = language === "vi"
    ? { eyebrow: "THƯ VIỆN TRI THỨC HÀNH CHÍNH", title: "Nhập gói dữ liệu hành chính", copy: "Tải một hoặc nhiều tệp, hoặc một gói ZIP. AI tự nhận diện ngôn ngữ, phân loại và tạo kho tư liệu có thể tra cứu.", select: "Chọn tệp hoặc gói ZIP", types: "Hỗ trợ PDF, Word, Excel, hình ảnh, văn bản và ZIP", source: "Kho tư liệu sẽ được AI phân loại", examples: ["Quy chế nghỉ phép và chấm công", "Công văn, thông báo của cơ quan nhà nước", "Biểu mẫu hợp đồng, đóng dấu và hồ sơ nhân sự"], note: "Khi nhân sự hành chính thay đổi, nhân viên mới vẫn có thể hỏi AI về quy định, biểu mẫu và lịch sử hồ sơ.", close: "Đóng", steps: ["Đang đọc gói tài liệu", "Đang nhận diện ngôn ngữ và nội dung", "Đang tự động phân loại và lập chỉ mục", "Kho tư liệu đã sẵn sàng để AI tra cứu"], completed: "Đã nhập 24 tài liệu · 5 nhóm tư liệu · 3 ngôn ngữ", categories: ["Quy định công ty", "Nhân sự vào / ra", "Hợp đồng và đóng dấu", "Công văn nhà nước", "Biểu mẫu và sổ theo dõi"], ready: "Mở AI để tra cứu" }
    : language === "en"
      ? { eyebrow: "ADMINISTRATION KNOWLEDGE LIBRARY", title: "Import administration knowledge pack", copy: "Upload multiple files or a ZIP package. AI detects language, classifies documents, and creates a searchable knowledge library.", select: "Choose files or ZIP package", types: "Supports PDF, Word, Excel, images, text, and ZIP files", source: "AI classification preview", examples: ["Leave and attendance policies", "Government notices and official correspondence", "Contract, company seal, and HR templates"], note: "When an administrator changes, the next employee can still ask AI about policies, templates, and document history.", close: "Close", steps: ["Reading document package", "Detecting language and content", "Classifying and indexing automatically", "Knowledge library is ready for AI search"], completed: "24 documents imported · 5 categories · 3 languages", categories: ["Company policies", "Employee lifecycle", "Contracts and seals", "Government notices", "Templates and registers"], ready: "Open AI search" }
      : { eyebrow: "ADMINISTRATION KNOWLEDGE LIBRARY", title: "导入行政资料包", copy: "可一次上传多个文件或 ZIP 资料包，AI 自动识别语言、分类归档，并形成可查询的行政知识库。", select: "选择文件或 ZIP 资料包", types: "支持 PDF、Word、Excel、图片、文本及 ZIP 文件", source: "AI 自动分类预览", examples: ["请假、考勤与行政管理制度", "政府部门公文、通知与政策文件", "合同用印、招聘入离职表单与历史资料"], note: "即使行政人员离职，新同事也可以直接询问 AI，快速查询制度、模板和历史文件。", close: "关闭", steps: ["正在读取行政资料包", "正在识别原文语言与内容", "正在自动分类、提取要点和建立索引", "行政知识库已可被 AI 查询"], completed: "已导入 24 份资料 · 自动归类 5 个类别 · 覆盖 3 种语言", categories: ["公司制度", "员工入职 / 离职", "合同与用印", "政府公文", "表单与行政台账"], ready: "进入 AI 查询" };
  const isReady = phase === "ready";
  const chooseFiles = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (!selectedFiles.length) return;
    setFiles(selectedFiles);
    setPhase("reading");
    window.setTimeout(() => setPhase("detecting"), 700);
    window.setTimeout(() => setPhase("indexing"), 1450);
    window.setTimeout(() => {
      setPhase("ready");
      onComplete({ importedAt: new Date().toISOString(), fileCount: Math.max(24, selectedFiles.length), latestFile: selectedFiles[0].name });
    }, 2250);
  };
  return <div className="admin-knowledge-modal-backdrop" role="dialog" aria-modal="true" aria-label={l.title} onMouseDown={onClose}>
    <article className="panel admin-knowledge-modal" onMouseDown={(event) => event.stopPropagation()}>
      <div className="admin-knowledge-head"><div><p>{l.eyebrow}</p><h2>{l.title}</h2><span>{l.copy}</span></div><button onClick={onClose} aria-label={l.close}><X size={17} /></button></div>
      <div className={`admin-knowledge-dropzone ${files.length ? "ready" : ""}`}><span><Upload size={25} /></span><div><strong>{files.length ? `${files.length} ${language === "zh" ? "个文件已选择" : language === "en" ? "files selected" : "tệp đã chọn"}` : l.select}</strong><small>{files.length ? files.slice(0, 2).map((file) => file.name).join(" · ") : l.types}</small></div><label className="primary-button compact" htmlFor="admin-knowledge-file"><Upload size={15} /> {l.select}</label><input id="admin-knowledge-file" className="file-upload-control" type="file" multiple accept=".zip,.pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.txt" onChange={chooseFiles} /></div>
      <div className={`admin-knowledge-process ${phase !== "idle" ? "is-active" : ""}`}>{l.steps.map((step, index) => { const phases = ["reading", "detecting", "indexing", "ready"]; const activeIndex = phases.indexOf(phase); const done = activeIndex > index || isReady; const active = activeIndex === index && !isReady; return <div className={`${done ? "done" : ""} ${active ? "active" : ""}`} key={step}><span>{done ? <CheckCircle2 size={14} /> : index + 1}</span><strong>{step}</strong><small>{done ? "AI" : active ? "..." : ""}</small></div>; })}</div>
      <div className="admin-knowledge-library"><p><FileCheck2 size={16} /> {l.source}</p>{(isReady ? l.categories : l.examples).map((item, index) => <div key={item}><b>{index + 1}</b><span>{item}</span><small>{isReady ? "AI Ready" : "Demo"}</small></div>)}</div>
      {isReady && <div className="admin-knowledge-complete"><CheckCircle2 size={17} /><div><strong>{l.completed}</strong><small>{files[0]?.name || "EPAC_行政资料库_2026Q3.zip"}</small></div><button className="secondary-button compact" onClick={onClose}>{l.ready}</button></div>}
      <div className="admin-knowledge-note"><Sparkles size={17} /><span>{l.note}</span></div>
    </article>
  </div>;
}

function AdminMeetingRecorderModal({ language, onClose }) {
  const [phase, setPhase] = useState("ready");
  const [saved, setSaved] = useState(false);
  const l = language === "vi"
    ? {
      eyebrow: "AI GHI NHẬN CUỘC HỌP", title: "Họp phối hợp hành chính và nhân sự", close: "Đóng", attendees: "Người tham dự", time: "27/09/2026 · 10:00 - 10:28", people: "Tran Mai · Wang Zhiqiang · Chen Ming · Nguyen Van Minh",
      start: "Bắt đầu ghi âm mô phỏng", recording: "Đang ghi âm và nhận diện tiếng Việt, tiếng Trung...", analyzing: "AI đang tóm tắt nội dung và tạo việc cần làm...", done: "Đã hoàn thành nhận diện và tóm tắt", source: "Bản ghi gốc đa ngôn ngữ", summary: "Tóm tắt cuộc họp do AI tạo", tasks: "Việc cần làm đã phân công", archive: "Xác nhận lưu biên bản", archived: "Đã lưu vào thư viện hành chính và tạo 3 việc cần làm", sourceLines: ["Tran Mai: Tuần sau có một nhân viên sales mới nhận việc, cần chuẩn bị hợp đồng và thẻ.", "Wang Zhiqiang: Hãy hoàn tất hồ sơ trước ngày 29/09.", "陈明：Pacific Foods 的催收记录今天必须补充完整。", "Nguyen Van Minh: Tôi sẽ xác nhận hồ sơ nghỉ phép và chấm công trước ngày 30/09."],
      summaryText: "Thống nhất hoàn tất hồ sơ nhận việc mới, bổ sung ghi nhận thu tiền Pacific Foods và xác nhận tài liệu nghỉ phép, chấm công.", tasksRows: [["Tran Mai", "Chuẩn bị hồ sơ nhận việc mới", "29/09"], ["Chen Ming", "Bổ sung ghi nhận thu tiền Pacific Foods", "Hôm nay"], ["Nguyen Van Minh", "Xác nhận hồ sơ nghỉ phép và chấm công", "30/09"]],
    }
    : language === "en"
      ? {
        eyebrow: "AI MEETING RECORD", title: "Administration and HR Coordination Meeting", close: "Close", attendees: "Attendees", time: "Sep 27, 2026 · 10:00 - 10:28", people: "Tran Mai · Wang Zhiqiang · Chen Ming · Nguyen Van Minh",
        start: "Start simulated recording", recording: "Recording and recognizing Vietnamese and Chinese...", analyzing: "AI is summarizing the meeting and creating action items...", done: "Transcription and summary complete", source: "Multilingual source transcript", summary: "AI meeting summary", tasks: "Assigned action items", archive: "Confirm and archive minutes", archived: "Archived to the administration library with 3 action items", sourceLines: ["Tran Mai: A new sales employee starts next week; the contract and badge need preparation.", "Wang Zhiqiang: Please complete the onboarding pack before Sep 29.", "陈明：Pacific Foods collection records must be completed today.", "Nguyen Van Minh: I will confirm leave and attendance documents before Sep 30."],
        summaryText: "The team agreed to complete new-hire onboarding materials, update the Pacific Foods collection record, and confirm leave and attendance documentation.", tasksRows: [["Tran Mai", "Prepare new-hire onboarding materials", "Sep 29"], ["Chen Ming", "Complete Pacific Foods collection record", "Today"], ["Nguyen Van Minh", "Confirm leave and attendance documents", "Sep 30"]],
      }
      : {
        eyebrow: "AI 会议记录", title: "行政与人事协调会", close: "关闭", attendees: "参会人", time: "2026-09-27 · 10:00 - 10:28", people: "Tran Mai · 王志强 · 陈明 · Nguyen Van Minh",
        start: "开始模拟录音", recording: "正在录音并识别越南语、中文发言...", analyzing: "AI 正在整理会议纪要与待办...", done: "已完成转写和会议总结", source: "多语言原始转写", summary: "AI 会议摘要", tasks: "已分配待办", archive: "确认生成会议纪要", archived: "已归档至行政资料库，并生成 3 项待办", sourceLines: ["Tran Mai：下周有一位销售新员工入职，需要准备劳动合同和工牌。", "王志强：请在 9 月 29 日前把入职资料准备完成。", "陈明：Pacific Foods 的催收记录今天必须补充完整。", "Nguyen Van Minh：我会在 9 月 30 日前确认请假和考勤资料。"],
        summaryText: "会议明确了新员工入职资料、Pacific Foods 催收记录和请假考勤资料三项工作，均已指定责任人与完成时限。", tasksRows: [["Tran Mai", "完成新员工入职资料准备", "9 月 29 日"], ["陈明", "补充 Pacific Foods 催收记录", "今天"], ["Nguyen Van Minh", "确认请假与考勤资料", "9 月 30 日"]],
      };
  const startRecording = () => {
    if (phase !== "ready") return;
    setPhase("recording");
    window.setTimeout(() => setPhase("analyzing"), 2200);
    window.setTimeout(() => setPhase("complete"), 3700);
  };
  const visibleLines = phase === "recording" ? 2 : phase === "analyzing" ? 3 : l.sourceLines.length;
  const status = phase === "ready" ? l.start : phase === "recording" ? l.recording : phase === "analyzing" ? l.analyzing : l.done;
  return <div className="admin-meeting-modal-backdrop" role="dialog" aria-modal="true" aria-label={l.title} onMouseDown={onClose}>
    <article className="panel admin-meeting-modal" onMouseDown={(event) => event.stopPropagation()}>
      <header className="admin-meeting-head"><div><p>{l.eyebrow}</p><h2>{l.title}</h2><span>{l.time}</span><small><UsersRound size={13} /> {l.attendees}: {l.people}</small></div><button onClick={onClose} aria-label={l.close}><X size={17} /></button></header>
      <section className={`admin-meeting-recorder ${phase}`}><div className={`waveform ${phase === "recording" || phase === "analyzing" ? "is-playing" : ""}`}>{Array.from({ length: 28 }, (_, index) => <i key={index} style={{ height: `${18 + ((index * 19) % 70)}%` }} />)}</div><div className="voice-status"><span className={phase === "recording" || phase === "analyzing" ? "status-live" : phase === "complete" ? "status-done" : ""} />{status}</div>{phase === "ready" && <button className="primary-button" onClick={startRecording}><AudioLines size={16} /> {l.start}</button>}<b>{phase === "ready" ? "00:00" : phase === "recording" ? "00:18" : "00:28"}</b></section>
      {phase !== "ready" && <section className="admin-meeting-results">
        <article className="admin-meeting-transcript"><p><Mic size={15} /> {l.source}</p>{l.sourceLines.slice(0, visibleLines).map((line) => <span key={line}>{line}</span>)}</article>
        <article className="admin-meeting-summary"><p><Sparkles size={15} /> {l.summary}</p><h3>{phase === "complete" ? l.summaryText : l.analyzing}</h3><div><strong>{l.tasks}</strong>{l.tasksRows.map(([owner, task, deadline]) => <section key={owner}><span>{owner.slice(0, 1)}</span><div><b>{task}</b><small>{owner}</small></div><em>{deadline}</em></section>)}</div>{phase === "complete" && (saved ? <aside><CheckCircle2 size={16} /> {l.archived}</aside> : <button className="primary-button compact" onClick={() => setSaved(true)}><FileCheck2 size={15} /> {l.archive}</button>)}</article>
      </section>}
    </article>
  </div>;
}

function generalManagerData(language) {
  const content = {
    zh: {
      eyebrow: "GENERAL MANAGER · DAILY EXECUTION",
      title: "总经理执行台",
      copy: "协调交期、回款与审批，明确责任人与时限，推动问题闭环。",
      metrics: [["今日待协调事项", "5", "3 项需跨部门闭环"], ["高风险订单", "2", "均影响承诺交期"], ["逾期应收", "¥ 1.26M", "8 笔待推进"], ["待我决策与审批", "4", "1 项超过 24 小时"]],
      closureTitle: "今日跨部门闭环事项",
      closureNote: "按经营影响排序。打开事项后，先明确责任人、截止时间和下一步动作。",
      decisionTitle: "待总经理决策与审批",
      decisionNote: "优先处理同时影响订单交期与经营现金的事项。",
      goalTitle: "本周经营目标推进",
      collaborationTitle: "关键订单协同追踪",
      viewApprovals: "进入审批中心",
      openOrder: "查看订单协同",
      markDone: "确认已协调",
      coordinated: "已确认推进",
      owners: "责任人",
      deadline: "最晚完成",
      nextAction: "总经理动作",
      progress: "当前进度",
      items: [
        { tag: "交期风险", title: "SO-2026-0918 · Natura Foods", issue: "PE 原料预计晚于排产需求，订单可能晚 2 天交付。", owners: "李芳（采购）+ 陈明（销售）", deadline: "今天 15:00", progress: "采购待确认现货", action: "确认替代供应商与客户沟通口径", page: "production", level: "high" },
        { tag: "回款风险", title: "Pacific Foods Co. · ¥286,000", issue: "已逾期 14 天，尚未记录客户付款承诺。", owners: "陈明（销售负责人）", deadline: "今天下班前", progress: "等待催收计划", action: "审阅催收计划并锁定付款日期", page: "sales", level: "high" },
        { tag: "价格决策", title: "铝箔 12μ · VietFoil", issue: "报价高于 90 日均价 8.7%，并关联重点订单安全库存。", owners: "李芳（采购负责人）", deadline: "明天 10:00", progress: "已完成三家比价", action: "确定替代供应商与采购金额", page: "procurement", level: "medium" },
      ],
      decisions: [
        { type: "采购申请", title: "PR-2026-0318 · PE 原料 18 吨", detail: "¥486,000 · 直接影响 Natura Foods 排产", impact: "交期", time: "已等待 26 小时", page: "approvals", level: "high" },
        { type: "供应商订单", title: "PO-2026-0451 · Golden Star", detail: "替代方案 · 需确认 09/14 到货承诺", impact: "交期", time: "今天 14:00 前", page: "approvals", level: "high" },
        { type: "低毛利报价", title: "GreenBite Packaging · ¥178,000", detail: "预计毛利 14.2% · 样品测试待确认", impact: "利润", time: "今天 16:00 前", page: "approvals", level: "medium" },
      ],
      goals: [
        { label: "本周订单目标", value: "¥ 3.20M / ¥ 4.00M", percent: 80, color: "#4e9880", note: "还差 ¥0.80M" },
        { label: "本周回款目标", value: "¥ 2.18M / ¥ 3.00M", percent: 73, color: "#d58a5d", note: "Pacific 是关键" },
        { label: "高风险订单闭环", value: "3 / 5 项", percent: 60, color: "#d76e51", note: "今天需再关闭 2 项" },
      ],
      orders: [
        { title: "Natura Foods · SO-2026-0918", sales: "客户沟通待执行", purchase: "确认替代原料", production: "预留 09/15 产能", status: "交期风险", level: "high" },
        { title: "Freshway Vietnam · SO-2026-0926", sales: "已更新客户进度", purchase: "原料齐套", production: "生产进度 68%", status: "正常推进", level: "normal" },
        { title: "Pacific Foods · SO-2026-0907", sales: "催收计划待提交", purchase: "已完成", production: "已交付", status: "回款风险", level: "medium" },
      ],
    },
    en: {
      eyebrow: "GENERAL MANAGER · DAILY EXECUTION",
      title: "General Manager Execution Desk",
      copy: "Coordinate delivery, collection, and approvals with clear owners and deadlines.",
      metrics: [["Items to coordinate today", "5", "3 require cross-functional closure"], ["High-risk orders", "2", "Both affect committed delivery"], ["Overdue receivables", "¥ 1.26M", "8 items to advance"], ["My decisions and approvals", "4", "1 over 24 hours"]],
      closureTitle: "Today's Cross-functional Closures", closureNote: "Prioritized by business impact. Confirm owner, deadline, and next action first.",
      decisionTitle: "My Decisions and Approvals", decisionNote: "Prioritize items affecting both delivery and cash.",
      goalTitle: "This Week's Business Progress", collaborationTitle: "Key Order Collaboration",
      viewApprovals: "Open Approvals", openOrder: "Open Order Collaboration", markDone: "Confirm coordinated", coordinated: "Coordination confirmed",
      owners: "Owners", deadline: "Due", nextAction: "GM action", progress: "Current progress",
      items: [
        { tag: "Delivery risk", title: "SO-2026-0918 · Natura Foods", issue: "PE material is expected after production demand; delivery may be 2 days late.", owners: "Li Fang (Procurement) + Chen Ming (Sales)", deadline: "Today 15:00", progress: "Available stock to confirm", action: "Confirm alternative supply and customer message", page: "production", level: "high" },
        { tag: "Collection risk", title: "Pacific Foods Co. · ¥286,000", issue: "14 days overdue with no recorded payment commitment.", owners: "Chen Ming (Sales Lead)", deadline: "End of today", progress: "Collection plan pending", action: "Review collection plan and lock payment date", page: "sales", level: "high" },
        { tag: "Price decision", title: "12μ Foil · VietFoil", issue: "Quote is 8.7% above the 90-day average and affects safety stock.", owners: "Li Fang (Procurement Lead)", deadline: "Tomorrow 10:00", progress: "Three quotes compared", action: "Select alternative supplier and amount", page: "procurement", level: "medium" },
      ],
      decisions: [
        { type: "Purchase request", title: "PR-2026-0318 · 18t PE", detail: "¥486,000 · directly affects Natura Foods production", impact: "Delivery", time: "Waiting 26 hours", page: "approvals", level: "high" },
        { type: "Supplier PO", title: "PO-2026-0451 · Golden Star", detail: "Alternative plan · confirm Sep 14 arrival", impact: "Delivery", time: "Due today 14:00", page: "approvals", level: "high" },
        { type: "Low-margin quote", title: "GreenBite Packaging · ¥178,000", detail: "Expected margin 14.2% · sample test pending", impact: "Margin", time: "Due today 16:00", page: "approvals", level: "medium" },
      ],
      goals: [
        { label: "Weekly order target", value: "¥ 3.20M / ¥ 4.00M", percent: 80, color: "#4e9880", note: "¥0.80M remaining" },
        { label: "Weekly collection target", value: "¥ 2.18M / ¥ 3.00M", percent: 73, color: "#d58a5d", note: "Pacific is key" },
        { label: "High-risk orders closed", value: "3 / 5 items", percent: 60, color: "#d76e51", note: "Close 2 more today" },
      ],
      orders: [
        { title: "Natura Foods · SO-2026-0918", sales: "Customer update pending", purchase: "Confirm alternative PE", production: "Reserve Sep 15 capacity", status: "Delivery risk", level: "high" },
        { title: "Freshway Vietnam · SO-2026-0926", sales: "Customer updated", purchase: "Materials complete", production: "Production 68%", status: "On track", level: "normal" },
        { title: "Pacific Foods · SO-2026-0907", sales: "Collection plan pending", purchase: "Completed", production: "Delivered", status: "Collection risk", level: "medium" },
      ],
    },
    vi: {
      eyebrow: "TỔNG GIÁM ĐỐC · VẬN HÀNH HÀNG NGÀY",
      title: "Bàn điều hành Tổng giám đốc",
      copy: "Điều phối giao hàng, thu tiền và phê duyệt với người phụ trách và thời hạn rõ ràng.",
      metrics: [["Việc cần phối hợp hôm nay", "5", "3 việc cần khép kín liên phòng ban"], ["Đơn rủi ro cao", "2", "Đều ảnh hưởng hạn giao"], ["Công nợ quá hạn", "¥ 1.26M", "8 khoản cần thúc đẩy"], ["Quyết định và duyệt của tôi", "4", "1 việc quá 24 giờ"]],
      closureTitle: "Việc liên phòng ban cần khép kín hôm nay", closureNote: "Ưu tiên theo ảnh hưởng kinh doanh. Xác nhận người phụ trách, hạn xử lý và bước tiếp theo.",
      decisionTitle: "Quyết định và phê duyệt của tôi", decisionNote: "Ưu tiên việc ảnh hưởng đồng thời giao hàng và dòng tiền.",
      goalTitle: "Tiến độ mục tiêu kinh doanh tuần này", collaborationTitle: "Theo dõi phối hợp đơn trọng điểm",
      viewApprovals: "Mở trung tâm phê duyệt", openOrder: "Mở phối hợp đơn hàng", markDone: "Xác nhận đã phối hợp", coordinated: "Đã xác nhận thúc đẩy",
      owners: "Người phụ trách", deadline: "Hạn xử lý", nextAction: "Hành động của TGĐ", progress: "Tiến độ hiện tại",
      items: [
        { tag: "Rủi ro giao hàng", title: "SO-2026-0918 · Natura Foods", issue: "Nguyên liệu PE dự kiến về sau nhu cầu sản xuất; giao hàng có thể chậm 2 ngày.", owners: "Li Fang (Mua hàng) + Chen Ming (Sales)", deadline: "Hôm nay 15:00", progress: "Chờ xác nhận hàng sẵn", action: "Xác nhận nguồn thay thế và thông điệp cho khách", page: "production", level: "high" },
        { tag: "Rủi ro thu tiền", title: "Pacific Foods Co. · ¥286,000", issue: "Quá hạn 14 ngày, chưa ghi nhận cam kết thanh toán.", owners: "Chen Ming (Trưởng sales)", deadline: "Cuối ngày hôm nay", progress: "Chờ kế hoạch thu tiền", action: "Rà soát kế hoạch và chốt ngày thanh toán", page: "sales", level: "high" },
        { tag: "Quyết định giá", title: "Nhôm 12μ · VietFoil", issue: "Báo giá cao hơn bình quân 90 ngày 8,7%, ảnh hưởng tồn kho an toàn.", owners: "Li Fang (Trưởng mua hàng)", deadline: "Ngày mai 10:00", progress: "Đã so sánh 3 báo giá", action: "Chọn nhà cung cấp thay thế và giá trị mua", page: "procurement", level: "medium" },
      ],
      decisions: [
        { type: "Đề nghị mua", title: "PR-2026-0318 · PE 18 tấn", detail: "¥486,000 · ảnh hưởng trực tiếp sản xuất Natura Foods", impact: "Giao hàng", time: "Chờ 26 giờ", page: "approvals", level: "high" },
        { type: "Đơn NCC", title: "PO-2026-0451 · Golden Star", detail: "Phương án thay thế · xác nhận giao ngày 14/09", impact: "Giao hàng", time: "Hạn hôm nay 14:00", page: "approvals", level: "high" },
        { type: "Báo giá biên thấp", title: "GreenBite Packaging · ¥178,000", detail: "Biên dự kiến 14,2% · đang chờ thử mẫu", impact: "Lợi nhuận", time: "Hạn hôm nay 16:00", page: "approvals", level: "medium" },
      ],
      goals: [
        { label: "Mục tiêu đơn hàng tuần", value: "¥ 3.20M / ¥ 4.00M", percent: 80, color: "#4e9880", note: "Còn ¥0.80M" },
        { label: "Mục tiêu thu tiền tuần", value: "¥ 2.18M / ¥ 3.00M", percent: 73, color: "#d58a5d", note: "Pacific là trọng tâm" },
        { label: "Đơn rủi ro đã khép kín", value: "3 / 5 việc", percent: 60, color: "#d76e51", note: "Cần đóng thêm 2 việc hôm nay" },
      ],
      orders: [
        { title: "Natura Foods · SO-2026-0918", sales: "Chờ cập nhật khách", purchase: "Xác nhận PE thay thế", production: "Giữ công suất 15/09", status: "Rủi ro giao hàng", level: "high" },
        { title: "Freshway Vietnam · SO-2026-0926", sales: "Đã cập nhật khách", purchase: "Đủ nguyên liệu", production: "Sản xuất 68%", status: "Đúng tiến độ", level: "normal" },
        { title: "Pacific Foods · SO-2026-0907", sales: "Chờ kế hoạch thu tiền", purchase: "Đã hoàn thành", production: "Đã giao", status: "Rủi ro thu tiền", level: "medium" },
      ],
    },
  };
  return content[language];
}

function GeneralManagerDashboard({ language, role, onNavigate, onSaveRecord, onShowRoleFocus }) {
  const config = generalManagerData(language);
  const [closed, setClosed] = useState([]);
  const [period, setPeriod] = useState("week");
  const periodLabels = language === "vi" ? [["week", "Tuần này"], ["month", "Tháng này"], ["quarter", "Quý này"], ["year", "Năm nay"]]
    : language === "en" ? [["week", "This Week"], ["month", "This Month"], ["quarter", "This Quarter"], ["year", "This Year"]]
      : [["week", "本周"], ["month", "本月"], ["quarter", "本季度"], ["year", "本年度"]];
  const periodData = {
    week: { metrics: [["今日待协调事项", "5", "3 项需跨部门闭环"], ["高风险订单", "2", "均影响承诺交期"], ["逾期应收", "¥ 1.26M", "8 笔待推进"], ["待我决策与审批", "4", "1 项超过 24 小时"]], goals: [["¥ 3.20M / ¥ 4.00M", 80, "还差 ¥0.80M"], ["¥ 2.18M / ¥ 3.00M", 73, "Pacific 是关键"], ["3 / 5 项", 60, "今天需再关闭 2 项"]], adjustment: 0 },
    month: { metrics: [["本月待协调事项", "18", "7 项已完成闭环"], ["本月高风险订单", "6", "2 项正在处理"], ["本月逾期应收", "¥ 2.98M", "19 笔待推进"], ["本月待决策与审批", "12", "3 项超过 24 小时"]], goals: [["¥ 12.84M / ¥ 15.00M", 86, "还差 ¥2.16M"], ["¥ 9.86M / ¥ 12.00M", 82, "对账后催收仍是重点"], ["11 / 16 项", 69, "还剩 5 项待关闭"]], adjustment: 2 },
    quarter: { metrics: [["本季度待协调事项", "46", "34 项已完成闭环"], ["本季度高风险订单", "14", "4 项正在处理"], ["本季度逾期应收", "¥ 8.14M", "36 笔待推进"], ["本季度待决策与审批", "29", "5 项超过 24 小时"]], goals: [["¥ 35.62M / ¥ 42.00M", 85, "还差 ¥6.38M"], ["¥ 27.48M / ¥ 33.00M", 83, "回款率保持 77.1%"], ["34 / 46 项", 74, "4 项为高优先级"]], adjustment: 4 },
    year: { metrics: [["本年度待协调事项", "162", "139 项已完成闭环"], ["本年度高风险订单", "38", "7 项正在处理"], ["本年度逾期应收", "¥ 27.38M", "112 笔待推进"], ["本年度待决策与审批", "96", "9 项超过 24 小时"]], goals: [["¥ 128.60M / ¥ 150.00M", 86, "还差 ¥21.40M"], ["¥ 101.22M / ¥ 120.00M", 84, "年度回款率 78.7%"], ["139 / 162 项", 86, "7 项当前高优先级"]], adjustment: 6 },
  }[period];
  const metricLabels = language === "zh" ? periodData.metrics : periodData.metrics.map(([label, value, note], index) => {
    const labels = language === "en"
      ? [["Items to coordinate", "High-risk orders", "Overdue receivables", "My decisions & approvals"], ["Items coordinated this month", "High-risk orders this month", "Overdue receivables this month", "Monthly decisions & approvals"], ["Items coordinated this quarter", "High-risk orders this quarter", "Overdue receivables this quarter", "Quarterly decisions & approvals"], ["Items coordinated this year", "High-risk orders this year", "Overdue receivables this year", "Yearly decisions & approvals"]]
      : [["Việc cần phối hợp", "Đơn rủi ro cao", "Công nợ quá hạn", "Quyết định & phê duyệt"], ["Việc phối hợp tháng này", "Đơn rủi ro tháng này", "Công nợ quá hạn tháng này", "Quyết định & duyệt tháng này"], ["Việc phối hợp quý này", "Đơn rủi ro quý này", "Công nợ quá hạn quý này", "Quyết định & duyệt quý này"], ["Việc phối hợp năm nay", "Đơn rủi ro năm nay", "Công nợ quá hạn năm nay", "Quyết định & duyệt năm nay"]];
    return [labels[["week", "month", "quarter", "year"].indexOf(period)][index], value, note];
  });
  const goals = config.goals.map((goal, index) => ({ ...goal, value: periodData.goals[index][0], percent: periodData.goals[index][1], note: language === "zh" ? periodData.goals[index][2] : index === 0 ? `${100 - periodData.goals[index][1]}% ${language === "en" ? "remaining" : "còn lại"}` : index === 1 ? `${periodData.goals[index][1]}%` : periodData.goals[index][2] }));
  return <div className="work-page gm-dashboard">
    <PageIntro eyebrow={config.eyebrow} title={config.title} copy={config.copy} actions={<><RoleFocusButton language={language} onClick={onShowRoleFocus} /><button className="primary-button" onClick={() => onNavigate("approvals")}><ClipboardCheck size={15} /> {config.viewApprovals}</button></>} />
    <div className="dashboard-period-bar"><span>{language === "zh" ? "查看经营执行周期" : language === "en" ? "Execution period" : "Kỳ điều hành"}</span><div className="board-filter">{periodLabels.map(([id, label]) => <button className={period === id ? "active" : ""} key={id} onClick={() => setPeriod(id)}>{label}</button>)}</div></div>
    <section className="metric-strip">{metricLabels.map(([label, value, note]) => <MiniMetric key={label} label={label} value={value} note={note} />)}</section>
    <RoleAIHub language={language} role={role} onSaveRecord={onSaveRecord} />
    <section className="gm-execution-grid">
      <article className="panel gm-closure-panel">
        <PanelHead title={config.closureTitle} />
        <p className="gm-panel-note">{config.closureNote}</p>
        <div className="gm-closure-list">{config.items.map((item, index) => {
          const done = closed.includes(index);
          return <div className={`gm-closure-row ${item.level} ${done ? "is-closed" : ""}`} key={item.title}>
            <span className="gm-risk-mark">{done ? <CheckCircle2 size={17} /> : <AlertTriangle size={17} />}</span>
            <div className="gm-closure-copy"><div><span>{item.tag}</span><strong>{item.title}</strong></div><p>{item.issue}</p><dl><div><dt>{config.owners}</dt><dd>{item.owners}</dd></div><div><dt>{config.deadline}</dt><dd>{item.deadline}</dd></div><div><dt>{config.progress}</dt><dd>{item.progress}{periodData.adjustment ? ` · +${periodData.adjustment}` : ""}</dd></div></dl><aside><Target size={14} /><b>{config.nextAction}</b><em>{item.action}</em></aside></div>
            <div className="gm-row-actions"><button className="text-button" onClick={() => onNavigate(item.page)}>{config.openOrder} <ChevronDown size={15} /></button><button className={`gm-close-button ${done ? "done" : ""}`} onClick={() => setClosed((current) => done ? current.filter((id) => id !== index) : [...current, index])}>{done ? config.coordinated : config.markDone}</button></div>
          </div>;
        })}</div>
      </article>
      <article className="panel gm-decision-panel">
        <PanelHead title={config.decisionTitle} action={config.viewApprovals} onClick={() => onNavigate("approvals")} />
        <p className="gm-panel-note">{config.decisionNote}</p>
        <div className="gm-decision-list">{config.decisions.map((item) => <button className={`gm-decision-row ${item.level}`} key={item.title} onClick={() => onNavigate(item.page)}><span>{item.type}</span><div><strong>{item.title}</strong><small>{item.detail}</small><em>{item.impact} · {item.time}</em></div><ChevronDown size={16} /></button>)}</div>
      </article>
    </section>
    <section className="gm-bottom-grid">
      <article className="panel gm-goal-panel"><PanelHead title={config.goalTitle} /><div className="gm-goal-list">{goals.map((goal) => <div className="gm-goal-row" key={goal.label}><div><strong>{goal.label}</strong><span>{goal.value}</span></div><i><b style={{ width: `${goal.percent}%`, background: goal.color }} /></i><small>{goal.percent}% · {goal.note}</small></div>)}</div></article>
      <article className="panel gm-order-panel"><PanelHead title={config.collaborationTitle} action={config.openOrder} onClick={() => onNavigate("production")} /><div className="gm-order-list">{config.orders.map((order) => <button className="gm-order-row" key={order.title} onClick={() => onNavigate("production")}><div><strong>{order.title}</strong><span className={`status ${order.level === "high" ? "high" : order.level === "medium" ? "medium" : ""}`}><i />{order.status}</span></div><dl><div><dt>Sales</dt><dd>{order.sales}</dd></div><div><dt>Purchase</dt><dd>{order.purchase}</dd></div><div><dt>Production</dt><dd>{order.production}</dd></div></dl></button>)}</div></article>
    </section>
  </div>;
}

function roleAIData(roleId, language) {
  const management = ["gm", "salesLead", "procLead"].includes(roleId);
  const content = {
    zh: {
      gm: {
        subtitle: "跨部门经营查询与行动建议",
        placeholder: "例如：今天哪些事项需要我协调？",
        voice: "今天哪些事项需要我协调？",
        questions: ["今天哪些事项需要我协调？", "哪些订单存在交期风险？", "哪些应收需要销售负责人推进？", "采购价格异常有哪些？"],
        answers: ["今天优先协调 Natura Foods 交期、Pacific Foods 回款和铝箔比价三项事项。", "SO-2026-0918 因 PE 原料未到，预计较承诺交期晚 2 天。", "Pacific Foods ¥286K 已逾期 14 天，陈明需今天更新客户承诺付款日。", "VietFoil 铝箔报价高于 90 日均价 8.7%，建议确认 Golden Star 替代方案。"],
        actions: ["上午明确责任人和截止时间，下午复盘三项进展。", "采购确认替代供应商，销售同步客户预期。", "安排销售负责人提交催款计划并抄送总经理。", "批准比价建议并确认安全库存。"],
      },
      salesLead: {
        subtitle: "团队销售执行、客户推进与回款分析",
        placeholder: "例如：本周哪些业务员没有完成重点客户拜访？",
        voice: "哪个销售员回款推进较弱？",
        questions: ["本周哪些业务员没有完成重点客户拜访？", "哪些报价超过 3 天未跟进？", "哪个销售员回款推进较弱？", "哪些重点机会需要陪访？", "哪些销售员拜访很多，但有效机会不足？"],
        answers: ["Le Hoa 还差 2 次重点客户拜访；Nguyen Thi Lan 已完成 8/9 次。", "GreenBite、Saigon Harvest 和 VietTaste 共 3 份报价已超期未跟进。", "陈明负责的 Pacific Foods ¥286K 已逾期 14 天，尚未记录付款承诺。", "GreenBite 处于样品确认关键期，建议本周由负责人陪访一次。", "Le Hoa 本周完成 9 次拜访，但只形成 2 个有效机会，样品转报价转化偏低；建议负责人复盘客户筛选和拜访结论。"],
        actions: ["在晨会上分配补访时间，并在当天收集拜访记录。", "指定业务员今天完成电话或拜访记录。", "要求陈明今天提交客户付款承诺与催款计划。", "安排销售负责人陪访并确认下单时间。", "安排一次拜访复盘，明确目标客户、需求确认和下一步成交动作。"],
      },
      procLead: {
        subtitle: "供应商价格、交期与采购决策建议",
        placeholder: "例如：哪种原料最需要启动比价？",
        voice: "比较铝箔供应商报价",
        questions: ["哪种原料最需要启动比价？", "哪些采购订单临近到货？", "哪个供应商价格异常？", "哪些采购申请需要我决策？", "查看铝箔近 6 个月采购价格和交期趋势"],
        answers: ["铝箔 12μ 的价格波动最大，建议立即完成三家供应商比价。", "PO-2026-0451 的 PE 原料最紧急，影响 Natura Foods 排产。", "VietFoil 最新报价 ¥25.80/kg，高于 90 日均价 8.7%。", "PR-2026-0318 的 PE 原料申请影响重点订单，应优先审批。", "近 6 个月铝箔平均采购价上升 6.4%，平均交期由 12 天延长至 15 天；VietFoil 本次报价最高，Golden Star 的历史准时率更稳定。"],
        actions: ["确认 Golden Star 的价格方案与 Mekong 的最快交期。", "要求采购员在今天 10:30 前更新预计到货时间。", "保留异常供应商报价，启动替代供应商谈判。", "审批后同步采购员下单，并跟踪到货。", "以 Golden Star 作为主谈判对象，同时保留 Mekong 的快速交期方案，并把铝箔价格趋势纳入下月预算。"],
      },
    },
    en: {
      gm: {
        subtitle: "Cross-functional business queries and action recommendations",
        placeholder: "Example: What needs my coordination today?",
        voice: "What needs my coordination today?",
        questions: ["What needs my coordination today?", "Which orders have delivery risks?", "Which receivables need sales follow-up?", "What procurement prices are abnormal?"],
        answers: ["Prioritize the Natura Foods delivery, Pacific Foods collection, and foil comparison today.", "SO-2026-0918 is projected to be 2 days late because PE material has not arrived.", "Pacific Foods ¥286K is 14 days overdue; Chen Ming needs to update the payment commitment today.", "VietFoil foil pricing is 8.7% above the 90-day average; validate Golden Star as an alternative."],
        actions: ["Assign owners and deadlines this morning, then review progress this afternoon.", "Procurement confirms alternatives while sales aligns customer expectations.", "Require a collection plan and payment commitment update today.", "Approve the comparison recommendation and confirm safety stock."],
      },
      salesLead: {
        subtitle: "Sales execution, customer progression, and collection analysis",
        placeholder: "Example: Which reps missed key customer visits this week?",
        voice: "Which sales rep has the weakest collection progress?",
        questions: ["Which reps missed key customer visits this week?", "Which quotes have not been followed up for 3 days?", "Which rep has the weakest collection progress?", "Which key opportunities need joint visits?", "Which reps visit often but create too few qualified opportunities?"],
        answers: ["Le Hoa still needs 2 key-customer visits; Nguyen Thi Lan has completed 8 of 9.", "GreenBite, Saigon Harvest, and VietTaste have 3 overdue quote follow-ups.", "Chen Ming's Pacific Foods ¥286K is 14 days overdue without a payment commitment record.", "GreenBite is at the sample-confirmation stage and needs a joint visit this week.", "Le Hoa completed 9 visits this week but produced only 2 qualified opportunities. Sample-to-quote conversion is low, so review account selection and visit conclusions."],
        actions: ["Assign make-up visits in the morning meeting and collect records the same day.", "Assign the owner to complete a call or visit record today.", "Require Chen Ming to submit a payment commitment and collection plan.", "Schedule a joint visit and confirm the order timeline.", "Run one visit review to clarify target accounts, needs confirmation, and the next conversion action."],
      },
      procLead: {
        subtitle: "Supplier price, delivery, and purchasing decision support",
        placeholder: "Example: Which material needs a price comparison now?",
        voice: "Compare foil supplier quotations",
        questions: ["Which material needs a price comparison now?", "Which purchase orders are close to arrival?", "Which supplier price is abnormal?", "Which purchase requests need my decision?", "Show 6-month foil price and delivery trends"],
        answers: ["12μ foil has the greatest variance; complete the three-supplier comparison now.", "PO-2026-0451 PE material is most urgent and affects Natura Foods production.", "VietFoil's ¥25.80/kg price is 8.7% above the 90-day average.", "PR-2026-0318 affects a key order and should be approved first.", "Over six months, average foil cost rose 6.4% and average lead time moved from 12 to 15 days. VietFoil is highest this round, while Golden Star has steadier on-time history."],
        actions: ["Confirm Golden Star pricing and Mekong's fastest delivery option.", "Request an ETA update before 10:30 today.", "Keep the abnormal quote and negotiate with alternatives.", "Approve, place the order, and track arrival.", "Use Golden Star as the primary negotiation option, retain Mekong for speed, and include the foil trend in next month's budget."],
      },
    },
    vi: {
      gm: {
        subtitle: "Tra cứu điều hành liên phòng ban và đề xuất hành động",
        placeholder: "Ví dụ: Hôm nay tôi cần phối hợp việc gì?",
        voice: "Hôm nay tôi cần phối hợp việc gì?",
        questions: ["Hôm nay tôi cần phối hợp việc gì?", "Đơn nào có rủi ro giao hàng?", "Khoản phải thu nào cần sales theo dõi?", "Giá mua nào bất thường?"],
        answers: ["Ưu tiên điều phối giao hàng Natura Foods, công nợ Pacific Foods và so sánh giá nhôm hôm nay.", "SO-2026-0918 dự kiến chậm 2 ngày do nguyên liệu PE chưa về.", "Pacific Foods ¥286K quá hạn 14 ngày; Chen Ming cần cập nhật cam kết thanh toán hôm nay.", "Giá nhôm VietFoil cao hơn bình quân 90 ngày 8,7%; cần xác nhận Golden Star là phương án thay thế."],
        actions: ["Giao người phụ trách và hạn xử lý vào buổi sáng, kiểm tra lại vào buổi chiều.", "Mua hàng xác nhận phương án thay thế, sales cập nhật kỳ vọng của khách.", "Yêu cầu cập nhật kế hoạch thu tiền trong hôm nay.", "Phê duyệt đề xuất so sánh và xác nhận tồn kho an toàn."],
      },
      salesLead: {
        subtitle: "Theo dõi thực thi sales, khách hàng và thu tiền",
        placeholder: "Ví dụ: Nhân viên nào chưa hoàn thành gặp khách trọng điểm?",
        voice: "Nhân viên nào theo dõi thu tiền yếu nhất?",
        questions: ["Nhân viên nào chưa hoàn thành gặp khách trọng điểm?", "Báo giá nào quá 3 ngày chưa theo dõi?", "Nhân viên nào theo dõi thu tiền yếu nhất?", "Cơ hội nào cần đi gặp cùng?", "Nhân viên nào gặp khách nhiều nhưng tạo ít cơ hội chất lượng?"],
        answers: ["Le Hoa còn thiếu 2 lượt gặp khách trọng điểm; Nguyen Thi Lan đã hoàn thành 8/9 lượt.", "GreenBite, Saigon Harvest và VietTaste có 3 báo giá quá hạn theo dõi.", "Pacific Foods ¥286K do Chen Ming phụ trách đã quá hạn 14 ngày và chưa có cam kết thanh toán.", "GreenBite đang ở giai đoạn xác nhận mẫu, nên đi gặp cùng trong tuần này.", "Le Hoa đã gặp 9 lần trong tuần nhưng chỉ tạo 2 cơ hội chất lượng. Tỷ lệ từ mẫu sang báo giá thấp; cần xem lại chọn khách và kết luận buổi gặp."],
        actions: ["Phân công lịch gặp bù trong họp sáng và thu nhận báo cáo trong ngày.", "Yêu cầu nhân viên hoàn thành ghi nhận cuộc gọi hoặc gặp khách hôm nay.", "Yêu cầu Chen Ming nộp kế hoạch thu tiền và cam kết thanh toán.", "Sắp xếp đi gặp cùng và xác nhận thời điểm đặt hàng.", "Tổ chức một buổi rà soát gặp khách, làm rõ khách mục tiêu, nhu cầu và bước chuyển đổi tiếp theo."],
      },
      procLead: {
        subtitle: "Giá nhà cung cấp, giao hàng và quyết định mua hàng",
        placeholder: "Ví dụ: Nguyên liệu nào cần so sánh giá ngay?",
        voice: "So sánh báo giá nhà cung cấp nhôm",
        questions: ["Nguyên liệu nào cần so sánh giá ngay?", "Đơn mua nào sắp đến hàng?", "Nhà cung cấp nào có giá bất thường?", "Yêu cầu mua nào cần tôi quyết định?", "Xem xu hướng giá và giao hàng nhôm 6 tháng gần đây"],
        answers: ["Nhôm 12μ biến động lớn nhất; cần hoàn tất so sánh 3 nhà cung cấp ngay.", "PO-2026-0451 nguyên liệu PE khẩn cấp nhất, ảnh hưởng sản xuất Natura Foods.", "Giá VietFoil ¥25.80/kg cao hơn bình quân 90 ngày 8,7%.", "PR-2026-0318 ảnh hưởng đơn trọng điểm, cần phê duyệt trước.", "Trong 6 tháng, giá mua nhôm trung bình tăng 6,4%, thời hạn giao trung bình tăng từ 12 lên 15 ngày. VietFoil cao nhất lần này, Golden Star có lịch sử giao đúng hẹn ổn định hơn."],
        actions: ["Xác nhận giá Golden Star và phương án giao nhanh nhất của Mekong.", "Yêu cầu cập nhật ETA trước 10:30 hôm nay.", "Lưu báo giá bất thường và đàm phán với nhà cung cấp thay thế.", "Phê duyệt, đặt hàng và theo dõi đến hàng.", "Dùng Golden Star làm phương án đàm phán chính, giữ Mekong cho nhu cầu giao nhanh và đưa xu hướng giá nhôm vào ngân sách tháng tới."],
      },
    },
  };
  const entry = {
    zh: {
      sales: { subtitle: "用自然语言记录客户动作，AI 自动生成销售记录", placeholder: "例如：今天拜访客户，预计订单 18 万，周五前寄样。", voice: "今天下午我上门拜访了 GreenBite，客户对零食拉链包装袋感兴趣，预计订单 18 万，周五前寄样，下周电话跟进。", questions: ["记录今天的客户拜访", "更新报价跟进", "记录客户回款承诺", "添加客户验厂结果", "创建下周跟进提醒"], draftTitle: "AI 已生成销售跟进记录", fields: [["客户", "GreenBite Packaging"], ["拜访类型", "上门拜访"], ["预计机会", "¥ 180,000"], ["下一步动作", "周五前寄样，下周电话跟进"]], confirm: "确认同步到团队", saved: "已同步至销售负责人和老板看板" },
      proc: { subtitle: "用自然语言更新询价、催交与到货事项", placeholder: "例如：VietFoil 交期延后两天，请催交并更新 PO。", voice: "VietFoil 通知铝箔 12μ 的交期延后两天，预计 9 月 14 日到货，请创建催交任务并提醒生产。", questions: ["记录供应商询价", "更新 PO 预计到货", "提交采购比价", "记录到货异常", "创建催交任务"], draftTitle: "AI 已生成采购执行草稿", fields: [["供应商", "VietFoil"], ["物料", "铝箔 12μ"], ["识别事项", "交期延后 2 天"], ["下一步动作", "创建催交并提醒生产"]], confirm: "确认写入采购工作台", saved: "已写入采购待办与交期提醒" },
      admin: { subtitle: "用自然语言办理请假、用印、招聘与员工异动", placeholder: "例如：Nguyen Van Minh 请年假两天，10 月 5 日到 6 日。", voice: "Nguyen Van Minh 申请 10 月 5 日到 6 日休年假两天，销售负责人已经同意，请创建请假记录并通知考勤。", questions: ["记录员工请假"], draftTitle: "AI 已生成行政流程草稿", fields: [["员工", "Nguyen Van Minh"], ["流程类型", "年假申请"], ["日期", "10 月 5 日至 6 日"], ["下一步动作", "创建请假记录并通知考勤"]], confirm: "确认写入行政工作台", saved: "已写入行政流程与待办" },
    },
    en: {
      sales: { subtitle: "Describe customer activity naturally; AI creates a sales record", placeholder: "Example: I visited a customer today; expected order RMB 180k; samples by Friday.", voice: "I visited GreenBite this afternoon. They are interested in snack zipper pouches, expected value RMB 180k, and need samples by Friday with a call next week.", questions: ["Record today's customer visit", "Update quote follow-up", "Record a payment commitment", "Add a factory-visit result", "Create a follow-up reminder"], draftTitle: "AI created a sales follow-up record", fields: [["Customer", "GreenBite Packaging"], ["Visit type", "On-site visit"], ["Expected value", "¥ 180,000"], ["Next action", "Send samples by Friday; call next week"]], confirm: "Sync to team", saved: "Synchronized to the sales lead and owner dashboard" },
      proc: { subtitle: "Describe quotations, expediting, and receiving updates naturally", placeholder: "Example: VietFoil delivery is two days late; expedite and update the PO.", voice: "VietFoil advised that 12μ foil delivery is delayed by two days, with arrival expected September 14. Create an expedite task and alert production.", questions: ["Record a supplier quote", "Update PO expected arrival", "Submit a price comparison", "Record a receiving exception", "Create an expedite task"], draftTitle: "AI created a purchasing work draft", fields: [["Supplier", "VietFoil"], ["Material", "12μ foil"], ["Detected issue", "Delivery delayed 2 days"], ["Next action", "Create expedite task and alert production"]], confirm: "Save to procurement desk", saved: "Saved to purchasing tasks and delivery alerts" },
      admin: { subtitle: "Describe leave, seals, hiring, and employee changes naturally", placeholder: "Example: Nguyen Van Minh requests two days of annual leave, Oct 5-6.", voice: "Nguyen Van Minh requested two days of annual leave from October 5 to 6. The sales lead approved it; create the leave record and notify attendance.", questions: ["Record employee leave"], draftTitle: "AI created an administration workflow draft", fields: [["Employee", "Nguyen Van Minh"], ["Workflow", "Annual leave request"], ["Dates", "October 5-6"], ["Next action", "Create leave record and notify attendance"]], confirm: "Save to administration desk", saved: "Saved to administration workflow and tasks" },
    },
    vi: {
      sales: { subtitle: "Nhập mô tả tự nhiên, AI tự tạo bản ghi theo dõi khách hàng", placeholder: "Ví dụ: Hôm nay gặp khách, dự kiến đơn 180.000 tệ, gửi mẫu trước thứ Sáu.", voice: "Chiều nay tôi đã đến gặp GreenBite. Khách quan tâm túi zipper cho snack, dự kiến đơn hàng 180.000 tệ, gửi mẫu trước thứ Sáu và gọi lại tuần sau.", questions: ["Ghi nhận gặp khách hôm nay", "Cập nhật theo dõi báo giá", "Ghi nhận cam kết thanh toán", "Thêm kết quả khách thăm nhà máy", "Tạo nhắc việc theo dõi tuần sau"], draftTitle: "AI đã tạo bản ghi theo dõi kinh doanh", fields: [["Khách hàng", "GreenBite Packaging"], ["Loại thăm gặp", "Đến thăm trực tiếp"], ["Cơ hội dự kiến", "¥ 180,000"], ["Bước tiếp theo", "Gửi mẫu trước thứ Sáu, gọi lại tuần sau"]], confirm: "Xác nhận đồng bộ cho đội", saved: "Đã đồng bộ với trưởng nhóm và bảng điều hành" },
      proc: { subtitle: "Nhập mô tả tự nhiên để cập nhật hỏi giá, thúc giao và nhận hàng", placeholder: "Ví dụ: VietFoil giao trễ 2 ngày, hãy thúc giao và cập nhật PO.", voice: "VietFoil thông báo giao nhôm 12μ trễ hai ngày, dự kiến đến ngày 14 tháng 9. Hãy tạo việc thúc giao và nhắc sản xuất.", questions: ["Ghi nhận báo giá nhà cung cấp", "Cập nhật ngày hàng về PO", "Gửi so sánh giá", "Ghi nhận bất thường khi nhận hàng", "Tạo việc thúc giao"], draftTitle: "AI đã tạo bản nháp công việc mua hàng", fields: [["Nhà cung cấp", "VietFoil"], ["Vật tư", "Nhôm 12μ"], ["Vấn đề nhận diện", "Giao hàng trễ 2 ngày"], ["Bước tiếp theo", "Tạo việc thúc giao và báo sản xuất"]], confirm: "Lưu vào bàn mua hàng", saved: "Đã lưu vào việc mua hàng và cảnh báo giao hàng" },
      admin: { subtitle: "Nhập mô tả tự nhiên để xử lý nghỉ phép, đóng dấu và nhân sự", placeholder: "Ví dụ: Nguyen Van Minh nghỉ phép năm hai ngày, từ 5 đến 6 tháng 10.", voice: "Nguyen Van Minh xin nghỉ phép năm hai ngày từ ngày 5 đến 6 tháng 10. Trưởng sales đã đồng ý, hãy tạo hồ sơ nghỉ phép và thông báo chấm công.", questions: ["Ghi nhận nhân viên nghỉ phép"], draftTitle: "AI đã tạo bản nháp quy trình hành chính", fields: [["Nhân viên", "Nguyen Van Minh"], ["Loại quy trình", "Nghỉ phép năm"], ["Thời gian", "5 đến 6 tháng 10"], ["Bước tiếp theo", "Tạo hồ sơ nghỉ phép và báo chấm công"]], confirm: "Lưu vào bàn hành chính", saved: "Đã lưu vào quy trình và việc hành chính" },
    },
  };
  return { management, ...(management ? content[language][roleId] : entry[language][roleId]) };
}

function roleAIVisualData(roleId, language, selected) {
  const copy = {
    zh: {
      gm: [["今日跨部门协调优先级", [["Natura Foods 交期", 92, "#d76e51"], ["Pacific Foods 回款", 86, "#d59a4c"], ["铝箔比价决策", 74, "#568f7e"]]], ["订单交期风险链路", [["订单确认", "PE 原料未到", "#d76e51"], ["采购催交", "替代供应商待定", "#d59a4c"], ["生产排产", "预留 09/15 产能", "#568f7e"], ["客户沟通", "今日 15:00 更新", "#3d80b3"]]], ["逾期应收推进情况", [["Pacific Foods ¥286K", 95, "#d76e51"], ["VietTaste ¥168K", 66, "#d59a4c"], ["其他待收款", 38, "#568f7e"]]], ["采购价格异常程度", [["VietFoil 铝箔 +8.7%", 91, "#d76e51"], ["PE 树脂 +4.2%", 54, "#d59a4c"], ["牛皮纸 +1.8%", 27, "#568f7e"]]]],
      salesLead: [["本周重点客户拜访完成度", [["Nguyen Thi Lan", 89, "#568f7e"], ["Pham Quang", 88, "#568f7e"], ["Le Hoa", 78, "#d59a4c"]]], ["超期报价金额与天数", [["GreenBite ¥178K · 4天", 92, "#d76e51"], ["Saigon Harvest ¥96K · 3天", 68, "#d59a4c"], ["VietTaste ¥74K · 3天", 51, "#568f7e"]]], ["销售员回款推进风险", [["陈明 · Pacific ¥286K", 95, "#d76e51"], ["Le Hoa · ¥168K", 63, "#d59a4c"], ["Nguyen Thi Lan · ¥42K", 22, "#568f7e"]]], ["重点机会推进热度", [["GreenBite · 样品确认", 88, "#d59a4c"], ["Saigon Harvest · 待报价", 74, "#568f7e"], ["Blue Ocean · 验厂", 58, "#568f7e"]]], ["拜访量与有效机会矩阵", [["Nguyen Thi Lan", "8 次拜访", "6 个机会", "good"], ["Pham Quang", "7 次拜访", "5 个机会", "good"], ["Le Hoa", "9 次拜访", "2 个机会", "watch"]]]],
      procLead: [["重点物料比价紧急度", [["铝箔 12μ", 93, "#d76e51"], ["PE 原料", 67, "#d59a4c"], ["牛皮纸", 36, "#568f7e"]]], ["临近到货采购单风险", [["PO-2026-0451 · PE", 94, "#d76e51"], ["PO-2026-0447 · 牛皮纸", 58, "#d59a4c"], ["PO-2026-0441 · 油墨", 29, "#568f7e"]]], ["供应商报价对比", [["VietFoil", "¥25.80", "18 天", "84%"], ["Golden Star", "¥24.90", "16 天", "94%"], ["Mekong", "¥25.20", "10 天", "91%"]]], ["待决策采购申请影响", [["PR-2026-0318 · PE", 88, "#d76e51"], ["PR-2026-0321 · 铝箔", 65, "#d59a4c"], ["其他申请", 34, "#568f7e"]]], ["铝箔近 6 个月价格与交期趋势", [["4月", 22.9, 12], ["5月", 23.2, 12], ["6月", 23.5, 13], ["7月", 24.0, 14], ["8月", 24.4, 14], ["9月", 24.9, 15]]]],
    },
    en: {
      gm: [["Today's cross-functional priorities", [["Natura Foods delivery", 92, "#d76e51"], ["Pacific Foods collection", 86, "#d59a4c"], ["Foil comparison", 74, "#568f7e"]]], ["Delivery risk chain", [["Order confirmation", "PE material missing", "#d76e51"], ["Procurement expedite", "Alternative pending", "#d59a4c"], ["Production plan", "09/15 capacity held", "#568f7e"], ["Customer update", "Today 15:00", "#3d80b3"]]], ["Overdue collection progress", [["Pacific Foods ¥286K", 95, "#d76e51"], ["VietTaste ¥168K", 66, "#d59a4c"], ["Other collections", 38, "#568f7e"]]], ["Procurement price anomalies", [["VietFoil +8.7%", 91, "#d76e51"], ["PE resin +4.2%", 54, "#d59a4c"], ["Kraft paper +1.8%", 27, "#568f7e"]]]],
      salesLead: [["Key-customer visit completion", [["Nguyen Thi Lan", 89, "#568f7e"], ["Pham Quang", 88, "#568f7e"], ["Le Hoa", 78, "#d59a4c"]]], ["Overdue quotes by value and age", [["GreenBite ¥178K · 4d", 92, "#d76e51"], ["Saigon Harvest ¥96K · 3d", 68, "#d59a4c"], ["VietTaste ¥74K · 3d", 51, "#568f7e"]]], ["Collection risk by sales rep", [["Chen Ming · ¥286K", 95, "#d76e51"], ["Le Hoa · ¥168K", 63, "#d59a4c"], ["Nguyen Thi Lan · ¥42K", 22, "#568f7e"]]], ["Key opportunity momentum", [["GreenBite · sample", 88, "#d59a4c"], ["Saigon Harvest · quote", 74, "#568f7e"], ["Blue Ocean · audit", 58, "#568f7e"]]], ["Visits vs. qualified opportunities", [["Nguyen Thi Lan", "8 visits", "6 opportunities", "good"], ["Pham Quang", "7 visits", "5 opportunities", "good"], ["Le Hoa", "9 visits", "2 opportunities", "watch"]]]],
      procLead: [["Material comparison urgency", [["12μ foil", 93, "#d76e51"], ["PE material", 67, "#d59a4c"], ["Kraft paper", 36, "#568f7e"]]], ["Inbound PO risk", [["PO-2026-0451 · PE", 94, "#d76e51"], ["PO-2026-0447 · kraft", 58, "#d59a4c"], ["PO-2026-0441 · ink", 29, "#568f7e"]]], ["Supplier quotation comparison", [["VietFoil", "¥25.80", "18 days", "84%"], ["Golden Star", "¥24.90", "16 days", "94%"], ["Mekong", "¥25.20", "10 days", "91%"]]], ["Purchase request impact", [["PR-2026-0318 · PE", 88, "#d76e51"], ["PR-2026-0321 · foil", 65, "#d59a4c"], ["Other requests", 34, "#568f7e"]]], ["6-month foil cost and lead-time trend", [["Apr", 22.9, 12], ["May", 23.2, 12], ["Jun", 23.5, 13], ["Jul", 24.0, 14], ["Aug", 24.4, 14], ["Sep", 24.9, 15]]]],
    },
    vi: {
      gm: [["Ưu tiên phối hợp hôm nay", [["Giao Natura Foods", 92, "#d76e51"], ["Thu tiền Pacific Foods", 86, "#d59a4c"], ["So sánh giá nhôm", 74, "#568f7e"]]], ["Chuỗi rủi ro giao hàng", [["Xác nhận đơn", "Thiếu nguyên liệu PE", "#d76e51"], ["Thúc giao", "Chờ phương án thay thế", "#d59a4c"], ["Kế hoạch sản xuất", "Giữ công suất 15/09", "#568f7e"], ["Cập nhật khách", "Hôm nay 15:00", "#3d80b3"]]], ["Tiến độ thu tiền quá hạn", [["Pacific Foods ¥286K", 95, "#d76e51"], ["VietTaste ¥168K", 66, "#d59a4c"], ["Khoản thu khác", 38, "#568f7e"]]], ["Bất thường giá mua", [["VietFoil +8,7%", 91, "#d76e51"], ["Hạt PE +4,2%", 54, "#d59a4c"], ["Giấy kraft +1,8%", 27, "#568f7e"]]]],
      salesLead: [["Hoàn thành gặp khách trọng điểm", [["Nguyen Thi Lan", 89, "#568f7e"], ["Pham Quang", 88, "#568f7e"], ["Le Hoa", 78, "#d59a4c"]]], ["Báo giá quá hạn theo giá trị", [["GreenBite ¥178K · 4 ngày", 92, "#d76e51"], ["Saigon Harvest ¥96K · 3 ngày", 68, "#d59a4c"], ["VietTaste ¥74K · 3 ngày", 51, "#568f7e"]]], ["Rủi ro thu tiền theo sales", [["Chen Ming · ¥286K", 95, "#d76e51"], ["Le Hoa · ¥168K", 63, "#d59a4c"], ["Nguyen Thi Lan · ¥42K", 22, "#568f7e"]]], ["Tiến độ cơ hội trọng điểm", [["GreenBite · mẫu", 88, "#d59a4c"], ["Saigon Harvest · báo giá", 74, "#568f7e"], ["Blue Ocean · audit", 58, "#568f7e"]]], ["Gặp khách và cơ hội chất lượng", [["Nguyen Thi Lan", "8 lần gặp", "6 cơ hội", "good"], ["Pham Quang", "7 lần gặp", "5 cơ hội", "good"], ["Le Hoa", "9 lần gặp", "2 cơ hội", "watch"]]]],
      procLead: [["Mức khẩn cấp so sánh giá", [["Nhôm 12μ", 93, "#d76e51"], ["Nguyên liệu PE", 67, "#d59a4c"], ["Giấy kraft", 36, "#568f7e"]]], ["Rủi ro PO sắp đến hàng", [["PO-2026-0451 · PE", 94, "#d76e51"], ["PO-2026-0447 · kraft", 58, "#d59a4c"], ["PO-2026-0441 · mực", 29, "#568f7e"]]], ["So sánh báo giá nhà cung cấp", [["VietFoil", "¥25.80", "18 ngày", "84%"], ["Golden Star", "¥24.90", "16 ngày", "94%"], ["Mekong", "¥25.20", "10 ngày", "91%"]]], ["Ảnh hưởng đề nghị mua cần duyệt", [["PR-2026-0318 · PE", 88, "#d76e51"], ["PR-2026-0321 · nhôm", 65, "#d59a4c"], ["Đề nghị khác", 34, "#568f7e"]]], ["Xu hướng giá và thời hạn nhôm 6 tháng", [["T4", 22.9, 12], ["T5", 23.2, 12], ["T6", 23.5, 13], ["T7", 24.0, 14], ["T8", 24.4, 14], ["T9", 24.9, 15]]]],
    },
  };
  const [title, rows] = copy[language][roleId][selected];
  const kind = roleId === "gm" && selected === 1 ? "timeline" : roleId === "salesLead" && selected === 4 ? "matrix" : roleId === "procLead" && selected === 2 ? "compare" : roleId === "procLead" && selected === 4 ? "trend" : "bars";
  return { title, rows, kind };
}

function RoleAIVisual({ visual, labels }) {
  if (visual.kind === "timeline") return <section className="role-ai-compact-visual role-ai-timeline"><div><strong>{visual.title}</strong><small>{labels.priority}</small></div>{visual.rows.map(([step, detail, color]) => <article key={step}><i style={{ background: color }} /><div><strong>{step}</strong><span>{detail}</span></div></article>)}</section>;
  if (visual.kind === "agenda") return <section className="role-ai-compact-visual role-ai-agenda"><div><strong>{visual.title}</strong><small>{labels.priority}</small></div>{visual.rows.map(([number, topic, owner]) => <article key={number}><b>{number}</b><span>{topic}</span><small>{owner}</small></article>)}</section>;
  if (visual.kind === "matrix") return <section className="role-ai-compact-visual role-ai-matrix"><div><strong>{visual.title}</strong><small>{labels.priority}</small></div>{visual.rows.map(([name, visits, opportunities, level]) => <article className={level} key={name}><strong>{name}</strong><span>{visits}</span><span>{opportunities}</span><b>{level === "watch" ? "!" : "✓"}</b></article>)}</section>;
  if (visual.kind === "compare") return <section className="role-ai-compact-visual role-ai-compare"><div><strong>{visual.title}</strong><small>{labels.priority}</small></div><p><span>Supplier</span><span>Price/kg</span><span>Lead time</span><span>On-time</span></p>{visual.rows.map(([name, price, lead, onTime]) => <article key={name}><strong>{name}</strong><span>{price}</span><span>{lead}</span><b>{onTime}</b></article>)}</section>;
  if (visual.kind === "trend") return <section className="role-ai-compact-visual role-ai-trend"><div><strong>{visual.title}</strong><small>Price / lead time</small></div><div className="role-trend-chart">{visual.rows.map(([month, price, days]) => <article key={month}><i style={{ height: `${(price - 21) * 13}%` }} /><b style={{ height: `${days * 5}%` }} /><span>{month}</span></article>)}</div><p className="role-trend-legend"><i />Price/kg <b />Lead days</p></section>;
  return <section className="role-ai-compact-visual"><div><strong>{visual.title}</strong><small>{labels.priority}</small></div>{visual.rows.map(([name, value, color]) => <p key={name}><span>{name}</span><i><b style={{ width: `${value}%`, background: color }} /></i><em>{value}</em></p>)}</section>;
}

function salesQuickDraft(language, selected) {
  const drafts = {
    zh: [
      { title: "AI 已生成：客户拜访记录", fields: [["客户", "GreenBite Packaging"], ["动作类型", "上门拜访"], ["预计机会", "¥ 180,000"], ["下一步动作", "周五前寄样，下周电话跟进"]], record: { customer: "GreenBite Packaging", action: "上门拜访", amount: "¥ 180,000", followUp: "周五前寄样，下周电话跟进", visitType: "onSite" } },
      { title: "AI 已生成：报价跟进记录", fields: [["客户", "GreenBite Packaging"], ["当前报价", "¥ 178,000"], ["客户反馈", "等待样品测试结果"], ["风险提示", "报价已超过 3 天未跟进"]], record: { customer: "GreenBite Packaging", action: "报价跟进", amount: "¥ 178,000", followUp: "今天 11:00 电话确认样品反馈", visitType: "online" } },
      { title: "AI 已生成：回款承诺记录", fields: [["客户", "Pacific Foods Co."], ["待回款", "¥ 286,000"], ["客户承诺", "9 月 26 日付款"], ["下一步动作", "9 月 25 日再次确认到账"]], record: { customer: "Pacific Foods Co.", action: "回款跟进", amount: "¥ 286,000", followUp: "9 月 25 日再次确认到账", visitType: "online" } },
      { title: "AI 已生成：客户验厂结果", fields: [["客户", "Saigon Harvest"], ["验厂结果", "通过，需补充食品级文件"], ["预计机会", "¥ 240,000"], ["下一步动作", "周三前发送补充资料"]], record: { customer: "Saigon Harvest", action: "客户验厂", amount: "¥ 240,000", followUp: "周三前发送食品级文件", visitType: "factory" } },
      { title: "AI 已生成：下周跟进提醒", fields: [["客户", "Freshway Vietnam"], ["跟进主题", "确认订单排产进度"], ["提醒时间", "下周一 09:30"], ["下一步动作", "发送生产进度并预约电话"]], record: { customer: "Freshway Vietnam", action: "创建跟进提醒", amount: "¥ 196,000", followUp: "下周一 09:30 发送生产进度并预约电话", visitType: "online" } },
    ],
    en: [
      { title: "AI created: customer visit record", fields: [["Customer", "GreenBite Packaging"], ["Activity", "On-site visit"], ["Expected value", "¥ 180,000"], ["Next action", "Send samples by Friday; call next week"]], record: { customer: "GreenBite Packaging", action: "On-site visit", amount: "¥ 180,000", followUp: "Send samples by Friday; call next week", visitType: "onSite" } },
      { title: "AI created: quote follow-up", fields: [["Customer", "GreenBite Packaging"], ["Current quote", "¥ 178,000"], ["Customer feedback", "Awaiting sample test results"], ["Risk", "Quote has not been followed up for over 3 days"]], record: { customer: "GreenBite Packaging", action: "Quote follow-up", amount: "¥ 178,000", followUp: "Call today at 11:00 to confirm sample feedback", visitType: "online" } },
      { title: "AI created: payment commitment", fields: [["Customer", "Pacific Foods Co."], ["Amount to collect", "¥ 286,000"], ["Customer commitment", "Payment on September 26"], ["Next action", "Confirm receipt again on September 25"]], record: { customer: "Pacific Foods Co.", action: "Collection follow-up", amount: "¥ 286,000", followUp: "Confirm receipt again on September 25", visitType: "online" } },
      { title: "AI created: factory-visit result", fields: [["Customer", "Saigon Harvest"], ["Result", "Passed; food-grade documents required"], ["Expected value", "¥ 240,000"], ["Next action", "Send supporting documents by Wednesday"]], record: { customer: "Saigon Harvest", action: "Factory visit", amount: "¥ 240,000", followUp: "Send food-grade documents by Wednesday", visitType: "factory" } },
      { title: "AI created: next-week reminder", fields: [["Customer", "Freshway Vietnam"], ["Topic", "Confirm production progress"], ["Reminder", "Next Monday, 09:30"], ["Next action", "Send progress update and schedule a call"]], record: { customer: "Freshway Vietnam", action: "Create follow-up reminder", amount: "¥ 196,000", followUp: "Next Monday 09:30: send progress update and schedule a call", visitType: "online" } },
    ],
    vi: [
      { title: "AI đã tạo: ghi nhận gặp khách", fields: [["Khách hàng", "GreenBite Packaging"], ["Loại hoạt động", "Đến thăm trực tiếp"], ["Cơ hội dự kiến", "¥ 180,000"], ["Bước tiếp theo", "Gửi mẫu trước thứ Sáu, gọi lại tuần sau"]], record: { customer: "GreenBite Packaging", action: "Thăm gặp trực tiếp", amount: "¥ 180,000", followUp: "Gửi mẫu trước thứ Sáu, gọi lại tuần sau", visitType: "onSite" } },
      { title: "AI đã tạo: theo dõi báo giá", fields: [["Khách hàng", "GreenBite Packaging"], ["Báo giá hiện tại", "¥ 178,000"], ["Phản hồi khách", "Đang chờ kết quả thử mẫu"], ["Rủi ro", "Báo giá quá 3 ngày chưa theo dõi"]], record: { customer: "GreenBite Packaging", action: "Theo dõi báo giá", amount: "¥ 178,000", followUp: "Gọi lúc 11:00 hôm nay để xác nhận phản hồi mẫu", visitType: "online" } },
      { title: "AI đã tạo: cam kết thanh toán", fields: [["Khách hàng", "Pacific Foods Co."], ["Khoản cần thu", "¥ 286,000"], ["Cam kết khách hàng", "Thanh toán ngày 26/09"], ["Bước tiếp theo", "Xác nhận lại tiền về ngày 25/09"]], record: { customer: "Pacific Foods Co.", action: "Theo dõi thu tiền", amount: "¥ 286,000", followUp: "Xác nhận lại tiền về ngày 25/09", visitType: "online" } },
      { title: "AI đã tạo: kết quả khách thăm nhà máy", fields: [["Khách hàng", "Saigon Harvest"], ["Kết quả", "Đạt, cần bổ sung hồ sơ thực phẩm"], ["Cơ hội dự kiến", "¥ 240,000"], ["Bước tiếp theo", "Gửi hồ sơ bổ sung trước thứ Tư"]], record: { customer: "Saigon Harvest", action: "Khách thăm nhà máy", amount: "¥ 240,000", followUp: "Gửi hồ sơ thực phẩm trước thứ Tư", visitType: "factory" } },
      { title: "AI đã tạo: nhắc việc tuần sau", fields: [["Khách hàng", "Freshway Vietnam"], ["Nội dung", "Xác nhận tiến độ sản xuất"], ["Thời gian nhắc", "Thứ Hai tuần sau, 09:30"], ["Bước tiếp theo", "Gửi tiến độ và đặt lịch gọi điện"]], record: { customer: "Freshway Vietnam", action: "Tạo nhắc theo dõi", amount: "¥ 196,000", followUp: "Thứ Hai tuần sau 09:30 gửi tiến độ và đặt lịch gọi điện", visitType: "online" } },
    ],
  };
  return drafts[language][selected] || drafts[language][0];
}

function adminKnowledgeData(language, imported) {
  const importedName = imported?.latestFile || (language === "vi" ? "EPAC_Thu_vien_hanh_chinh_2026Q3.zip" : "EPAC_行政资料库_2026Q3.zip");
  const sourceState = imported
    ? (language === "zh" ? `已检索刚导入资料包 · ${imported.fileCount} 份文件` : language === "en" ? `Searched the imported pack · ${imported.fileCount} files` : `Đã tra cứu gói vừa nhập · ${imported.fileCount} tệp`)
    : (language === "zh" ? "演示行政资料库 · 24 份已归档资料" : language === "en" ? "Demonstration library · 24 archived files" : "Thư viện minh họa · 24 tài liệu đã lưu");
  const content = {
    zh: {
      title: "行政资料库 AI 查询", hint: "制度、模板、历史文件与政府公文均可直接提问，AI 会给出结论并引用来源。", sourceState, queries: ["越南员工请年假需要提前几天申请？", "帮我查最新的员工入职清单。", "合同用印流程需要哪些审批和资料？", "劳动部门 8 月通知与加班规定有关吗？", "Nguyen Van Minh 离职时需要交接哪些行政事项？"],
      results: [
        ["试用期满员工申请年假，应至少提前 3 个工作日提交；直属负责人确认后，由行政更新考勤记录。", "员工请假与考勤制度.pdf", "公司制度 · 2026-08"],
        ["入职需准备劳动合同、入职清单、工牌申请、工位安排和培训计划；系统已找到最新版本清单。", "员工入职清单.xlsx", "员工入职 / 离职 · 2026-09"],
        ["合同用印须先完成部门负责人和总经理审批，并附合同定稿、用印申请单；盖章后扫描并登记台账。", "合同用印管理制度.pdf · 合同用印台账.xlsx", "合同与用印 · 2026-07"],
        ["有关。8 月通知要求加班记录须保留员工确认、工作时长和审批依据；行政应同步更新加班台账。", "政府劳动部门通知_2026-08.pdf", "政府公文 · 2026-08"],
        ["需交还工牌和公司资产，完成劳动合同解除、社保与薪资结算、工作交接及离职文件归档。", "离职交接模板.docx", "员工入职 / 离职 · 2026-09"],
      ],
      label: "AI 已检索行政资料库", cited: "引用文件", state: "资料库状态", latest: importedName,
    },
    en: {
      title: "Administration Knowledge AI Search", hint: "Ask about policies, templates, historical files, or government notices. AI answers with the document source.", sourceState, queries: ["How many days in advance should annual leave be requested?", "Find the latest employee onboarding checklist.", "What approvals and documents are required for a company seal?", "Is the August labor notice related to overtime rules?", "What administrative handover is needed when Nguyen Van Minh leaves?"],
      results: [
        ["After probation, annual leave should be submitted at least 3 working days ahead. The line manager confirms it and administration updates attendance.", "Leave and Attendance Policy.pdf", "Company policy · 2026-08"],
        ["Prepare the labor contract, onboarding checklist, badge request, desk setup, and training plan. The newest checklist has been found.", "Employee Onboarding Checklist.xlsx", "Employee lifecycle · 2026-09"],
        ["Company sealing requires department-head and GM approval, a final contract, and a seal request. Scan and register the document after sealing.", "Company Seal Policy.pdf · Seal Register.xlsx", "Contracts and seals · 2026-07"],
        ["Yes. The August notice requires overtime records to retain employee confirmation, working hours, and approval evidence.", "Labor Department Notice_2026-08.pdf", "Government notice · 2026-08"],
        ["Return the badge and company assets, complete contract termination, social-insurance and payroll settlement, handover, and archive the exit documents.", "Offboarding Handover Template.docx", "Employee lifecycle · 2026-09"],
      ],
      label: "AI searched the administration library", cited: "Cited files", state: "Library status", latest: importedName,
    },
    vi: {
      title: "AI tra cứu thư viện hành chính", hint: "Hỏi trực tiếp về quy định, biểu mẫu, hồ sơ lịch sử hoặc công văn. AI trả lời kèm nguồn tài liệu.", sourceState, queries: ["Nhân viên cần xin nghỉ phép năm trước bao nhiêu ngày?", "Tìm danh sách nhận việc mới nhất.", "Quy trình đóng dấu hợp đồng cần phê duyệt và hồ sơ nào?", "Thông báo lao động tháng 8 có liên quan đến quy định tăng ca không?", "Nguyen Van Minh cần bàn giao những việc hành chính nào khi nghỉ việc?"],
      results: [
        ["Sau thử việc, nhân viên cần gửi đơn nghỉ phép năm trước ít nhất 3 ngày làm việc. Quản lý trực tiếp xác nhận và hành chính cập nhật chấm công.", "Quy chế nghỉ phép và chấm công.pdf", "Quy định công ty · 2026-08"],
        ["Cần chuẩn bị hợp đồng lao động, danh sách nhận việc, yêu cầu thẻ, chỗ ngồi và kế hoạch đào tạo. AI đã tìm được phiên bản mới nhất.", "Danh sách nhận việc.xlsx", "Nhân sự vào / ra · 2026-09"],
        ["Đóng dấu cần có phê duyệt trưởng bộ phận và tổng giám đốc, hợp đồng cuối cùng và phiếu yêu cầu đóng dấu. Sau đó quét và ghi sổ theo dõi.", "Quy định đóng dấu.pdf · Sổ theo dõi đóng dấu.xlsx", "Hợp đồng và đóng dấu · 2026-07"],
        ["Có liên quan. Thông báo tháng 8 yêu cầu lưu xác nhận của nhân viên, số giờ làm và căn cứ phê duyệt cho tăng ca.", "Thông báo Sở Lao động_2026-08.pdf", "Công văn nhà nước · 2026-08"],
        ["Cần trả thẻ và tài sản công ty, hoàn thành chấm dứt hợp đồng, bảo hiểm và lương, bàn giao công việc và lưu hồ sơ nghỉ việc.", "Mẫu bàn giao nghỉ việc.docx", "Nhân sự vào / ra · 2026-09"],
      ],
      label: "AI đã tra cứu thư viện hành chính", cited: "Tài liệu trích dẫn", state: "Trạng thái thư viện", latest: importedName,
    },
  };
  return content[language];
}

function AdminKnowledgeSearch({ language, imported, querySignal }) {
  const data = adminKnowledgeData(language, imported);
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    if (!querySignal) return;
    const normalized = querySignal.toLowerCase();
    const keywords = [
      ["年假", "nghỉ phép", "annual leave", "leave"],
      ["入职", "nhận việc", "onboarding", "checklist"],
      ["用印", "đóng dấu", "seal", "contract"],
      ["政府", "公文", "lao động", "government", "overtime", "tăng ca"],
      ["离职", "nghỉ việc", "offboarding", "minh"],
    ];
    const match = keywords.findIndex((group) => group.some((word) => normalized.includes(word)));
    if (match >= 0) setSelected(match);
  }, [querySignal]);
  const [answer, file, category] = data.results[selected];
  return <section className="admin-ai-library">
    <div className="admin-ai-library-head"><div><FileCheck2 size={17} /><div><strong>{data.title}</strong><small>{data.hint}</small></div></div><span>{data.sourceState}</span></div>
    <div className="admin-ai-query-list">{data.queries.map((query, index) => <button key={query} className={index === selected ? "active" : ""} onClick={() => setSelected(index)}><b>{index + 1}</b>{query}</button>)}</div>
    <article className="admin-ai-answer"><p><Sparkles size={14} /> {data.label}</p><h3>{answer}</h3><dl><div><dt>{data.cited}</dt><dd>{file}</dd></div><div><dt>{data.state}</dt><dd>{category}</dd></div></dl><small>{data.latest}</small></article>
  </section>;
}

function RoleAIHub({ language, role, onSaveRecord, savedVisits = [], adminKnowledge = null }) {
  const data = roleAIData(role.id, language);
  const [selected, setSelected] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [listening, setListening] = useState(false);
  const [draftVisible, setDraftVisible] = useState(false);
  const [saved, setSaved] = useState(false);
  const [adminQuerySignal, setAdminQuerySignal] = useState("");
  const labels = language === "vi"
    ? { title: "Trợ lý thông minh", management: "AI điều hành theo vai trò", entry: "AI nhập liệu theo vai trò", analyze: "Phân tích", listen: "Nhập bằng giọng nói", listening: "Đang nghe và nhận diện...", conclusion: "Kết luận AI", recommendation: "Đề xuất hành động", priority: "Mức ưu tiên", detected: "AI đã trích xuất thông tin", inputHint: "Nói hoặc nhập mô tả công việc, AI sẽ tạo bản nháp có cấu trúc." }
    : language === "en"
      ? { title: "Intelligent Assistant", management: "Role-based management intelligence", entry: "Role-based AI data entry", analyze: "Analyze", listen: "Voice input", listening: "Listening and recognizing...", conclusion: "AI conclusion", recommendation: "Recommended action", priority: "Priority", detected: "AI extracted the following information", inputHint: "Speak or describe the task; AI will create a structured draft." }
      : { title: "智能助手", management: "岗位经营智能问答", entry: "岗位自然语言录入", analyze: "立即处理", listen: "语音输入", listening: "正在聆听并识别...", conclusion: "AI 分析结论", recommendation: "建议动作", priority: "优先级", detected: "AI 已识别并生成结构化草稿", inputHint: "说出或输入工作情况，AI 会自动提取信息并生成待确认记录。" };
  const handleSubmit = () => {
    if (!prompt.trim()) return;
    const normalizedPrompt = prompt.toLowerCase();
    if (role.id === "admin" && /(制度|入职|离职|用印|政府|公文|年假|资料|policy|onboarding|offboarding|seal|government|leave|document|quy định|nhận việc|nghỉ việc|đóng dấu|công văn|nghỉ phép|tài liệu)/.test(normalizedPrompt)) {
      setAdminQuerySignal(prompt);
      return;
    }
    const historyQuery = role.id === "procLead" && (normalizedPrompt.includes("历史") || normalizedPrompt.includes("趋势") || normalizedPrompt.includes("6 个") || normalizedPrompt.includes("6个") || normalizedPrompt.includes("history") || normalizedPrompt.includes("trend") || normalizedPrompt.includes("6-month") || normalizedPrompt.includes("6 tháng") || normalizedPrompt.includes("xu hướng"));
    const matchingIndex = historyQuery ? 4 : data.questions.findIndex((question) => normalizedPrompt.includes(question.toLowerCase().slice(0, 8)));
    setSelected(matchingIndex >= 0 ? matchingIndex : 0);
    if (!data.management) {
      setDraftVisible(true);
      setSaved(false);
    }
  };
  const simulateVoice = () => {
    if (listening) return;
    setListening(true);
    window.setTimeout(() => {
      setPrompt(data.voice);
      setSelected(data.management ? Math.min(4, data.questions.length - 1) : 0);
      setDraftVisible(!data.management);
      setSaved(false);
      setListening(false);
    }, 1100);
  };
  const confirmDraft = () => {
    if (role.id === "sales") {
      const draft = salesQuickDraft(language, selected);
      onSaveRecord({
        ...draft.record,
        language: language === "vi" ? "Tiếng Việt" : language === "en" ? "English" : "中文",
      });
    }
    setSaved(true);
  };
  const activeAnswer = data.management ? data.answers[selected] : null;
  const activeAction = data.management ? data.actions[selected] : null;
  const visual = data.management ? roleAIVisualData(role.id, language, selected) : null;
  const activeDraft = role.id === "sales" ? salesQuickDraft(language, selected) : { title: data.draftTitle, fields: data.fields };
  return <section className={`role-ai-hub ${data.management ? "management-hub" : "entry-hub"}`}>
    <div className="role-ai-header"><span><Sparkles size={21} /></span><div><p>{data.management ? labels.management : labels.entry}</p><h2>{labels.title}</h2><small>{data.subtitle}</small></div></div>
    <div className={`role-ai-input ${listening ? "is-listening" : ""}`}><Search size={18} /><input value={listening ? labels.listening : prompt} onChange={(event) => setPrompt(event.target.value)} onKeyDown={(event) => event.key === "Enter" && handleSubmit()} placeholder={data.placeholder} readOnly={listening} /><button className="role-voice-button" onClick={simulateVoice} title={labels.listen} aria-label={labels.listen}><Mic size={18} /></button><button className="role-ai-submit" onClick={handleSubmit}><Sparkles size={15} /> {labels.analyze}</button></div>
    <div className="role-ai-questions">{data.questions.map((question, index) => <button className={selected === index ? "active" : ""} key={question} onClick={() => { setSelected(index); setPrompt(question); if (!data.management) { setDraftVisible(true); setSaved(false); } }}><b>{index + 1}</b>{question}</button>)}</div>
    {data.management ? <div className="role-ai-management-result"><section><p>{labels.conclusion}</p><h3>{activeAnswer}</h3><div><strong><Target size={15} /> {labels.recommendation}</strong><span>{activeAction}</span></div></section><RoleAIVisual visual={visual} labels={labels} /></div> : <>
      <div className="role-ai-entry-result">
        <div className="role-ai-entry-intro"><MessageSquareText size={17} /><span>{labels.inputHint}</span></div>
        {draftVisible && <div className={`role-ai-draft ${saved ? "is-saved" : ""}`}><div><CheckCircle2 size={17} /><strong>{saved ? data.saved : activeDraft.title}</strong></div><dl>{activeDraft.fields.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>{!saved && <button className="primary-button compact" onClick={confirmDraft}><CheckCircle2 size={15} /> {data.confirm}</button>}</div>}
        {role.id === "admin" && <AdminKnowledgeSearch language={language} imported={adminKnowledge} querySignal={adminQuerySignal} />}
        {role.id === "sales" && <VoiceVisitCapture language={language} onSaveRecord={onSaveRecord} savedVisits={savedVisits} embedded />}
      </div>
    </>}
  </section>;
}

function getLocalizedRoleDashboard(roleId, language) {
  if (language === "zh") return { ...roleDashboards[roleId], aiNote: "智能助手会根据当前岗位的事项，提供风险摘要和下一步建议。" };
  const isVi = language === "vi";
  const shared = isVi
    ? { aiNote: "Trợ lý AI sẽ tóm tắt rủi ro và đề xuất bước tiếp theo theo công việc của vị trí hiện tại.", all: "Xem tất cả" }
    : { aiNote: "The AI assistant summarizes risks and recommends the next action for this role.", all: "View all" };
  const content = {
    gm: isVi ? {
      eyebrow: "TỔNG GIÁM ĐỐC · VẬN HÀNH HÀNG NGÀY", title: "Bàn điều hành Tổng giám đốc", copy: "Điều phối giao hàng, thu tiền và phê duyệt để khép kín việc liên phòng ban.", action: "Xem rủi ro vận hành", actionPage: "alerts", ask: "Việc nào cần xử lý trước trong tuần này?",
      metrics: [["Bất thường cần xử lý hôm nay", "5", "2 việc liên phòng ban"], ["Đơn rủi ro cao", "2", "Đều liên quan thời hạn nguyên liệu"], ["Công nợ quá hạn", "¥ 1.26M", "8 khoản chờ xử lý"], ["Chờ tôi phê duyệt", "4", "1 việc quá 24 giờ"]], titleOne: "Việc cần phối hợp hôm nay", titleTwo: "Tình trạng phòng ban",
      tasks: [["Rủi ro giao hàng", "SO-2026-0918 · Natura Foods", "PE về muộn hơn nhu cầu sản xuất; mua hàng xác nhận hàng sẵn có và sales cập nhật khách.", "Mua hàng + Sales"], ["Rủi ro thu tiền", "Pacific Foods Co. · ¥286,000", "Quá hạn 14 ngày; trưởng kinh doanh cần nộp kế hoạch thu tiền hôm nay.", "Kinh doanh"], ["Bất thường giá", "Nhôm 12μ · VietFoil", "Cao hơn giá trung bình 90 ngày 8.7%; xác nhận nguồn thay thế và tồn kho an toàn.", "Mua hàng"]], pulse: [["Kinh doanh", "3 báo giá chờ theo dõi", "Cần chú ý"], ["Mua hàng", "1 rủi ro nguyên liệu", "Ưu tiên cao"], ["Hành chính", "2 hợp đồng chờ duyệt", "Bình thường"]],
    } : {
      eyebrow: "GENERAL MANAGER · DAILY EXECUTION", title: "General Manager Execution Desk", copy: "Coordinate delivery, collection, and approvals to close cross-functional issues.", action: "View operating risks", actionPage: "alerts", ask: "What needs attention first this week?",
      metrics: [["Exceptions to advance today", "5", "2 cross-functional"], ["High-risk orders", "2", "Both involve material lead time"], ["Overdue receivables", "¥ 1.26M", "8 items to advance"], ["Awaiting my approval", "4", "1 item over 24 hours"]], titleOne: "Today's Cross-functional Actions", titleTwo: "Department Status",
      tasks: [["Delivery risk", "SO-2026-0918 · Natura Foods", "PE is arriving after production need. Procurement should confirm available stock and sales should update the customer.", "Procurement + Sales"], ["Collection risk", "Pacific Foods Co. · ¥286,000", "14 days overdue. The sales lead needs to submit a collection plan today.", "Sales"], ["Price anomaly", "12μ Foil · VietFoil", "8.7% above the 90-day average; confirm alternate suppliers and safety stock.", "Procurement"]], pulse: [["Sales", "3 quotes need follow-up", "Watch"], ["Procurement", "1 material arrival risk", "High priority"], ["Administration", "2 contracts awaiting approval", "Normal"]],
    },
    procLead: isVi ? {
      eyebrow: "TRƯỞNG MUA HÀNG · KIỂM SOÁT CUNG ỨNG", title: "Bàn làm việc Trưởng mua hàng", copy: "Quyết định so sánh giá và thời hạn, xử lý rủi ro nhà cung cấp.", action: "Mở bàn mua hàng", actionPage: "procurement", ask: "So sánh báo giá nhà cung cấp nhôm",
      metrics: [["Mua hàng tháng này", "¥ 5.42M", "so với tháng trước +4.8%"], ["Yêu cầu chờ so sánh", "6", "2 việc đến hạn hôm nay"], ["Sắp đến hàng", "9", "7 ngày tới"], ["Bất thường giá", "3", "Nhôm tăng rõ rệt"]], titleOne: "Ưu tiên của trưởng mua hàng", titleTwo: "Tình trạng rủi ro cung ứng",
      tasks: [["Thúc giao", "PO-2026-0451 · PE", "Dự kiến đến sau nhu cầu SO-2026-0918; xác nhận hàng sẵn hoặc nhà cung cấp thay thế.", "Pham Huy"], ["Quyết định so sánh", "Nhôm 12μ · 3 nhà cung cấp", "Golden Star rẻ nhất, Mekong nhanh nhất. Xác nhận đề xuất mua.", "Hôm nay"], ["Phê duyệt", "PR-2026-0318 · PE 18 tấn", "Giá trị ¥486,000 ảnh hưởng trực tiếp đến hạn giao khách hàng trọng điểm.", "Chờ tổng giám đốc"]], pulse: [["VietFoil", "Cao hơn giá bình quân 8.7%", "Cần so sánh"], ["Golden Star", "Giá tốt nhất, 16 ngày", "Có thể chọn"], ["Mekong Materials", "Nhanh nhất, 10 ngày", "Có thể chọn"]],
    } : {
      eyebrow: "PROCUREMENT LEAD · SUPPLY CONTROL", title: "Procurement Lead Workspace", copy: "Decide price comparisons and lead times, then resolve supplier risks.", action: "Open Procurement Desk", actionPage: "procurement", ask: "Compare foil supplier quotes",
      metrics: [["Procurement this month", "¥ 5.42M", "+4.8% vs. last month"], ["Requests to compare", "6", "2 due today"], ["Incoming materials", "9", "next 7 days"], ["Price anomalies", "3", "foil increased"]], titleOne: "Procurement Lead Priorities", titleTwo: "Supply Risk Status",
      tasks: [["Expedite", "PO-2026-0451 · PE", "Arrival is after SO-2026-0918 needs. Confirm available stock or an alternative supplier.", "Pham Huy"], ["Comparison decision", "12μ Foil · 3 suppliers", "Golden Star is lowest price; Mekong is fastest. Confirm the buying recommendation.", "Today"], ["Approval", "PR-2026-0318 · 18t PE", "The ¥486,000 request directly affects a key order delivery date.", "Awaiting GM"]], pulse: [["VietFoil", "8.7% above average", "Compare"], ["Golden Star", "Best price, 16 days", "Available"], ["Mekong Materials", "Fastest lead time, 10 days", "Available"]],
    },
    proc: isVi ? {
      eyebrow: "MUA HÀNG · VIỆC HÔM NAY", title: "Bàn làm việc Mua hàng", copy: "Xử lý hỏi giá, thúc giao, nhận hàng và đề nghị mua.", action: "Xem việc mua hàng", actionPage: "procurement", ask: "Đơn mua nào sắp đến hạn?",
      metrics: [["Việc của tôi", "7", "2 việc đến hạn hôm nay"], ["Vật tư chờ hỏi giá", "3", "6 nhà cung cấp"], ["Đơn cần thúc", "2", "Ảnh hưởng 1 đơn sales"], ["Yêu cầu chờ duyệt", "1", "PR-2026-0318"]], titleOne: "Việc tôi cần làm hôm nay", titleTwo: "Tình trạng đơn mua của tôi",
      tasks: [["Ưu tiên thúc giao", "PO-2026-0451 · PE", "Liên hệ nhà cung cấp, xác nhận có thể đến sớm ngày 09/14 và cập nhật ngày dự kiến.", "Hôm nay 10:30"], ["Hỏi giá", "Nhôm 12μ · 18 tấn", "Lấy giá mới, tồn kho và điều khoản thanh toán từ Golden Star và Mekong.", "Hôm nay 14:00"], ["Xác nhận nhập kho", "PO-2026-0447 · Giấy kraft", "Kiểm tra số lượng và chất lượng, hoàn thành biên bản nhập kho.", "Hôm nay"]], pulse: [["PO-2026-0451", "PE · Chờ đến", "Ưu tiên cao"], ["PO-2026-0447", "Giấy kraft · Chờ nhập kho", "Hôm nay"], ["PR-2026-0318", "Chờ tổng giám đốc duyệt", "¥486,000"]],
    } : {
      eyebrow: "PROCUREMENT · TODAY'S ACTIONS", title: "My Procurement Workspace", copy: "Handle quotes, expediting, receiving, and purchase requests.", action: "View Procurement Tasks", actionPage: "procurement", ask: "Which purchase orders are nearing arrival?",
      metrics: [["My tasks", "7", "2 due today"], ["Materials to quote", "3", "6 suppliers"], ["Orders to expedite", "2", "Affects 1 sales order"], ["Approval pending", "1", "PR-2026-0318"]], titleOne: "What I Need To Do Today", titleTwo: "My Purchase Order Status",
      tasks: [["Priority expedite", "PO-2026-0451 · PE", "Ask the supplier whether the 09/14 arrival can be advanced and update the expected date.", "Today 10:30"], ["Request quotes", "12μ Foil · 18t", "Get latest price, available stock, and payment terms from Golden Star and Mekong.", "Today 14:00"], ["Confirm receipt", "PO-2026-0447 · Kraft paper", "Check received quantity and quality, then complete the warehouse record.", "Today"]], pulse: [["PO-2026-0451", "PE · Awaiting arrival", "High priority"], ["PO-2026-0447", "Kraft paper · Awaiting receipt", "Today"], ["PR-2026-0318", "Awaiting GM approval", "¥486,000"]],
    },
    admin: isVi ? {
      eyebrow: "HÀNH CHÍNH · VẬN HÀNH HÀNG NGÀY", title: "Bàn làm việc Hành chính", copy: "Xử lý nghỉ phép, đóng dấu, tuyển dụng và quy trình nhân sự.", action: "Tải dữ liệu tài liệu hành chính", actionPage: "admin", ask: "Việc nào cần xử lý trước trong tuần này?",
      metrics: [["Yêu cầu chờ xử lý", "7", "3 đơn nghỉ phép"], ["Hợp đồng chờ đóng dấu", "3", "1 đơn chờ tổng giám đốc"], ["Tuyển dụng", "2", "Phỏng vấn sales"], ["Nhân sự vào/ra", "3", "Hoàn thành tuần này"]], titleOne: "Việc tôi cần làm hôm nay", titleTwo: "Tình trạng quy trình",
      tasks: [["Duyệt nghỉ phép", "Nguyen Van Minh · Nghỉ phép năm 2 ngày", "Trưởng kinh doanh đã duyệt; hành chính xác nhận và cập nhật hồ sơ nghỉ.", "Hôm nay"], ["Đóng dấu hợp đồng", "Hợp đồng cung ứng năm", "Sau khi tổng giám đốc duyệt, đóng dấu, quét và lưu sổ theo dõi.", "Chờ duyệt"], ["Nhân viên mới", "Tran Minh · Nhận việc 09/12", "Chuẩn bị hợp đồng, thẻ, chỗ ngồi và danh sách đào tạo.", "Tuần này"]], pulse: [["Nghỉ phép", "3 việc chờ hành chính xác nhận", "Hôm nay"], ["Đóng dấu", "2 việc chờ tổng giám đốc", "Chờ xử lý"], ["Tuyển dụng", "Tran Minh nhận việc 09/12", "Đang làm"]],
    } : {
      eyebrow: "ADMINISTRATION · DAILY OPERATIONS", title: "Administration Workspace", copy: "Process leave, contract seals, recruitment, and employee changes.", action: "Upload administration files", actionPage: "admin", ask: "What needs attention first this week?",
      metrics: [["Requests to process", "7", "3 leave requests"], ["Contracts awaiting seal", "3", "1 awaiting GM"], ["Recruitment tasks", "2", "Sales interviews"], ["Employee transitions", "3", "Complete this week"]], titleOne: "What I Need To Do Today", titleTwo: "Workflow Status",
      tasks: [["Leave approval", "Nguyen Van Minh · 2 days annual leave", "The sales lead approved it. Administration should confirm and update the leave record.", "Today"], ["Contract seal", "Annual customer supply agreement", "After GM approval, apply the seal, scan, and archive it in the register.", "Awaiting approval"], ["New employee", "Tran Minh · Start 09/12", "Prepare contract, badge, desk, and onboarding checklist.", "This week"]], pulse: [["Leave requests", "3 awaiting admin confirmation", "Today"], ["Contract seals", "2 awaiting GM approval", "To process"], ["Recruitment", "Tran Minh starts 09/12", "In progress"]],
    },
  };
  return { ...content[roleId], ...shared };
}

function ownerFunnelData(language, savedVisits = [], period = "month") {
  const extraVisits = savedVisits.length;
  const labels = {
    zh: {
      stages: [
        ["潜在客户建档", "42", "¥ 3.26M", "8 个需补全资料", "Mekong Organics", "Pham Quang", "¥124K", "补充客户需求与决策人", "Blue Ocean Foods", "Le Hoa", "¥245K", "预约客户来厂验厂"],
        ["完成客户拜访", String(28 + extraVisits), "¥ 2.82M", "5 个未录入拜访结论", "GreenBite Packaging", "Nguyen Thi Lan", "¥178K", "确认样品反馈", "Freshway Vietnam", "Nguyen Thi Lan", "¥428K", "同步生产进度"],
        ["打样 / 报价", "15", "¥ 1.72M", "3 份报价超过 3 天未跟进", "GreenBite Packaging", "Nguyen Thi Lan", "¥178K", "今天 11:00 电话跟进", "Saigon Harvest", "Le Hoa", "¥96K", "样品确认后提交报价"],
        ["客户确认", "9", "¥ 1.08M", "2 个客户等待内部预算确认", "VietTaste Foods", "Pham Quang", "¥156K", "确认客户预算与下单时间", "Blue Ocean Foods", "Le Hoa", "¥245K", "验厂整改资料待确认"],
        ["本月已下订单", "24", "¥ 12.84M", "2 笔订单有交期协同风险", "Natura Foods", "陈明", "¥362K", "确认 PE 原料到货时间", "Happy Bean", "Nguyen Thi Lan", "¥196K", "跟进排产与客户交期"],
        ["对账 / 回款", "19", "¥ 9.86M", "8 笔待回款，含 1 笔严重逾期", "Pacific Foods Co.", "陈明", "¥286K", "补录付款承诺并催收", "Freshway Vietnam", "Nguyen Thi Lan", "¥428K", "确认本周对账单"],
      ],
      labels: { open: "在途机会", result: "经营结果", conversion: "阶段转化", risk: "风险", detail: "点击阶段后展开明细", customers: "该阶段重点客户", owner: "负责人", value: "金额", next: "当前卡点 / 下一步", action: "建议动作", insight: "经营提示", periods: [["week", "本周"], ["month", "本月"], ["quarter", "本季度"], ["year", "本年度"]] },
    },
    en: {
      stages: [
        ["Prospect Registration", "42", "¥ 3.26M", "8 profiles need completion", "Mekong Organics", "Pham Quang", "¥124K", "Add requirements and decision maker", "Blue Ocean Foods", "Le Hoa", "¥245K", "Book customer factory audit"],
        ["Customer Visits", String(28 + extraVisits), "¥ 2.82M", "5 visits lack conclusions", "GreenBite Packaging", "Nguyen Thi Lan", "¥178K", "Confirm sample feedback", "Freshway Vietnam", "Nguyen Thi Lan", "¥428K", "Send production update"],
        ["Sample / Quote", "15", "¥ 1.72M", "3 quotes open for over 3 days", "GreenBite Packaging", "Nguyen Thi Lan", "¥178K", "Call today at 11:00", "Saigon Harvest", "Le Hoa", "¥96K", "Quote after sample confirmation"],
        ["Customer Confirmation", "9", "¥ 1.08M", "2 customers await budget approval", "VietTaste Foods", "Pham Quang", "¥156K", "Confirm budget and order timing", "Blue Ocean Foods", "Le Hoa", "¥245K", "Confirm audit corrections"],
        ["Orders This Month", "24", "¥ 12.84M", "2 orders have delivery alignment risks", "Natura Foods", "Chen Ming", "¥362K", "Confirm PE material arrival", "Happy Bean", "Nguyen Thi Lan", "¥196K", "Follow production and delivery"],
        ["Reconciliation / Collection", "19", "¥ 9.86M", "8 items due; 1 seriously overdue", "Pacific Foods Co.", "Chen Ming", "¥286K", "Log commitment and collect", "Freshway Vietnam", "Nguyen Thi Lan", "¥428K", "Confirm this week's reconciliation"],
      ],
      labels: { open: "Open pipeline", result: "Operating results", conversion: "Stage conversion", risk: "Risk", detail: "Click a stage to expand details", customers: "Priority accounts in this stage", owner: "Owner", value: "Value", next: "Current blocker / next step", action: "Recommended action", insight: "Operating signal", periods: [["week", "This week"], ["month", "This month"], ["quarter", "This quarter"], ["year", "This year"]] },
    },
    vi: {
      stages: [
        ["Tạo khách hàng tiềm năng", "42", "¥ 3.26M", "8 hồ sơ cần bổ sung", "Mekong Organics", "Pham Quang", "¥124K", "Bổ sung nhu cầu và người quyết định", "Blue Ocean Foods", "Le Hoa", "¥245K", "Đặt lịch khách đánh giá nhà máy"],
        ["Đã thăm gặp khách", String(28 + extraVisits), "¥ 2.82M", "5 lượt chưa có kết luận", "GreenBite Packaging", "Nguyen Thi Lan", "¥178K", "Xác nhận phản hồi mẫu", "Freshway Vietnam", "Nguyen Thi Lan", "¥428K", "Gửi tiến độ sản xuất"],
        ["Làm mẫu / Báo giá", "15", "¥ 1.72M", "3 báo giá quá 3 ngày chưa theo dõi", "GreenBite Packaging", "Nguyen Thi Lan", "¥178K", "Gọi lúc 11:00 hôm nay", "Saigon Harvest", "Le Hoa", "¥96K", "Báo giá sau khi xác nhận mẫu"],
        ["Khách hàng xác nhận", "9", "¥ 1.08M", "2 khách chờ duyệt ngân sách", "VietTaste Foods", "Pham Quang", "¥156K", "Xác nhận ngân sách và thời điểm đặt hàng", "Blue Ocean Foods", "Le Hoa", "¥245K", "Xác nhận hồ sơ khắc phục"],
        ["Đơn hàng tháng này", "24", "¥ 12.84M", "2 đơn có rủi ro phối hợp giao hàng", "Natura Foods", "Chen Ming", "¥362K", "Xác nhận PE về hàng", "Happy Bean", "Nguyen Thi Lan", "¥196K", "Theo dõi sản xuất và giao hàng"],
        ["Đối soát / Thu tiền", "19", "¥ 9.86M", "8 khoản chờ thu, 1 khoản quá hạn nặng", "Pacific Foods Co.", "Chen Ming", "¥286K", "Ghi cam kết và thúc thu", "Freshway Vietnam", "Nguyen Thi Lan", "¥428K", "Xác nhận đối soát tuần này"],
      ],
      labels: { open: "Cơ hội đang theo dõi", result: "Kết quả vận hành", conversion: "Chuyển đổi giai đoạn", risk: "Rủi ro", detail: "Nhấn vào giai đoạn để xem chi tiết", customers: "Khách hàng trọng điểm ở giai đoạn này", owner: "Phụ trách", value: "Giá trị", next: "Điểm nghẽn / bước tiếp theo", action: "Đề xuất hành động", insight: "Tín hiệu vận hành", periods: [["week", "Tuần này"], ["month", "Tháng này"], ["quarter", "Quý này"], ["year", "Năm nay"]] },
    },
  }[language];
  const dataByPeriod = {
    week: {
      counts: ["15", String(10 + extraVisits), "6", "4", "5", "4"], amounts: ["¥ 1.08M", "¥ 0.86M", "¥ 0.62M", "¥ 0.48M", "¥ 2.96M", "¥ 2.18M"],
      conversions: ["100%", "67%", "60%", "67%", "38%", "80%"], scales: [100, 76, 57, 43, 88, 65],
      risks: language === "zh" ? ["3 个客户待补全资料", "2 次拜访待补结论", "2 份报价今天需跟进", "1 个客户等待确认", "1 笔订单存在交期风险", "1 笔回款今日到期"] : language === "en" ? ["3 profiles need completion", "2 visits need conclusions", "2 quotes need follow-up today", "1 customer awaits confirmation", "1 order has delivery risk", "1 collection is due today"] : ["3 hồ sơ cần bổ sung", "2 lượt thăm gặp cần kết luận", "2 báo giá cần theo dõi hôm nay", "1 khách chờ xác nhận", "1 đơn có rủi ro giao hàng", "1 khoản thu đến hạn hôm nay"],
      orderName: language === "zh" ? "本周已下订单" : language === "en" ? "Orders This Week" : "Đơn hàng tuần này",
    },
    month: {
      counts: ["42", String(28 + extraVisits), "15", "9", "24", "19"], amounts: ["¥ 3.26M", "¥ 2.82M", "¥ 1.72M", "¥ 1.08M", "¥ 12.84M", "¥ 9.86M"],
      conversions: ["100%", "67%", "54%", "60%", "38%", "77%"], scales: [100, 82, 64, 49, 86, 72],
      risks: language === "zh" ? ["8 个需补全资料", "5 个未录入拜访结论", "3 份报价超过 3 天未跟进", "2 个客户等待内部预算确认", "2 笔订单有交期协同风险", "8 笔待回款，含 1 笔严重逾期"] : language === "en" ? ["8 profiles need completion", "5 visits lack conclusions", "3 quotes open for over 3 days", "2 customers await budget approval", "2 orders have delivery alignment risks", "8 items due; 1 seriously overdue"] : ["8 hồ sơ cần bổ sung", "5 lượt chưa có kết luận", "3 báo giá quá 3 ngày chưa theo dõi", "2 khách chờ duyệt ngân sách", "2 đơn có rủi ro phối hợp giao hàng", "8 khoản chờ thu, 1 khoản quá hạn nặng"],
      orderName: language === "zh" ? "本月已下订单" : language === "en" ? "Orders This Month" : "Đơn hàng tháng này",
    },
    quarter: {
      counts: ["126", "84", "48", "28", "69", "53"], amounts: ["¥ 9.48M", "¥ 7.66M", "¥ 4.38M", "¥ 2.72M", "¥ 34.62M", "¥ 27.14M"],
      conversions: ["100%", "67%", "57%", "58%", "38%", "77%"], scales: [100, 80, 61, 46, 91, 73],
      risks: language === "zh" ? ["17 个客户待完善资料", "9 次拜访未形成结论", "7 份报价超过跟进节点", "4 个客户卡在预算确认", "5 笔订单需要交期协调", "14 笔待回款，2 笔逾期"] : language === "en" ? ["17 profiles need completion", "9 visits have no conclusion", "7 quotes missed follow-up timing", "4 customers are stuck on budget approval", "5 orders need delivery coordination", "14 collections due; 2 overdue"] : ["17 hồ sơ cần hoàn thiện", "9 lượt thăm gặp chưa có kết luận", "7 báo giá quá hạn theo dõi", "4 khách đang chờ duyệt ngân sách", "5 đơn cần phối hợp giao hàng", "14 khoản chờ thu, 2 khoản quá hạn"],
      orderName: language === "zh" ? "本季度已下订单" : language === "en" ? "Orders This Quarter" : "Đơn hàng quý này",
    },
    year: {
      counts: ["486", "330", "196", "114", "218", "173"], amounts: ["¥ 36.84M", "¥ 30.16M", "¥ 18.72M", "¥ 11.26M", "¥ 109.86M", "¥ 84.20M"],
      conversions: ["100%", "68%", "59%", "58%", "38%", "79%"], scales: [100, 81, 63, 47, 90, 75],
      risks: language === "zh" ? ["42 个客户资料需补全", "31 次拜访尚未关闭", "18 份重点报价待推进", "11 个客户等待确认", "12 笔订单有交期协同风险", "36 笔待回款，5 笔严重逾期"] : language === "en" ? ["42 profiles need completion", "31 visits remain open", "18 key quotes need action", "11 customers await confirmation", "12 orders have delivery coordination risks", "36 collections due; 5 seriously overdue"] : ["42 hồ sơ cần bổ sung", "31 lượt thăm gặp chưa đóng", "18 báo giá trọng điểm cần xử lý", "11 khách chờ xác nhận", "12 đơn có rủi ro phối hợp giao hàng", "36 khoản chờ thu, 5 khoản quá hạn nặng"],
      orderName: language === "zh" ? "本年度已下订单" : language === "en" ? "Orders This Year" : "Đơn hàng năm nay",
    },
  }[period];
  return { stages: labels.stages.map(([name, _count, _amount, _risk, ...customers], index) => ({ name: index === 4 ? dataByPeriod.orderName : name, count: dataByPeriod.counts[index], amount: dataByPeriod.amounts[index], risk: dataByPeriod.risks[index], customers: [[customers[0], customers[1], customers[2], customers[3]], [customers[4], customers[5], customers[6], customers[7]]], conversion: dataByPeriod.conversions[index], scale: dataByPeriod.scales[index] })), labels: labels.labels };
}

function OwnerSalesFunnel({ language, savedVisits = [] }) {
  const [period, setPeriod] = useState("month");
  const { stages, labels } = ownerFunnelData(language, savedVisits, period);
  const [selected, setSelected] = useState(0);
  const active = stages[selected];
  return <article className="panel funnel-panel interactive-funnel-panel">
    <div className="funnel-panel-head"><h2>{language === "zh" ? "销售漏斗与转化" : language === "en" ? "Sales Funnel & Conversion" : "Phễu bán hàng & chuyển đổi"}</h2><div className="board-filter funnel-period-filter">{labels.periods.map(([id, label]) => <button className={period === id ? "active" : ""} key={id} onClick={() => { setPeriod(id); setSelected(0); }}>{label}</button>)}</div></div>
    <div className="funnel-legend"><span><i /> {labels.open}</span><span><i /> {labels.result}</span><small>{labels.detail}</small></div>
    <div className="sales-funnel interactive-sales-funnel">{stages.map((stage, index) => <button className={`sales-funnel-stage ${selected === index ? "active" : ""} ${index > 3 ? "result-stage" : ""}`} key={stage.name} onClick={() => setSelected(index)} style={{ "--funnel-scale": `${stage.scale}%` }}><span className={`stage-num n${index % 5}`}>{stage.count}</span><strong>{stage.name}</strong><small>{stage.amount}</small><em>{labels.conversion} {stage.conversion}</em><i /></button>)}</div>
    <section className="funnel-detail">
      <div className="funnel-detail-summary"><p>{labels.insight}</p><h3>{active.name} · {active.count}</h3><span>{active.risk}</span><div><Target size={15} /><strong>{labels.action}</strong><small>{active.customers[0][3]}</small></div></div>
      <div className="funnel-detail-table"><p>{labels.customers}</p><div className="funnel-table-head"><span>{labels.owner}</span><span>{labels.value}</span><span>{labels.next}</span></div>{active.customers.map(([customer, owner, amount, next]) => <div className="funnel-customer-row" key={customer}><strong>{customer}<small>{owner}</small></strong><span>{amount}</span><em>{next}</em></div>)}</div>
    </section>
  </article>;
}

function OwnerSalesDashboard({ language, onNavigate, onAsk, savedVisits = [], onShowRoleFocus }) {
  const s = salesLocale[language];
  const visitCount = 28 + savedVisits.length;
  return <div className="work-page sales-command">
    <PageIntro eyebrow={s.ownerEyebrow} title={s.ownerTitle} copy={s.ownerCopy} actions={<RoleFocusButton language={language} onClick={onShowRoleFocus} />} />
    <section className="metric-strip">
      <MiniMetric label={s.order} value="¥ 12.84M" note={language === "vi" ? "+12.6% so với tháng trước" : language === "en" ? "+12.6% vs. last month" : "较上月同期 +12.6%"} positive />
      <MiniMetric label={s.cash} value="76.8%" note={language === "vi" ? "+3.2% theo đơn hàng lũy kế" : language === "en" ? "+3.2% cumulative orders" : "累计订单口径 +3.2%"} positive />
      <MiniMetric label={s.margin} value="22.4%" note={language === "vi" ? "3 đơn lợi nhuận thấp" : language === "en" ? "3 low-margin orders" : "3 笔低毛利订单"} />
      <MiniMetric label={s.overdue} value="¥ 1.26M" note={language === "vi" ? "8 khoản cần thu" : language === "en" ? "8 collection items" : "8 笔待回款"} />
    </section>
    <OwnerAIHub language={language} savedVisits={savedVisits} />
    <section className="dashboard-grid sales-overview-grid">
      <OwnerSalesFunnel language={language} savedVisits={savedVisits} />
      <article className="panel chart-panel"><PanelHead title={language === "vi" ? "Đơn hàng, thu tiền và cơ cấu công nợ" : language === "en" ? "Orders, Collections & Receivables" : "订单、回款与应收结构"} /><OwnerOrderCollectionView language={language} /></article>
    </section>
    {savedVisits[0] && <section className="team-update-banner owner-update-banner"><span><CheckCircle2 size={19} /></span><div><strong>{language === "vi" ? "Dữ liệu bán hàng vừa đồng bộ" : language === "en" ? "New sales activity synchronized" : "销售动态已同步"}</strong><small>{savedVisits[0].recordedBy} · {savedVisits[0].customer} · {savedVisits[0].amount}</small><p>{language === "vi" ? `AI đã tạo kế hoạch: ${savedVisits[0].followUp}` : language === "en" ? `AI created the next action: ${savedVisits[0].followUp}` : `AI 已生成下一步动作：${savedVisits[0].followUp}`}</p></div></section>}
    <section className="sales-visual-grid sales-performance-grid">
      <OwnerTeamPerformanceBoard language={language} savedVisits={savedVisits} />
      <article className="panel"><PanelHead title={s.keyCustomers} /><div className="table-wrap"><table><thead><tr><th>{s.customer}</th><th>{s.owner}</th><th>{s.next}</th><th>{s.value}</th><th>{s.health}</th></tr></thead><tbody>{keyAccounts.map(([customer, owner, next, amount, health, risk]) => <tr key={customer}><td><strong>{customer}</strong></td><td>{owner}</td><td>{accountText(next, language)}</td><td>{amount}</td><td><Status status={healthText(health, language)} risk={risk === "risk" ? "high" : risk === "watch" ? "medium" : "normal"} /></td></tr>)}</tbody></table></div></article>
    </section>
  </div>;
}

function OwnerPriorityModal({ language, onNavigate, greenBiteRisk, savedVisits = [], onClose }) {
  const [selected, setSelected] = useState(0);
  const items = language === "vi" ? [
    { icon: CircleDollarSign, title: "Thu hồi công nợ quá hạn", account: "Pacific Foods Co. · ¥286K", detail: "Quá hạn 14 ngày, chưa có cam kết thanh toán mới.", owner: "Chen Ming", decision: "Yêu cầu chốt ngày thanh toán trước 17:00 hôm nay", page: "alerts", tone: "danger" },
    { icon: AlertTriangle, title: "Quyết định phương án giao hàng", account: "Natura Foods · ¥362K", detail: "Nguyên liệu PE chưa đến; nguy cơ giao muộn 2 ngày.", owner: "Kinh doanh + Mua hàng", decision: "Xác nhận vật tư thay thế hoặc phương án báo khách", page: "production", tone: "watch" },
    { icon: savedVisits.length ? CheckCircle2 : Clock3, title: "Khóa cơ hội giá trị cao", account: "GreenBite Packaging · ¥178K", detail: greenBiteRisk[0], owner: greenBiteRisk[1], decision: savedVisits.length ? "Kiểm tra gửi mẫu và lịch gọi lại tuần sau" : "Yêu cầu hoàn thành cuộc gọi theo dõi hôm nay", page: "alerts", tone: "growth" },
  ] : language === "en" ? [
    { icon: CircleDollarSign, title: "Recover overdue receivable", account: "Pacific Foods Co. · ¥286K", detail: "14 days overdue; no new payment commitment has been logged.", owner: "Chen Ming", decision: "Require a committed payment date before 17:00 today", page: "alerts", tone: "danger" },
    { icon: AlertTriangle, title: "Decide delivery recovery plan", account: "Natura Foods · ¥362K", detail: "PE material has not arrived; delivery may slip by 2 days.", owner: "Sales + Procurement", decision: "Confirm substitute material or customer communication plan", page: "production", tone: "watch" },
    { icon: savedVisits.length ? CheckCircle2 : Clock3, title: "Secure high-value opportunity", account: "GreenBite Packaging · ¥178K", detail: greenBiteRisk[0], owner: greenBiteRisk[1], decision: savedVisits.length ? "Verify sample dispatch and next week's call" : "Require the follow-up call to be completed today", page: "alerts", tone: "growth" },
  ] : [
    { icon: CircleDollarSign, title: "催收逾期应收", account: "Pacific Foods Co. · ¥286K", detail: "逾期 14 天，尚未录入新的付款承诺。", owner: "陈明", decision: "要求今天 17:00 前锁定客户付款日期", page: "alerts", tone: "danger" },
    { icon: AlertTriangle, title: "决策交期补救方案", account: "Natura Foods · ¥362K", detail: "PE 原料未到，交期可能延误 2 天。", owner: "销售 + 采购", decision: "确认替代原料或客户沟通方案", page: "production", tone: "watch" },
    { icon: savedVisits.length ? CheckCircle2 : Clock3, title: "锁定高价值销售机会", account: "GreenBite Packaging · ¥178K", detail: greenBiteRisk[0], owner: greenBiteRisk[1], decision: savedVisits.length ? "检查寄样完成情况及下周回访安排" : "要求今天完成报价后的电话跟进", page: "alerts", tone: "growth" },
  ];
  const active = items[selected];
  return <div className="owner-priority-modal-backdrop" role="dialog" aria-modal="true" aria-label={language === "zh" ? "老板今日经营重点" : language === "en" ? "Owner's Operating Priorities Today" : "Ưu tiên vận hành hôm nay"} onMouseDown={onClose}>
    <article className="panel owner-priority-panel" onMouseDown={(event) => event.stopPropagation()}>
      <div className="owner-priority-modal-head"><div><p>{language === "zh" ? "EPAC AI · 经营提示" : language === "en" ? "EPAC AI · OPERATING SIGNAL" : "EPAC AI · TÍN HIỆU VẬN HÀNH"}</p><h2>{language === "zh" ? "老板今日经营重点" : language === "en" ? "Owner's Operating Priorities Today" : "Ưu tiên vận hành hôm nay"}</h2></div><button onClick={onClose} aria-label={language === "zh" ? "关闭" : language === "en" ? "Close" : "Đóng"}><X size={17} /></button></div>
      <div className="owner-priority-list">{items.map((item, index) => { const Icon = item.icon; return <button className={`owner-priority-row ${item.tone} ${selected === index ? "active" : ""}`} key={item.title} onClick={() => setSelected(index)}><span><Icon size={16} /></span><div><small>{item.title}</small><strong>{item.account}</strong><p>{item.detail}</p></div><i>{index + 1}</i></button>; })}</div>
      <div className={`owner-priority-decision ${active.tone}`}><span><Target size={15} /></span><div><small>{language === "zh" ? "建议老板推动" : language === "en" ? "Recommended owner action" : "Đề xuất chủ doanh nghiệp thúc đẩy"}</small><strong>{active.decision}</strong><p>{language === "zh" ? `责任人：${active.owner}` : language === "en" ? `Owner: ${active.owner}` : `Phụ trách: ${active.owner}`}</p></div><button onClick={() => { onNavigate(active.page); onClose(); }} aria-label={active.title}><ChevronDown size={16} /></button></div>
    </article>
  </div>;
}

function OwnerKeyAccountActions({ language, onNavigate }) {
  const [showAll, setShowAll] = useState(false);
  const locale = language === "vi"
    ? { title: "Hành động với khách hàng trọng điểm", subtitle: "Tự động ưu tiên theo rủi ro thu tiền, giao hàng và cơ hội tăng trưởng", risk: "Rủi ro", delivery: "Giao hàng", opportunity: "Cơ hội", show: "Xem đủ 10 khách", hide: "Thu gọn về 5 khách", action: "Mở quy trình kinh doanh", owner: "Phụ trách", next: "Việc cần làm", amount: "Giá trị" }
    : language === "en"
      ? { title: "Key Account Operating Actions", subtitle: "Prioritized automatically by collection risk, delivery risk, and growth opportunity", risk: "Collection risk", delivery: "Delivery risk", opportunity: "Growth opportunity", show: "Show all 10 accounts", hide: "Show priority 5 only", action: "Open sales process", owner: "Owner", next: "Next action", amount: "Value" }
      : { title: "重点客户经营动作", subtitle: "按回款风险、交付风险和增长机会自动优先排序", risk: "回款风险", delivery: "交期风险", opportunity: "增长机会", show: "展开全部 10 家", hide: "收起至重点 5 家", action: "进入销售全过程", owner: "负责人", next: "当前动作", amount: "金额" };
  const priorityAccounts = [keyAccounts[2], keyAccounts[1], keyAccounts[0], keyAccounts[4], keyAccounts[7]];
  const accounts = showAll ? keyAccounts : priorityAccounts;
  const typeFor = (customer) => customer === "Pacific Foods Co." ? "risk" : customer === "Natura Foods" ? "delivery" : "opportunity";
  const typeLabel = (type) => locale[type];
  return <article className="panel owner-key-accounts">
    <div className="owner-accounts-head"><div><h2>{locale.title}</h2><p>{locale.subtitle}</p></div><button className="text-button" onClick={() => setShowAll(!showAll)}>{showAll ? locale.hide : locale.show} <ChevronDown size={15} /></button></div>
    <div className="owner-account-grid">{accounts.map(([customer, owner, next, amount, health, risk]) => { const type = typeFor(customer); return <article className={`owner-account-card ${type}`} key={customer}><div><span>{typeLabel(type)}</span><Status status={healthText(health, language)} risk={risk === "risk" ? "high" : risk === "watch" ? "medium" : "normal"} /></div><h3>{customer}</h3><strong>{amount}</strong><dl><div><dt>{locale.owner}</dt><dd>{owner}</dd></div><div><dt>{locale.next}</dt><dd>{accountText(next, language)}</dd></div></dl></article>; })}</div>
    <div className="owner-account-footer"><span>{showAll ? (language === "zh" ? "当前显示全部 10 家重点客户，可按健康度继续下钻。" : language === "en" ? "All 10 key accounts are shown and can be drilled into by health status." : "Đang hiển thị đủ 10 khách hàng trọng điểm, có thể xem sâu theo tình trạng.") : (language === "zh" ? "首页仅保留最需要老板关注的 5 家客户。" : language === "en" ? "The overview keeps only the five accounts most relevant to owner action." : "Trang tổng quan chỉ giữ 5 khách hàng cần chủ doanh nghiệp chú ý nhất.")}</span><button className="text-button" onClick={() => onNavigate("sales")}>{locale.action} <ChevronDown size={15} /></button></div>
  </article>;
}

function OwnerOrderCollectionView({ language }) {
  const [period, setPeriod] = useState("month");
  const locale = {
    zh: {
      periods: [["month", "本月"], ["quarter", "本季度"], ["year", "本年度"]],
      metrics: ["订单额", "累计回款", "待回款", "其中逾期"],
      insight: "经营判断",
      note: "订单增长快于回款。未回款缺口主要集中在交付后对账，Pacific Foods 是最大单一风险。",
      order: "订单",
      cash: "回款",
      receivable: "应收结构",
      overdue: "逾期",
      normal: "未逾期",
    },
    en: {
      periods: [["month", "This Month"], ["quarter", "This Quarter"], ["year", "This Year"]],
      metrics: ["Orders", "Collected", "Uncollected", "Overdue"],
      insight: "Operating signal",
      note: "Orders are growing faster than collections. The gap sits mainly after delivery reconciliation, led by Pacific Foods.",
      order: "Orders",
      cash: "Collections",
      receivable: "Receivables",
      overdue: "Overdue",
      normal: "Not overdue",
    },
    vi: {
      periods: [["month", "Tháng này"], ["quarter", "Quý này"], ["year", "Năm nay"]],
      metrics: ["Đơn hàng", "Đã thu", "Chưa thu", "Quá hạn"],
      insight: "Tín hiệu vận hành",
      note: "Đơn hàng tăng nhanh hơn thu tiền. Khoảng cách tập trung sau đối soát giao hàng, lớn nhất là Pacific Foods.",
      order: "Đơn hàng",
      cash: "Thu tiền",
      receivable: "Cơ cấu công nợ",
      overdue: "Quá hạn",
      normal: "Chưa quá hạn",
    },
  }[language];
  const data = {
    month: { values: ["¥12.84M", "¥9.86M", "¥2.98M", "¥1.26M"], ratio: 76.8, weeks: [["W1", 2.48, 1.76], ["W2", 2.91, 2.26], ["W3", 3.42, 2.68], ["W4", 4.03, 3.16]] },
    quarter: { values: ["¥35.62M", "¥27.48M", "¥8.14M", "¥2.08M"], ratio: 77.1, weeks: [["Jul", 10.84, 8.36], ["Aug", 11.94, 9.11], ["Sep", 12.84, 10.01]] },
    year: { values: ["¥128.60M", "¥101.22M", "¥27.38M", "¥4.82M"], ratio: 78.7, weeks: [["Q1", 26.6, 20.1], ["Q2", 29.8, 23.7], ["Q3", 35.6, 27.5], ["Q4F", 36.6, 29.9]] },
  }[period];
  const highest = Math.max(...data.weeks.flatMap((item) => item.slice(1)));
  return <div className="order-cash-view">
    <div className="board-filter">{locale.periods.map(([id, label]) => <button className={period === id ? "active" : ""} key={id} onClick={() => setPeriod(id)}>{label}</button>)}</div>
    <div className="order-cash-metrics">{data.values.map((value, index) => <div className={index === 3 ? "danger" : ""} key={locale.metrics[index]}><small>{locale.metrics[index]}</small><strong>{value}</strong>{index === 1 && <em>{data.ratio}%</em>}</div>)}</div>
    <div className="order-cash-body">
      <section className="order-cash-trend"><div className="chart-legend"><span><i className="legend-order" />{locale.order}</span><span><i className="legend-cash" />{locale.cash}</span></div><div className="cash-bars">{data.weeks.map(([label, order, cash]) => <div className="cash-bar-group" key={label}><div><i className="trend-order" style={{ height: `${(order / highest) * 100}%` }} /><i className="trend-cash" style={{ height: `${(cash / highest) * 100}%` }} /></div><small>{label}</small></div>)}</div></section>
      <section className="receivable-structure"><p>{locale.receivable}</p><div className="receivable-ring" style={{ "--collection": `${data.ratio * 3.6}deg` }}><strong>{data.ratio}%<small>{locale.cash}</small></strong></div><div className="receivable-key"><span><i className="legend-cash" />{locale.cash}</span><span><i className="legend-order" />{locale.normal}</span><span><i className="legend-overdue" />{locale.overdue}</span></div></section>
    </div>
    <div className="chart-insight"><TrendingUp size={15} /><span><b>{locale.insight}：</b>{locale.note}</span></div>
  </div>;
}

function OwnerTeamPerformanceBoard({ language, savedVisits = [] }) {
  const [period, setPeriod] = useState("month");
  const [selectedId, setSelectedId] = useState("lan");
  const lanExtraVisits = savedVisits.filter((visit) => visit.recordedBy === "Nguyen Thi Lan").length;
  const locale = {
    zh: {
      title: "销售团队绩效与组合评分", periods: [["week", "本周"], ["month", "本月"], ["quarter", "本季度"], ["year", "本年度"]],
      columns: ["销售员", "订单", "回款率", "拜访", "综合分"], detail: "个人实际数据", score: "评分构成与标准", target: "目标达成", collection: "回款推进", conversion: "报价转单", customers: "重点客户 / 风险",
      rules: [["订单与毛利", "35%", "订单额、毛利率、目标完成"], ["回款推进", "25%", "回款率、逾期应收处理"], ["拜访与开发", "20%", "有效拜访、新客户推进"], ["流程与协同", "20%", "CRM 完整度、交付协同"]], unit: "次",
    },
    en: {
      title: "Sales Team Performance & Composite Score", periods: [["week", "This Week"], ["month", "This Month"], ["quarter", "This Quarter"], ["year", "This Year"]],
      columns: ["Sales Rep", "Orders", "Collection", "Visits", "Score"], detail: "Actual performance", score: "Score breakdown & standard", target: "Target attainment", collection: "Collection progress", conversion: "Quote conversion", customers: "Key account / risk",
      rules: [["Orders & margin", "35%", "Order value, margin, target completion"], ["Collection progress", "25%", "Collection rate, overdue resolution"], ["Visits & development", "20%", "Effective visits, new-account progress"], ["Process & collaboration", "20%", "CRM quality, delivery coordination"]], unit: "visits",
    },
    vi: {
      title: "Hiệu quả đội sales & điểm tổng hợp", periods: [["week", "Tuần này"], ["month", "Tháng này"], ["quarter", "Quý này"], ["year", "Năm nay"]],
      columns: ["Nhân viên", "Đơn hàng", "Tỷ lệ thu", "Thăm gặp", "Điểm"], detail: "Dữ liệu thực tế", score: "Cấu phần & tiêu chuẩn điểm", target: "Hoàn thành mục tiêu", collection: "Tiến độ thu tiền", conversion: "Chuyển đổi báo giá", customers: "Khách trọng điểm / rủi ro",
      rules: [["Đơn hàng & lợi nhuận", "35%", "Giá trị đơn, lợi nhuận, hoàn thành mục tiêu"], ["Tiến độ thu tiền", "25%", "Tỷ lệ thu, xử lý quá hạn"], ["Thăm gặp & phát triển", "20%", "Thăm gặp hiệu quả, khách mới"], ["Quy trình & phối hợp", "20%", "Độ đầy đủ CRM, phối hợp giao hàng"]], unit: "lượt",
    },
  }[language];
  const teamByPeriod = {
    week: [
      { id: "lan", name: "Nguyen Thi Lan", color: "#9571b8", orders: "¥428K", collection: "82%", visits: 8 + lanExtraVisits, score: 88, target: "¥428K / ¥500K · 86%", conversion: "3 / 5 · 60%", customer: "GreenBite · 寄样确认", risk: "1 项待跟进", parts: [31, 21, 18, 18] },
      { id: "chen", name: "陈明", color: "#3d80b3", orders: "¥612K", collection: "64%", visits: 6, score: 76, target: "¥612K / ¥600K · 102%", conversion: "2 / 4 · 50%", customer: "Pacific Foods · ¥286K 逾期", risk: "1 项高风险", parts: [34, 13, 14, 15] },
      { id: "pham", name: "Pham Quang", color: "#569785", orders: "¥356K", collection: "91%", visits: 7, score: 82, target: "¥356K / ¥450K · 79%", conversion: "3 / 4 · 75%", customer: "VietTaste · 等客户确认", risk: "正常", parts: [27, 23, 17, 15] },
      { id: "hoa", name: "Le Hoa", color: "#c39152", orders: "¥288K", collection: "74%", visits: 7, score: 75, target: "¥288K / ¥400K · 72%", conversion: "2 / 5 · 40%", customer: "Saigon Harvest · 待报价", risk: "1 项待跟进", parts: [24, 17, 16, 18] },
    ],
    month: [
      { id: "lan", name: "Nguyen Thi Lan", color: "#9571b8", orders: "¥2.84M", collection: "84%", visits: 15 + lanExtraVisits, score: 87, target: "¥2.84M / ¥3.00M · 95%", conversion: "8 / 12 · 67%", customer: "Freshway Vietnam · 对账中", risk: "1 项待跟进", parts: [31, 21, 18, 17] },
      { id: "chen", name: "陈明", color: "#3d80b3", orders: "¥3.65M", collection: "69%", visits: 12, score: 81, target: "¥3.65M / ¥3.20M · 114%", conversion: "7 / 11 · 64%", customer: "Pacific Foods · ¥286K 逾期", risk: "1 项高风险", parts: [35, 14, 15, 17] },
      { id: "pham", name: "Pham Quang", color: "#569785", orders: "¥3.12M", collection: "88%", visits: 14, score: 79, target: "¥3.12M / ¥3.40M · 92%", conversion: "6 / 10 · 60%", customer: "VietTaste · 客户确认", risk: "正常", parts: [30, 22, 14, 13] },
      { id: "hoa", name: "Le Hoa", color: "#c39152", orders: "¥2.21M", collection: "76%", visits: 11, score: 73, target: "¥2.21M / ¥2.80M · 79%", conversion: "4 / 9 · 44%", customer: "Saigon Harvest · 待报价", risk: "2 项待跟进", parts: [26, 18, 14, 15] },
    ],
    quarter: [
      { id: "lan", name: "Nguyen Thi Lan", color: "#9571b8", orders: "¥8.21M", collection: "85%", visits: 42 + lanExtraVisits, score: 89, target: "¥8.21M / ¥8.60M · 95%", conversion: "19 / 29 · 66%", customer: "Freshway Vietnam · 正常", risk: "正常", parts: [32, 22, 19, 16] },
      { id: "chen", name: "陈明", color: "#3d80b3", orders: "¥9.84M", collection: "73%", visits: 35, score: 82, target: "¥9.84M / ¥9.10M · 108%", conversion: "18 / 30 · 60%", customer: "Pacific Foods · 回款风险", risk: "1 项高风险", parts: [35, 15, 16, 16] },
      { id: "pham", name: "Pham Quang", color: "#569785", orders: "¥8.70M", collection: "89%", visits: 39, score: 84, target: "¥8.70M / ¥9.00M · 97%", conversion: "17 / 26 · 65%", customer: "VietTaste · 正常", risk: "正常", parts: [31, 23, 16, 14] },
      { id: "hoa", name: "Le Hoa", color: "#c39152", orders: "¥6.24M", collection: "79%", visits: 32, score: 76, target: "¥6.24M / ¥7.20M · 87%", conversion: "11 / 24 · 46%", customer: "Saigon Harvest · 待推进", risk: "2 项待跟进", parts: [29, 19, 13, 15] },
    ],
    year: [
      { id: "lan", name: "Nguyen Thi Lan", color: "#9571b8", orders: "¥28.40M", collection: "87%", visits: 148 + lanExtraVisits, score: 90, target: "¥28.40M / ¥30.00M · 95%", conversion: "65 / 96 · 68%", customer: "Freshway Vietnam · 正常", risk: "正常", parts: [33, 23, 19, 15] },
      { id: "chen", name: "陈明", color: "#3d80b3", orders: "¥35.86M", collection: "76%", visits: 128, score: 84, target: "¥35.86M / ¥32.00M · 112%", conversion: "61 / 102 · 60%", customer: "Pacific Foods · 回款风险", risk: "1 项高风险", parts: [35, 17, 16, 16] },
      { id: "pham", name: "Pham Quang", color: "#569785", orders: "¥31.76M", collection: "90%", visits: 139, score: 86, target: "¥31.76M / ¥32.00M · 99%", conversion: "59 / 89 · 66%", customer: "VietTaste · 正常", risk: "正常", parts: [32, 23, 17, 14] },
      { id: "hoa", name: "Le Hoa", color: "#c39152", orders: "¥23.15M", collection: "81%", visits: 116, score: 79, target: "¥23.15M / ¥27.00M · 86%", conversion: "43 / 91 · 47%", customer: "Saigon Harvest · 待推进", risk: "2 项待跟进", parts: [30, 20, 14, 15] },
    ],
  };
  const team = teamByPeriod[period];
  const active = team.find((member) => member.id === selectedId) || team[0];
  return <article className="panel team-performance-panel">
    <div className="team-performance-head"><PanelHead title={locale.title} /><div className="board-filter">{locale.periods.map(([id, label]) => <button className={period === id ? "active" : ""} key={id} onClick={() => setPeriod(id)}>{label}</button>)}</div></div>
    <div className="team-performance-table"><div className="team-performance-columns"><span>{locale.columns[0]}</span><span>{locale.columns[1]}</span><span>{locale.columns[2]}</span><span>{locale.columns[3]}</span><span>{locale.columns[4]}</span></div>{team.map((member) => <button className={`team-performance-row ${active.id === member.id ? "active" : ""}`} key={member.id} onClick={() => setSelectedId(member.id)}><span><i style={{ background: member.color }}>{member.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</i><strong>{member.name}</strong></span><b>{member.orders}</b><b>{member.collection}</b><b>{member.visits}</b><em style={{ "--score-color": member.color }}>{member.score}</em></button>)}</div>
    <section className="rep-performance-detail"><div className="rep-detail-top"><span className="avatar" style={{ background: active.color }}>{active.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span><div><p>{locale.detail}</p><h3>{active.name} <b>{active.score}</b></h3></div><small>{active.risk}</small></div><div className="rep-actual-metrics"><div><small>{locale.target}</small><strong>{active.target}</strong></div><div><small>{locale.collection}</small><strong>{active.collection}</strong></div><div><small>{locale.conversion}</small><strong>{active.conversion}</strong></div><div><small>{locale.customers}</small><strong>{active.customer}</strong></div></div><div className="score-standard"><p>{locale.score}</p>{locale.rules.map(([name, weight, rule], index) => <div key={name}><span><strong>{name} <b>{active.parts[index]} / {Number(weight.replace("%", ""))}</b></strong><small>{weight} · {rule}</small></span><i><em style={{ width: `${(active.parts[index] / Number(weight.replace("%", ""))) * 100}%`, background: active.color }} /></i></div>)}</div></section>
  </article>;
}

function ownerInsights(language, savedVisits) {
  const greenBiteDone = savedVisits.length > 0;
  const data = {
    zh: [
      { question: "本周哪些重点客户没有及时跟进？", title: "重点客户跟进健康度", headline: greenBiteDone ? "仍有 2 家重点客户需要当天推进" : "有 3 家重点客户超过正常跟进节奏", detail: greenBiteDone ? "GreenBite 已完成拜访并进入寄样节奏；Saigon Harvest 与 Pacific Foods 仍需优先处理。" : "GreenBite、Saigon Harvest 和 Pacific Foods 的下一步动作均已超出提醒节点。", action: "今天由销售负责人检查 GreenBite 寄样，并要求更新 Saigon Harvest 反馈和 Pacific Foods 付款承诺。", type: "follow", rows: [["Pacific Foods", 92, "回款逾期 14 天", "#cf6950"], ["Saigon Harvest", 76, "样品已签收，未报价", "#cf9b52"], ["GreenBite", greenBiteDone ? 34 : 68, greenBiteDone ? "已拜访，待寄样" : "报价 4 天未跟进", "#609784"]] },
      { question: "哪个销售员回款推进较弱？", title: "销售员回款推进对比", headline: "陈明的回款推进最需要管理层介入", detail: "陈明负责的 Pacific Foods 有 ¥286,000 逾期 14 天，尚未录入新的付款承诺。", action: "要求陈明今天联系客户，并在下班前补录付款承诺日和催收计划。", type: "collection", rows: [["陈明", 286, "逾期应收", "#cf6950"], ["Le Hoa", 158, "待确认回款", "#cf9b52"], ["Nguyen Thi Lan", 86, "正常跟进", "#609784"], ["Pham Quang", 42, "正常", "#6595ae"]] },
      { question: "本月订单和回款差距在哪里？", title: "订单与回款差距分析", headline: "订单额 ¥12.84M，累计未回款缺口 ¥2.98M", detail: "主要缺口集中在交付后对账与回款两个阶段，Pacific Foods 是最大单一风险。", action: "将逾期 ¥1.26M 单列成每周催收清单，先锁定客户承诺付款日期。", type: "gap", rows: [["已回款", 76.8, "¥9.86M", "#4e9880"], ["待回款", 23.2, "¥2.98M", "#d58a5d"], ["其中逾期", 9.8, "¥1.26M", "#cf6950"]] },
      { question: "哪些报价最可能转成订单？", title: "重点报价转单机会", headline: "GreenBite 与 Saigon Harvest 是最值得立即推进的两笔机会", detail: "两笔预计机会合计 ¥274,000，均已进入样品或报价后的关键确认阶段。", action: "本周优先完成 GreenBite 寄样和 Saigon Harvest 报价，负责人每日更新客户反馈。", type: "opportunity", rows: [["GreenBite", 86, "¥178K · 寄样后确认", "#5d9c86"], ["Saigon Harvest", 74, "¥96K · 样品后报价", "#6595ae"], ["Blue Ocean", 63, "¥245K · 客户验厂", "#9b7bb4"], ["VietTaste", 58, "¥156K · 等待样品反馈", "#c79458"]] },
      { question: "下周销售团队应该优先做什么？", title: "下周销售管理优先级", headline: "先抓回款，再锁重点机会，最后消化交付风险", detail: "当前经营影响最大的是逾期回款，其次是未闭环的重点客户机会和 Natura Foods 交期风险。", action: "周一晨会按“回款、重点客户、交付”三条线逐项指定负责人和完成时间。", type: "priority", rows: [["回款催收", 95, "Pacific Foods · ¥286K", "#cf6950"], ["重点机会", 82, "GreenBite / Saigon Harvest", "#cf9b52"], ["交期协同", 71, "Natura Foods · 原料风险", "#6595ae"], ["拜访复盘", 54, "团队拜访质量", "#609784"]] },
    ],
    en: [
      { question: "Which key accounts need follow-up this week?", title: "Key Account Follow-up Health", headline: greenBiteDone ? "Two key accounts still need action today" : "Three key accounts are beyond their follow-up rhythm", detail: greenBiteDone ? "GreenBite is now on a sample-dispatch plan; Saigon Harvest and Pacific Foods remain priority actions." : "GreenBite, Saigon Harvest, and Pacific Foods are past their next-action reminder.", action: "Have the sales lead verify GreenBite samples, Saigon Harvest feedback, and Pacific Foods' payment commitment today.", type: "follow", rows: [["Pacific Foods", 92, "14 days overdue", "#cf6950"], ["Saigon Harvest", 76, "Sample received; no quote", "#cf9b52"], ["GreenBite", greenBiteDone ? 34 : 68, greenBiteDone ? "Visited; sample pending" : "Quote open for 4 days", "#609784"]] },
      { question: "Which sales rep is weakest on collections?", title: "Collection Progress by Sales Rep", headline: "Chen Ming needs the strongest management intervention", detail: "Pacific Foods has ¥286,000 overdue for 14 days with no new payment commitment.", action: "Require Chen Ming to call today and log a payment date plus collection plan before day end.", type: "collection", rows: [["Chen Ming", 286, "Overdue receivables", "#cf6950"], ["Le Hoa", 158, "Collection to confirm", "#cf9b52"], ["Nguyen Thi Lan", 86, "On track", "#609784"], ["Pham Quang", 42, "On track", "#6595ae"]] },
      { question: "Where is the order-to-collection gap this month?", title: "Order and Collection Gap", headline: "Orders are ¥12.84M; the unpaid gap is ¥2.98M", detail: "The gap concentrates in post-delivery reconciliation and collection, led by Pacific Foods.", action: "Put ¥1.26M overdue receivables on a weekly collection list with committed payment dates.", type: "gap", rows: [["Collected", 76.8, "¥9.86M", "#4e9880"], ["Uncollected", 23.2, "¥2.98M", "#d58a5d"], ["Overdue", 9.8, "¥1.26M", "#cf6950"]] },
      { question: "Which quotes are most likely to convert?", title: "Priority Quote Conversion", headline: "GreenBite and Saigon Harvest are the two most actionable opportunities", detail: "Their combined expected value is ¥274,000 and both are at a decision point after samples or quotes.", action: "Complete GreenBite sample dispatch and Saigon Harvest quotation this week, with daily feedback updates.", type: "opportunity", rows: [["GreenBite", 86, "¥178K · Sample confirmation", "#5d9c86"], ["Saigon Harvest", 74, "¥96K · Quote after sample", "#6595ae"], ["Blue Ocean", 63, "¥245K · Customer audit", "#9b7bb4"], ["VietTaste", 58, "¥156K · Sample feedback", "#c79458"]] },
      { question: "What should the sales team prioritize next week?", title: "Next Week Sales Priorities", headline: "Collections first, key opportunities second, delivery risks third", detail: "Overdue collections create the largest impact, followed by incomplete key-account opportunities and the Natura Foods delivery risk.", action: "Assign owners and deadlines across collection, key accounts, and delivery in Monday's meeting.", type: "priority", rows: [["Collections", 95, "Pacific Foods · ¥286K", "#cf6950"], ["Key opportunities", 82, "GreenBite / Saigon Harvest", "#cf9b52"], ["Delivery alignment", 71, "Natura Foods · material risk", "#6595ae"], ["Visit review", 54, "Team visit quality", "#609784"]] },
    ],
    vi: [
      { question: "Khách hàng trọng điểm nào chưa được theo dõi kịp thời?", title: "Tình trạng theo dõi khách hàng trọng điểm", headline: greenBiteDone ? "Còn 2 khách hàng trọng điểm cần xử lý hôm nay" : "Có 3 khách hàng trọng điểm đã vượt nhịp theo dõi", detail: greenBiteDone ? "GreenBite đã vào kế hoạch gửi mẫu; Saigon Harvest và Pacific Foods vẫn cần ưu tiên." : "GreenBite, Saigon Harvest và Pacific Foods đã quá mốc nhắc việc tiếp theo.", action: "Trưởng nhóm kiểm tra gửi mẫu GreenBite, phản hồi Saigon Harvest và cam kết thanh toán Pacific Foods hôm nay.", type: "follow", rows: [["Pacific Foods", 92, "Quá hạn 14 ngày", "#cf6950"], ["Saigon Harvest", 76, "Đã nhận mẫu, chưa báo giá", "#cf9b52"], ["GreenBite", greenBiteDone ? 34 : 68, greenBiteDone ? "Đã gặp, chờ gửi mẫu" : "Báo giá 4 ngày", "#609784"]] },
      { question: "Nhân viên nào yếu nhất về thu tiền?", title: "So sánh tiến độ thu tiền", headline: "Chen Ming cần được quản lý hỗ trợ ngay", detail: "Pacific Foods quá hạn ¥286,000 trong 14 ngày nhưng chưa có cam kết thanh toán mới.", action: "Yêu cầu Chen Ming gọi khách hôm nay và ghi kế hoạch thu tiền trước cuối ngày.", type: "collection", rows: [["Chen Ming", 286, "Công nợ quá hạn", "#cf6950"], ["Le Hoa", 158, "Chờ xác nhận", "#cf9b52"], ["Nguyen Thi Lan", 86, "Đúng kế hoạch", "#609784"], ["Pham Quang", 42, "Đúng kế hoạch", "#6595ae"]] },
      { question: "Khoảng cách đơn hàng và thu tiền tháng này ở đâu?", title: "Phân tích chênh lệch đơn hàng và thu tiền", headline: "Đơn hàng ¥12.84M, phần chưa thu là ¥2.98M", detail: "Chênh lệch tập trung ở đối soát và thu tiền sau giao hàng, lớn nhất là Pacific Foods.", action: "Đưa ¥1.26M công nợ quá hạn vào danh sách thu tiền hàng tuần với ngày cam kết.", type: "gap", rows: [["Đã thu", 76.8, "¥9.86M", "#4e9880"], ["Chưa thu", 23.2, "¥2.98M", "#d58a5d"], ["Quá hạn", 9.8, "¥1.26M", "#cf6950"]] },
      { question: "Báo giá nào có khả năng thành đơn cao nhất?", title: "Cơ hội báo giá ưu tiên", headline: "GreenBite và Saigon Harvest là hai cơ hội cần đẩy ngay", detail: "Tổng giá trị dự kiến là ¥274,000 và đều đang ở thời điểm quyết định sau mẫu hoặc báo giá.", action: "Hoàn thành gửi mẫu GreenBite và báo giá Saigon Harvest trong tuần này.", type: "opportunity", rows: [["GreenBite", 86, "¥178K · Xác nhận mẫu", "#5d9c86"], ["Saigon Harvest", 74, "¥96K · Báo giá sau mẫu", "#6595ae"], ["Blue Ocean", 63, "¥245K · Đánh giá nhà máy", "#9b7bb4"], ["VietTaste", 58, "¥156K · Phản hồi mẫu", "#c79458"]] },
      { question: "Tuần sau đội kinh doanh cần ưu tiên việc gì?", title: "Ưu tiên quản lý kinh doanh tuần sau", headline: "Thu tiền trước, cơ hội trọng điểm sau, rồi đến rủi ro giao hàng", detail: "Công nợ quá hạn ảnh hưởng lớn nhất, sau đó là cơ hội trọng điểm chưa khép kín và rủi ro Natura Foods.", action: "Họp sáng thứ Hai, chỉ định người phụ trách và hạn xử lý cho ba nhóm việc.", type: "priority", rows: [["Thu tiền", 95, "Pacific Foods · ¥286K", "#cf6950"], ["Cơ hội trọng điểm", 82, "GreenBite / Saigon Harvest", "#cf9b52"], ["Phối hợp giao hàng", 71, "Natura Foods · rủi ro vật tư", "#6595ae"], ["Rà soát thăm gặp", 54, "Chất lượng thăm gặp", "#609784"]] },
    ],
  };
  return data[language];
}

function OwnerAIVisual({ active, labels }) {
  const [first, second, third, fourth] = active.rows;
  if (active.type === "follow") return <section className="owner-ai-visual owner-visual-follow">
    <div className="owner-visual-head"><strong>{active.title}</strong><small>{labels.risk}</small></div>
    <div className="owner-follow-list">{active.rows.map(([name, score, note, color], index) => <article key={name}><i style={{ background: color }} /><div><strong>{name}</strong><small>{note}</small></div><span className={index === 0 ? "high" : index === 1 ? "medium" : ""}>{score}</span></article>)}</div>
  </section>;
  if (active.type === "collection") {
    const total = active.rows.reduce((sum, [, value]) => sum + value, 0);
    return <section className="owner-ai-visual owner-visual-collection">
      <div className="owner-visual-head"><strong>{active.title}</strong><small>{labels.risk}</small></div>
      <div className="owner-collection-layout"><div className="owner-collection-ring" style={{ background: `conic-gradient(${first[3]} 0 50%, ${second[3]} 50% 78%, ${third[3]} 78% 93%, ${fourth[3]} 93% 100%)` }}><div><strong>¥{total}K</strong><small>{labels.visual}</small></div></div><div className="owner-collection-key">{active.rows.map(([name, value, note, color]) => <article key={name}><i style={{ background: color }} /><span>{name}<small>{note}</small></span><b>¥{value}K</b></article>)}</div></div>
    </section>;
  }
  if (active.type === "gap") return <section className="owner-ai-visual owner-visual-gap">
    <div className="owner-visual-head"><strong>{active.title}</strong><small>{labels.risk}</small></div>
    <div className="owner-gap-total"><strong>¥12.84M</strong><span>{active.rows[0][2]}</span></div>
    <div className="owner-gap-stack">{active.rows.map(([name, value, note, color]) => <article key={name} style={{ width: `${value}%`, background: color }}><span>{name}</span><b>{value}%</b></article>)}</div>
    <div className="owner-gap-notes">{active.rows.map(([name, value, note, color]) => <span key={name}><i style={{ background: color }} />{note}</span>)}</div>
  </section>;
  return <section className="owner-ai-visual owner-visual-opportunity">
    <div className="owner-visual-head"><strong>{active.title}</strong><small>{labels.risk}</small></div>
    <div className="owner-opportunity-funnel">{active.rows.map(([name, value, note, color], index) => <article key={name} style={{ width: `${100 - index * 12}%`, borderLeftColor: color }}><div><strong>{name}</strong><small>{note}</small></div><b>{value}<small>%</small></b></article>)}</div>
  </section>;
}

function OwnerAIHub({ language, savedVisits = [] }) {
  const insights = ownerInsights(language, savedVisits).slice(0, 4);
  const [selected, setSelected] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [listening, setListening] = useState(false);
  const active = insights[selected];
  const labels = language === "vi"
    ? { eyebrow: "EPAC AI · TRỢ LÝ ĐIỀU HÀNH", title: "Trợ lý thông minh", placeholder: "Ví dụ: khách hàng trọng điểm nào chưa được theo dõi kịp thời?", ask: "Phân tích", listening: "Đang nghe tiếng Việt...", voice: "Nhập bằng giọng nói", conclusion: "Kết luận quản trị", recommendation: "Đề xuất hành động", visual: "Phân tích trực quan", risk: "Mức cần ưu tiên" }
    : language === "en"
      ? { eyebrow: "EPAC AI · EXECUTIVE ASSISTANT", title: "Intelligent Assistant", placeholder: "Example: Which key customers were not followed up in time this week?", ask: "Analyze", listening: "Listening to your question...", voice: "Voice input", conclusion: "Management conclusion", recommendation: "Recommended action", visual: "Visual analysis", risk: "Priority level" }
      : { eyebrow: "EPAC AI · 经营智能问答", title: "智能助手", placeholder: "例如：本周哪些重点客户没有及时跟进？", ask: "立即分析", listening: "正在聆听你的问题...", voice: "语音输入", conclusion: "管理结论", recommendation: "建议动作", visual: "可视化分析", risk: "优先级" };
  const submit = () => {
    const query = prompt.toLowerCase();
    if (!query) return;
    const index = query.includes("回款") || query.includes("收款") || query.includes("collection") || query.includes("thu tiền") ? 1
      : query.includes("差距") || query.includes("gap") || query.includes("chênh") ? 2
        : query.includes("报价") || query.includes("机会") || query.includes("quote") || query.includes("báo giá") ? 3 : 0;
    setSelected(index);
  };
  const simulateVoiceInput = () => {
    if (listening) return;
    setListening(true);
    window.setTimeout(() => {
      const voiceQuestion = insights[3].question;
      setPrompt(voiceQuestion);
      setSelected(3);
      setListening(false);
    }, 1150);
  };
  return <section className="owner-ai-hub">
    <div className="owner-ai-intro"><span className="owner-ai-icon"><Sparkles size={22} /></span><div><p>{labels.eyebrow}</p><h2>{labels.title}</h2></div></div>
    <div className={`owner-ai-input ${listening ? "is-listening" : ""}`}><Search size={19} /><input value={listening ? labels.listening : prompt} onChange={(event) => setPrompt(event.target.value)} onKeyDown={(event) => event.key === "Enter" && submit()} placeholder={labels.placeholder} readOnly={listening} /><button className="voice-input-button" onClick={simulateVoiceInput} title={labels.voice} aria-label={labels.voice}><Mic size={18} /></button><button onClick={submit}><Sparkles size={16} /> {labels.ask}</button></div>
    <div className="owner-ai-questions">{insights.map((item, index) => <button className={selected === index ? "active" : ""} key={item.question} onClick={() => { setSelected(index); setPrompt(item.question); }}><span>{index + 1}</span>{item.question}</button>)}</div>
    <div className="owner-ai-result">
      <section className="owner-ai-copy"><p>{labels.conclusion}</p><h3>{active.headline}</h3><span>{active.detail}</span><div><strong><Target size={16} /> {labels.recommendation}</strong><p>{active.action}</p></div></section>
      <OwnerAIVisual active={active} labels={labels} />
    </div>
  </section>;
}

function SalesLeadDashboard({ language, onNavigate, savedVisits = [], onShowRoleFocus }) {
  const s = salesLocale[language];
  const [period, setPeriod] = useState("week");
  const periodLabels = language === "vi" ? [["week", "Tuần này"], ["month", "Tháng này"], ["quarter", "Quý này"], ["year", "Năm nay"]]
    : language === "en" ? [["week", "This Week"], ["month", "This Month"], ["quarter", "This Quarter"], ["year", "This Year"]]
      : [["week", "本周"], ["month", "本月"], ["quarter", "本季度"], ["year", "本年度"]];
  const periodData = {
    week: { orders: "¥ 1.68M", orderNote: "+9.4%", visits: 28, visitTarget: 34, conversion: "38.1%", overdue: "¥ 1.26M", overdueNote: ["8 笔待回款", "8 items to collect", "8 khoản cần thu"], onSite: 12, factory: 5, exhibition: 4, online: 7, progress: [["Nguyen Thi Lan", 8, 9, "#6c9d8d"], ["陈明", 6, 8, "#3d80b3"], ["Pham Quang", 7, 8, "#5a9886"], ["Le Hoa", 7, 9, "#c39152"]] },
    month: { orders: "¥ 12.84M", orderNote: "+12.6%", visits: 108, visitTarget: 126, conversion: "41.7%", overdue: "¥ 2.98M", overdueNote: ["19 笔待回款", "19 items to collect", "19 khoản cần thu"], onSite: 48, factory: 19, exhibition: 14, online: 27, progress: [["Nguyen Thi Lan", 15, 18, "#6c9d8d"], ["陈明", 12, 16, "#3d80b3"], ["Pham Quang", 14, 17, "#5a9886"], ["Le Hoa", 11, 16, "#c39152"]] },
    quarter: { orders: "¥ 35.62M", orderNote: "+10.8%", visits: 327, visitTarget: 378, conversion: "43.6%", overdue: "¥ 8.14M", overdueNote: ["36 笔待回款", "36 items to collect", "36 khoản cần thu"], onSite: 144, factory: 56, exhibition: 39, online: 88, progress: [["Nguyen Thi Lan", 42, 48, "#6c9d8d"], ["陈明", 35, 43, "#3d80b3"], ["Pham Quang", 39, 46, "#5a9886"], ["Le Hoa", 32, 42, "#c39152"]] },
    year: { orders: "¥ 128.60M", orderNote: "+16.2%", visits: 1214, visitTarget: 1440, conversion: "46.8%", overdue: "¥ 27.38M", overdueNote: ["112 笔待回款", "112 items to collect", "112 khoản cần thu"], onSite: 536, factory: 211, exhibition: 149, online: 318, progress: [["Nguyen Thi Lan", 148, 174, "#6c9d8d"], ["陈明", 128, 164, "#3d80b3"], ["Pham Quang", 139, 169, "#5a9886"], ["Le Hoa", 116, 152, "#c39152"]] },
  }[period];
  const coaching = salesLeadCoaching(period, language);
  const visitCount = periodData.visits + savedVisits.length;
  const onSiteCount = periodData.onSite + savedVisits.filter((visit) => visit.visitType === "onSite").length;
  const latestVisit = savedVisits[0];
  const latestVisitCopy = latestVisit && (language === "vi"
    ? { title: "Cập nhật mới nhất của đội ngũ", meta: `${latestVisit.recordedBy} · Thăm gặp trực tiếp · ${latestVisit.amount}`, detail: `${latestVisit.customer}: ${latestVisit.followUp}` }
    : language === "en"
      ? { title: "Latest Team Update", meta: `${latestVisit.recordedBy} · On-site visit · ${latestVisit.amount}`, detail: `${latestVisit.customer}: ${latestVisit.followUp}` }
      : { title: "团队最新动态", meta: `${latestVisit.recordedBy} · 上门拜访 · ${latestVisit.amount}`, detail: `${latestVisit.customer}：周五前寄样，下周电话跟进` });
  return <div className="work-page sales-lead-board">
    <PageIntro eyebrow={s.leadEyebrow} title={s.leadTitle} copy={s.leadCopy} actions={<><RoleFocusButton language={language} onClick={onShowRoleFocus} /><button className="primary-button" onClick={() => onNavigate("sales")}>{s.viewSales}</button></>} />
    <div className="dashboard-period-bar"><span>{language === "zh" ? "查看团队执行周期" : language === "en" ? "Team performance period" : "Kỳ theo dõi đội sales"}</span><div className="board-filter">{periodLabels.map(([id, label]) => <button className={period === id ? "active" : ""} key={id} onClick={() => setPeriod(id)}>{label}</button>)}</div></div>
    <section className="metric-strip"><MiniMetric label={s.order} value={periodData.orders} note={periodData.orderNote} positive /><MiniMetric label={s.visits} value={`${visitCount} / ${periodData.visitTarget}`} note={language === "vi" ? `Còn ${periodData.visitTarget - visitCount} lượt cần hoàn thành` : language === "en" ? `${periodData.visitTarget - visitCount} visits still due` : `${periodData.visitTarget - visitCount} 次待完成`} /><MiniMetric label={s.conversion} value={periodData.conversion} note={language === "vi" ? "Từ mẫu đến đơn hàng" : language === "en" ? "Sample to order" : "打样转订单"} /><MiniMetric label={s.overdue} value={periodData.overdue} note={periodData.overdueNote[language === "zh" ? 0 : language === "en" ? 1 : 2]} /></section>
    <RoleAIHub language={language} role={roles.find((item) => item.id === "salesLead")} />
    {latestVisitCopy && <section className="team-update-banner"><span><CheckCircle2 size={19} /></span><div><strong>{latestVisitCopy.title}</strong><small>{latestVisitCopy.meta}</small><p>{latestVisitCopy.detail}</p></div><button onClick={() => onNavigate("sales")} aria-label={s.viewSales}><ChevronDown size={18} /></button></section>}
    <section className="dashboard-grid sales-overview-grid">
      <article className="panel"><PanelHead title={s.visits} /><div className="visit-progress">{periodData.progress.map(([name, done, target, color]) => <Progress key={name} name={name} done={`${done + (name === "Nguyen Thi Lan" ? savedVisits.filter((visit) => visit.recordedBy === "Nguyen Thi Lan").length : 0)}/${target}`} value={Math.min(100, Math.round(((done + (name === "Nguyen Thi Lan" ? savedVisits.filter((visit) => visit.recordedBy === "Nguyen Thi Lan").length : 0)) / target) * 100))} color={color} language={language} />)}</div><div className="visit-type-strip"><span><MapPin size={15} /> {language === "vi" ? `Đến thăm ${onSiteCount}` : language === "en" ? `On-site ${onSiteCount}` : `上门 ${onSiteCount}`}</span><span><UsersRound size={15} /> {language === "vi" ? `Khách đến xưởng ${periodData.factory}` : language === "en" ? `Factory visit ${periodData.factory}` : `客户来厂 ${periodData.factory}`}</span><span><BriefcaseBusiness size={15} /> {language === "vi" ? `Triển lãm ${periodData.exhibition}` : language === "en" ? `Exhibition ${periodData.exhibition}` : `展会 ${periodData.exhibition}`}</span><span><MessageSquareText size={15} /> {language === "vi" ? `Trực tuyến ${periodData.online}` : language === "en" ? `Online ${periodData.online}` : `线上 ${periodData.online}`}</span></div></article>
      <article className="panel"><PanelHead title={s.coaching} /><div className="coach-list">{coaching.map(([Icon, title, detail, action]) => <SalesRisk key={`${period}-${title}`} language={language} icon={Icon} title={title} detail={detail} action={action} />)}</div></article>
    </section>
    <section className="panel"><PanelHead title={s.keyCustomers} action={s.viewSales} onClick={() => onNavigate("sales")} /><div className="table-wrap"><table><thead><tr><th>{s.customer}</th><th>{s.stage}</th><th>{s.owner}</th><th>{s.next}</th><th>{s.health}</th></tr></thead><tbody>{keyAccounts.slice(0, 6).map(([customer, owner, next, amount, health, risk]) => <tr key={customer}><td><strong>{customer}</strong><small>{amount}</small></td><td>{accountText(next, language)}</td><td>{owner}</td><td>{accountText(next, language)}</td><td><Status status={healthText(health, language)} risk={risk === "risk" ? "high" : risk === "watch" ? "medium" : "normal"} /></td></tr>)}</tbody></table></div></section>
  </div>;
}

function SalesRisk({ icon: Icon, title, detail, action }) {
  return <article className="sales-risk">
    <span><Icon size={16} /></span>
    <div><strong>{title}</strong><p>{detail}</p></div>
    <em>{action}</em>
  </article>;
}

function salesLeadCoaching(period, language) {
  const content = {
    zh: {
      week: [[Clock3, "Le Hoa", "报价 9 份，但仅 1 份进入下订阶段；建议本周陪访 1 次。", "报价转化"], [CircleDollarSign, "陈明", "Pacific Foods 已逾期 14 天，尚未更新客户付款承诺。", "回款跟进"], [AlertTriangle, "Nguyen Thi Lan", "GreenBite 报价已超过 3 天未跟进，需今天完成电话记录。", "重点机会"]],
      month: [[Target, "Le Hoa", "本月样品转订单率 26%，低于团队均值 41.7%；安排两次重点客户复盘。", "转化辅导"], [CircleDollarSign, "陈明", "本月逾期应收 ¥0.82M，占个人应收 31%；需提交分客户催收计划。", "回款计划"], [UsersRound, "Pham Quang", "重点客户拜访完成 14/17，3 家客户尚未形成下一步时间表。", "拜访覆盖"]],
      quarter: [[Target, "Nguyen Thi Lan", "季度大客户机会 ¥4.2M，验厂后有 2 家尚未推进打样。", "大客户推进"], [CircleDollarSign, "陈明", "季度回款率 72%，低于团队 77.1%；应优先清理历史应收。", "回款改善"], [AlertTriangle, "Le Hoa", "Natura Foods 因交期风险可能影响复购，需要销售主动沟通。", "交期沟通"]],
      year: [[Target, "销售团队", "年度订单目标已完成 86%，仍有 ¥21.40M 缺口，需要锁定 8 家重点客户。", "年度冲刺"], [CircleDollarSign, "陈明", "年度逾期应收占团队 24%，建议由负责人每周复盘回款承诺。", "回款治理"], [UsersRound, "Le Hoa", "年度拜访完成率 76%，客户覆盖不足，需制定下季度陪访计划。", "能力提升"]],
    },
    en: {
      week: [[Clock3, "Le Hoa", "Has 9 quotes but only 1 reached the order stage; schedule one joint visit this week.", "Quote conversion"], [CircleDollarSign, "Chen Ming", "Pacific Foods is 14 days overdue without a documented payment commitment.", "Collection follow-up"], [AlertTriangle, "Nguyen Thi Lan", "The GreenBite quote has not been followed up for over 3 days; complete a call record today.", "Key opportunity"]],
      month: [[Target, "Le Hoa", "Monthly sample-to-order conversion is 26%, below the 41.7% team average; run two key-account reviews.", "Conversion coaching"], [CircleDollarSign, "Chen Ming", "Monthly overdue receivables are ¥0.82M, 31% of his receivables; submit a customer-level collection plan.", "Collection plan"], [UsersRound, "Pham Quang", "Completed 14 of 17 key visits; three customers still lack a confirmed next step.", "Visit coverage"]],
      quarter: [[Target, "Nguyen Thi Lan", "Two of ¥4.2M strategic opportunities have not moved to sampling after factory audits.", "Key-account progress"], [CircleDollarSign, "Chen Ming", "Quarterly collection rate is 72%, below the 77.1% team rate; clear historical receivables first.", "Collection improvement"], [AlertTriangle, "Le Hoa", "Natura Foods delivery risk may affect repeat orders; sales should align expectations now.", "Delivery communication"]],
      year: [[Target, "Sales team", "The annual order target is 86% complete; ¥21.40M remains and eight key accounts need locking.", "Year-end push"], [CircleDollarSign, "Chen Ming", "Annual overdue receivables account for 24% of the team total; review commitments weekly.", "Collection governance"], [UsersRound, "Le Hoa", "Annual visit completion is 76%; customer coverage needs a joint-visit plan next quarter.", "Capability building"]],
    },
    vi: {
      week: [[Clock3, "Le Hoa", "Có 9 báo giá nhưng chỉ 1 đơn vào giai đoạn đặt hàng; nên cùng đi gặp 1 lần trong tuần này.", "Chuyển đổi báo giá"], [CircleDollarSign, "Chen Ming", "Pacific Foods quá hạn 14 ngày nhưng chưa có cam kết thanh toán được ghi nhận.", "Theo dõi thu tiền"], [AlertTriangle, "Nguyen Thi Lan", "Báo giá GreenBite quá 3 ngày chưa theo dõi; cần hoàn thành ghi nhận cuộc gọi hôm nay.", "Cơ hội trọng điểm"]],
      month: [[Target, "Le Hoa", "Tỷ lệ từ mẫu sang đơn tháng này là 26%, thấp hơn mức 41,7% của đội; cần rà soát 2 khách trọng điểm.", "Kèm cặp chuyển đổi"], [CircleDollarSign, "Chen Ming", "Công nợ quá hạn tháng này là ¥0.82M, chiếm 31% công nợ cá nhân; cần kế hoạch thu theo khách.", "Kế hoạch thu tiền"], [UsersRound, "Pham Quang", "Hoàn thành 14/17 lượt gặp trọng điểm; 3 khách chưa có bước tiếp theo rõ ràng.", "Phủ khách hàng"]],
      quarter: [[Target, "Nguyen Thi Lan", "Có 2 cơ hội trọng điểm trị giá ¥4.2M chưa chuyển sang lấy mẫu sau khi khách audit nhà máy.", "Tiến độ khách lớn"], [CircleDollarSign, "Chen Ming", "Tỷ lệ thu tiền quý là 72%, thấp hơn 77,1% của đội; cần ưu tiên công nợ cũ.", "Cải thiện thu tiền"], [AlertTriangle, "Le Hoa", "Rủi ro giao Natura Foods có thể ảnh hưởng đơn lặp lại; sales cần trao đổi trước với khách.", "Trao đổi giao hàng"]],
      year: [[Target, "Đội sales", "Mục tiêu đơn hàng năm hoàn thành 86%; còn ¥21.40M và cần chốt 8 khách trọng điểm.", "Nước rút năm"], [CircleDollarSign, "Chen Ming", "Công nợ quá hạn năm chiếm 24% của đội; trưởng nhóm cần rà soát cam kết hằng tuần.", "Quản trị thu tiền"], [UsersRound, "Le Hoa", "Tỷ lệ hoàn thành gặp khách năm là 76%; cần lập kế hoạch đi cùng trong quý sau.", "Nâng cao năng lực"]],
    },
  };
  return content[language][period];
}

function SalesRepDashboard({ language, onNavigate, onAsk, onSaveRecord, savedVisits = [], onShowRoleFocus }) {
  const s = salesLocale[language];
  const [selectedTask, setSelectedTask] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const tasks = language === "vi" ? [
    ["09:30", "GreenBite Packaging", "Gọi điện sau báo giá, xác nhận phản hồi mẫu", "priority", "Báo giá ¥178,000 đã gửi 4 ngày. Khách đã nhận mẫu thử, chờ xác nhận quy cách và ngân sách.", "Người liên hệ: Ms. Hoa · SĐT: 0908 332 180", ["Cuộc gặp trực tiếp 18/09", "Mẫu zipper cho snack", "Khu vực kho khách hàng"]],
    ["14:00", "Freshway Vietnam", "Gửi cập nhật tiến độ sản xuất cho khách hàng", "normal", "Đơn SO-2026-0926 đang sản xuất 68%. Khách yêu cầu ảnh đóng gói và xác nhận lịch giao 26/09.", "Người liên hệ: Mr. Long · Email: long@freshway.vn", ["Kiểm tra line sản xuất", "Ảnh mẫu in", "Chuẩn bị giao hàng"]],
    ["16:30", "Pacific Foods Co.", "Cập nhật cam kết thanh toán và ghi nhận nhắc nợ", "priority", "Khoản phải thu ¥286,000 quá hạn 14 ngày. Cần xác nhận ngày thanh toán chính thức trước khi kết thúc ngày.", "Người liên hệ: Ms. Thu · Kế toán khách hàng", ["Cuộc họp đối soát", "Biên bản giao hàng", "Ảnh hóa đơn đã gửi"]],
  ] : language === "en" ? [
    ["09:30", "GreenBite Packaging", "Call after the quote and confirm sample feedback", "priority", "The ¥178,000 quote was sent 4 days ago. Samples arrived; confirm specification and budget.", "Contact: Ms. Hoa · +84 908 332 180", ["On-site meeting · Sep 18", "Snack zipper pouch sample", "Customer warehouse area"]],
    ["14:00", "Freshway Vietnam", "Send the customer a production progress update", "normal", "SO-2026-0926 is 68% complete. The customer requests packing photos and delivery confirmation for Sep 26.", "Contact: Mr. Long · long@freshway.vn", ["Production line check", "Printed sample photo", "Dispatch preparation"]],
    ["16:30", "Pacific Foods Co.", "Update the payment commitment and collection reminder record", "priority", "¥286,000 is 14 days overdue. Confirm a committed payment date before the end of today.", "Contact: Ms. Thu · Customer accounting", ["Reconciliation meeting", "Delivery receipt", "Invoice sent"]],
  ] : [
    ["09:30", "GreenBite Packaging", "报价后电话跟进，确认客户的打样反馈", "priority", "报价 ¥178,000 已发出 4 天。客户已收到测试样，待确认包装规格与预算。", "联系人：Hoa 女士 · 0908 332 180", ["9 月 18 日上门拜访", "零食拉链袋样品", "客户仓储区现场"]],
    ["14:00", "Freshway Vietnam", "向客户发送生产进度更新", "normal", "SO-2026-0926 生产进度 68%。客户要求发送包装照片，并确认 9 月 26 日交期。", "联系人：Long 先生 · long@freshway.vn", ["生产线巡检", "印刷样张照片", "发货准备情况"]],
    ["16:30", "Pacific Foods Co.", "更新客户付款承诺并记录催款情况", "priority", "¥286,000 应收已逾期 14 天。需要在今天下班前确认客户正式付款日期。", "联系人：Thu 女士 · 客户财务", ["对账会议记录", "送货签收单", "已发送发票"]],
  ];
  const task = tasks[selectedTask];
  const labels = language === "vi" ? { detail: "Chi tiết công việc", record: "Thông tin đã ghi nhận", photos: "Ảnh đính kèm mô phỏng", open: "Mở", ask: "Xin gợi ý AI", photoTitle: "Ảnh thăm gặp mô phỏng", close: "Đóng", simulated: "DỮ LIỆU MÔ PHỎNG" }
    : language === "en" ? { detail: "Task detail", record: "Recorded context", photos: "Simulated attachments", open: "Open", ask: "Ask AI", photoTitle: "Simulated visit image", close: "Close", simulated: "SIMULATED DATA" }
      : { detail: "任务详情", record: "已记录现场信息", photos: "模拟上传的现场图片", open: "展开", ask: "向 AI 询问建议", photoTitle: "模拟拜访图片", close: "关闭", simulated: "演示模拟数据" };
  return <div className="work-page sales-rep-board">
    <PageIntro eyebrow={s.repEyebrow} title={s.repTitle} copy={s.repCopy} actions={<><RoleFocusButton language={language} onClick={onShowRoleFocus} /><button className="primary-button" onClick={() => onNavigate("sales")}>{s.flow}</button></>} />
    <section className="metric-strip"><MiniMetric label={s.order} value="¥ 1.86M" note={language === "vi" ? "Đạt 74% mục tiêu" : language === "en" ? "74% of target" : "完成目标 74%"} positive /><MiniMetric label={s.today} value="4" note={language === "vi" ? "1 việc quá hạn" : language === "en" ? "1 overdue follow-up" : "含 1 项超期"} /><MiniMetric label={s.visit} value="8" note={language === "vi" ? "Tuần này: 8 / 9" : language === "en" ? "This week: 8 / 9" : "本周：8 / 9"} /><MiniMetric label={s.reconciliation} value="¥ 286K" note={language === "vi" ? "1 khoản quá hạn" : language === "en" ? "1 overdue account" : "1 笔逾期应收"} /></section>
    <RoleAIHub language={language} role={roles.find((item) => item.id === "sales")} onSaveRecord={onSaveRecord} savedVisits={savedVisits} />
    <section className="dashboard-grid sales-overview-grid">
      <article className="panel rep-schedule"><PanelHead title={s.schedule} /><div>{tasks.map(([time, customer, detail, level], index) => <div className={`time-task ${level} ${selectedTask === index ? "active" : ""}`} key={customer}><time>{time}</time><span /><div><strong>{customer}</strong><p>{detail}</p></div><button className="task-open-button" onClick={() => setSelectedTask(index)} aria-label={`${labels.open} ${customer}`}><ChevronDown size={16} /></button></div>)}</div><RepTaskDetail task={task} language={language} labels={labels} onAsk={onAsk} onPhoto={setSelectedPhoto} /></article>
      <RepOpportunityFunnel language={language} onAsk={onAsk} />
    </section>
    <section className="dashboard-grid sales-command sales-lower-grid">
      <article className="panel"><PanelHead title={s.missing} /><div className="missing-list"><MissingRow icon={Camera} title="GreenBite Packaging" detail={s.missingData[0]} button={s.uploadPhoto} /><MissingRow icon={FileCheck2} title="Saigon Harvest" detail={s.missingData[1]} button={s.recordVisit} /><MissingRow icon={Clock3} title="Pacific Foods Co." detail={s.missingData[2]} button={s.recordVisit} /></div></article>
    </section>
    {selectedPhoto && <div className="simulated-photo-modal" role="dialog" aria-modal="true" aria-label={labels.photoTitle} onMouseDown={() => setSelectedPhoto(null)}><div className="simulated-photo-dialog" onMouseDown={(event) => event.stopPropagation()}><button onClick={() => setSelectedPhoto(null)} aria-label={labels.close}><X size={18} /></button><div className={`simulated-photo-canvas photo-${selectedPhoto.index % 3}`}><Camera size={42} /><span>{labels.simulated}</span></div><strong>{selectedPhoto.title}</strong><small>{selectedPhoto.customer} · {selectedPhoto.note}</small></div></div>}
  </div>;
}

function RepTaskDetail({ task, language, labels, onAsk, onPhoto }) {
  const [time, customer, detail, level, context, contact, photos] = task;
  return <section className={`rep-task-detail ${level}`}><div className="rep-task-detail-head"><div><small>{labels.detail} · {time}</small><strong>{customer}</strong></div><button className="secondary-button compact" onClick={() => onAsk(`${customer} ${language === "zh" ? "跟进建议" : language === "en" ? "follow-up recommendation" : "gợi ý theo dõi"}`)}><Sparkles size={14} /> {labels.ask}</button></div><div className="rep-task-context"><span><MessageSquareText size={15} /></span><div><small>{labels.record}</small><p>{context}</p><b>{contact}</b></div></div><div className="rep-photo-head"><strong><Camera size={15} /> {labels.photos}</strong><small>3</small></div><div className="rep-photo-grid">{photos.map((photo, index) => <button className={`rep-photo-card photo-${index}`} key={photo} onClick={() => onPhoto({ title: photo, customer, note: detail, index })}><Camera size={18} /><span>{photo}</span><em>{language === "zh" ? "点击放大" : language === "en" ? "Open preview" : "Nhấn để xem"}</em></button>)}</div></section>;
}

function RepOpportunityFunnel({ language, onAsk }) {
  const [period, setPeriod] = useState("week");
  const [selectedStage, setSelectedStage] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState(0);
  const labels = language === "vi"
    ? { title: "Cơ hội khách hàng của tôi", total: "Tổng cơ hội đang theo dõi", detail: "Chi tiết cơ hội", customers: "khách hàng", ask: "AI gợi ý theo dõi", periods: [["week", "Tuần này"], ["month", "Tháng này"], ["quarter", "Quý này"], ["year", "Năm nay"]] }
    : language === "en"
      ? { title: "My Customer Opportunities", total: "Active opportunities", detail: "Opportunity detail", customers: "customers", ask: "Ask AI for follow-up", periods: [["week", "This Week"], ["month", "This Month"], ["quarter", "This Quarter"], ["year", "This Year"]] }
      : { title: "我的客户机会", total: "当前跟进机会总额", detail: "机会详情", customers: "家客户", ask: "让 AI 生成跟进建议", periods: [["week", "本周"], ["month", "本月"], ["quarter", "本季度"], ["year", "本年度"]] };
  const data = repOpportunityData(language)[period];
  const stage = data.stages[selectedStage];
  const customer = stage.customers[selectedCustomer] || stage.customers[0];
  const selectStage = (index) => {
    setSelectedStage(index);
    setSelectedCustomer(0);
  };
  return <article className="panel rep-opportunity-funnel">
    <div className="rep-funnel-head"><div><h2>{labels.title}</h2><small>{labels.total} · <strong>{data.total}</strong></small></div><div className="board-filter">{labels.periods.map(([id, label]) => <button className={period === id ? "active" : ""} key={id} onClick={() => { setPeriod(id); setSelectedStage(0); setSelectedCustomer(0); }}>{label}</button>)}</div></div>
    <div className="rep-funnel-stages">{data.stages.map((item, index) => <button className={`rep-funnel-step stage-${index} ${selectedStage === index ? "active" : ""}`} style={{ "--funnel-width": `${100 - index * 9}%` }} key={item.label} onClick={() => selectStage(index)}><span>{index + 1}</span><div><strong>{item.label}</strong><small>{item.count} {labels.customers} · {item.value}</small></div><ChevronDown size={16} /></button>)}</div>
    <div className="rep-opportunity-summary"><span>{selectedStage + 1}</span><div><small>{stage.label}</small><strong>{stage.value}</strong></div><em>{stage.count} {labels.customers}</em></div>
    <div className="rep-opportunity-list">{stage.customers.map((item, index) => <button className={`rep-opportunity-row ${selectedCustomer === index ? "active" : ""}`} key={item.name} onClick={() => setSelectedCustomer(index)}><div><strong>{item.name}</strong><small>{item.product} · {item.contact}</small></div><b>{item.amount}</b><ChevronDown size={15} /></button>)}</div>
    <section className="rep-opportunity-detail"><div><small>{labels.detail}</small><strong>{customer.name} · {customer.amount}</strong></div><dl><div><dt>{language === "zh" ? "当前进度" : language === "en" ? "Current status" : "Tiến độ hiện tại"}</dt><dd>{customer.status}</dd></div><div><dt>{language === "zh" ? "下一步" : language === "en" ? "Next action" : "Bước tiếp theo"}</dt><dd>{customer.next}</dd></div><div><dt>{language === "zh" ? "风险提示" : language === "en" ? "Risk signal" : "Lưu ý rủi ro"}</dt><dd>{customer.risk}</dd></div></dl><button className="secondary-button compact" onClick={() => onAsk(`${customer.name} ${language === "zh" ? "下一步跟进建议" : language === "en" ? "next follow-up recommendation" : "gợi ý theo dõi tiếp theo"}`)}><Sparkles size={14} /> {labels.ask}</button></section>
  </article>;
}

function repOpportunityData(language) {
  const stageLabels = language === "vi"
    ? ["Khách tiềm năng / hỏi giá", "Thăm gặp", "Làm mẫu", "Đặt hàng"]
    : language === "en"
      ? ["Prospect / inquiry", "Visit", "Sampling", "Order"]
      : ["潜在客户建档 / 询价", "拜访", "打样", "下订"];
  const field = (zh, en, vi) => language === "zh" ? zh : language === "en" ? en : vi;
  const customers = [
    [
      { name: "VietTaste Foods", product: field("冷冻食品复合袋", "Frozen food laminate pouch", "Túi ghép thực phẩm đông lạnh"), contact: "Ms. Linh", amount: "¥56K", status: field("已完成建档，等待确认首次拜访时间", "Profile created; waiting for first-visit confirmation", "Đã tạo hồ sơ, chờ xác nhận lịch gặp đầu tiên"), next: field("9 月 24 日电话确认", "Call on Sep 24", "Gọi xác nhận ngày 24/09"), risk: field("尚未确认决策人", "Decision maker not confirmed", "Chưa xác nhận người quyết định") },
      { name: "Blue Ocean Coffee", product: field("咖啡豆阀口袋", "Coffee valve pouch", "Túi van cho cà phê"), contact: "Mr. Nam", amount: "¥42K", status: field("已收到尺寸与月度用量", "Received dimensions and monthly usage", "Đã nhận kích thước và sản lượng tháng"), next: field("准备初步报价", "Prepare initial quote", "Chuẩn bị báo giá sơ bộ"), risk: field("价格敏感", "Price-sensitive", "Nhạy cảm về giá") },
      { name: "Mekong Snacks", product: field("零食拉链袋", "Snack zipper pouch", "Túi zipper cho snack"), contact: "Ms. Yen", amount: "¥26K", status: field("线上询价已记录", "Online inquiry logged", "Đã ghi nhận hỏi giá trực tuyến"), next: field("预约客户上门拜访", "Schedule on-site visit", "Đặt lịch gặp trực tiếp"), risk: field("需求规格仍不完整", "Specification is incomplete", "Quy cách chưa đầy đủ") },
    ],
    [
      { name: "Saigon Harvest", product: field("大米包装袋", "Rice packaging pouch", "Túi bao bì gạo"), contact: "Mr. Tuan", amount: "¥128K", status: field("客户完成验厂，要求补充食品级文件", "Factory audit passed; food-grade documents requested", "Khách đã audit xưởng, cần bổ sung hồ sơ thực phẩm"), next: field("周三前发送文件", "Send documents by Wednesday", "Gửi hồ sơ trước thứ Tư"), risk: field("验厂资料未闭环", "Audit documents still open", "Hồ sơ audit chưa hoàn tất") },
      { name: "GreenBite Packaging", product: field("零食拉链包装袋", "Snack zipper pouch", "Túi zipper cho snack"), contact: "Ms. Hoa", amount: "¥178K", status: field("已上门拜访，等待样品测试反馈", "On-site visit complete; waiting for sample feedback", "Đã thăm gặp, chờ phản hồi mẫu"), next: field("今天电话确认样品反馈", "Call today for sample feedback", "Gọi hôm nay xác nhận phản hồi mẫu"), risk: field("报价已 4 天未跟进", "Quote has been idle for 4 days", "Báo giá chưa theo dõi 4 ngày") },
      { name: "Natura Foods", product: field("调味料立袋", "Seasoning stand-up pouch", "Túi đứng gia vị"), contact: "Ms. Mai", amount: "¥92K", status: field("客户计划下周来厂验厂", "Customer factory audit scheduled next week", "Khách dự kiến audit nhà máy tuần sau"), next: field("确认验厂接待清单", "Confirm audit reception checklist", "Xác nhận checklist đón khách audit"), risk: field("交付资料待准备", "Delivery documents pending", "Tài liệu giao hàng cần chuẩn bị") },
      { name: "Freshway Vietnam", product: field("冷饮包装袋", "Frozen drink pouch", "Túi bao bì đồ uống lạnh"), contact: "Mr. Long", amount: "¥76K", status: field("客户已确认应用方案", "Customer confirmed application solution", "Khách đã xác nhận phương án sử dụng"), next: field("安排打样规格确认", "Confirm sampling specification", "Xác nhận quy cách làm mẫu"), risk: field("交期要求较紧", "Tight requested lead time", "Yêu cầu thời gian giao gấp") },
    ],
    [
      { name: "GreenBite Packaging", product: field("零食拉链包装袋", "Snack zipper pouch", "Túi zipper cho snack"), contact: "Ms. Hoa", amount: "¥178K", status: field("测试样已送达，等待确认厚度与印刷稿", "Samples delivered; waiting for thickness and artwork approval", "Mẫu đã giao, chờ duyệt độ dày và thiết kế"), next: field("周五前寄第二版样品", "Send revised sample by Friday", "Gửi mẫu phiên bản 2 trước thứ Sáu"), risk: field("样品确认可能推迟下订", "Sample approval may delay ordering", "Duyệt mẫu có thể chậm đơn hàng") },
      { name: "Pacific Foods Co.", product: field("宠物食品铝箔袋", "Pet food foil pouch", "Túi nhôm thức ăn thú cưng"), contact: "Ms. Thu", amount: "¥96K", status: field("客户测试阻隔性能", "Customer is testing barrier performance", "Khách đang thử độ cản khí"), next: field("发送测试说明与报价", "Send test note and quote", "Gửi hướng dẫn thử nghiệm và báo giá"), risk: field("需协调技术答复", "Technical response is needed", "Cần phối hợp phản hồi kỹ thuật") },
    ],
    [
      { name: "Freshway Vietnam", product: field("冷饮包装袋", "Frozen drink pouch", "Túi bao bì đồ uống lạnh"), contact: "Mr. Long", amount: "¥486K", status: field("SO-2026-0926 生产进度 68%", "SO-2026-0926 is 68% in production", "SO-2026-0926 đang sản xuất 68%"), next: field("确认 9 月 26 日送货安排", "Confirm Sep 26 delivery", "Xác nhận giao ngày 26/09"), risk: field("客户要求提前查看包装照片", "Customer requests packing photos in advance", "Khách yêu cầu xem ảnh đóng gói sớm") },
      { name: "Natura Foods", product: field("调味料立袋", "Seasoning stand-up pouch", "Túi đứng gia vị"), contact: "Ms. Mai", amount: "¥362K", status: field("订单等待 PE 原料到货", "Order awaits PE material arrival", "Đơn đang chờ nguyên liệu PE về"), next: field("每天向客户更新交期", "Update customer on delivery daily", "Cập nhật giao hàng cho khách hằng ngày"), risk: field("存在 2 天交期风险", "Two-day delivery risk", "Có rủi ro giao trễ 2 ngày") },
      { name: "Saigon Harvest", product: field("大米包装袋", "Rice packaging pouch", "Túi bao bì gạo"), contact: "Mr. Tuan", amount: "¥284K", status: field("首单已确认，等待生产排期", "First order confirmed; waiting for production slot", "Đơn đầu đã xác nhận, chờ lịch sản xuất"), next: field("确认印刷稿与排产时间", "Confirm artwork and production schedule", "Xác nhận thiết kế và lịch sản xuất"), risk: field("印刷稿仍待签核", "Artwork approval pending", "Thiết kế in chờ ký duyệt") },
      { name: "Mekong Snacks", product: field("零食拉链袋", "Snack zipper pouch", "Túi zipper cho snack"), contact: "Ms. Yen", amount: "¥168K", status: field("复购订单等待客户 PO", "Repeat order awaits customer PO", "Đơn lặp lại đang chờ PO của khách"), next: field("周四前确认 PO", "Confirm PO by Thursday", "Xác nhận PO trước thứ Năm"), risk: field("客户内部审批尚未完成", "Customer internal approval is pending", "Khách chưa hoàn tất phê duyệt nội bộ") },
      { name: "Blue Ocean Coffee", product: field("咖啡豆阀口袋", "Coffee valve pouch", "Túi van cho cà phê"), contact: "Mr. Nam", amount: "¥560K", status: field("年度框架订单洽谈中", "Annual framework order under discussion", "Đang trao đổi đơn khung năm"), next: field("提交阶梯报价方案", "Submit tiered pricing proposal", "Gửi phương án giá bậc thang"), risk: field("需确认年度预测量", "Annual forecast volume unconfirmed", "Chưa xác nhận sản lượng năm") },
    ],
  ];
  const periods = {
    week: { total: "¥2.58M", counts: [3, 4, 2, 5], values: ["¥124K", "¥474K", "¥274K", "¥1.86M"] },
    month: { total: "¥7.84M", counts: [10, 12, 7, 14], values: ["¥486K", "¥1.62M", "¥1.34M", "¥4.40M"] },
    quarter: { total: "¥19.72M", counts: [26, 31, 18, 37], values: ["¥1.32M", "¥4.18M", "¥3.76M", "¥10.46M"] },
    year: { total: "¥68.40M", counts: [94, 108, 62, 136], values: ["¥5.68M", "¥13.74M", "¥12.88M", "¥36.10M"] },
  };
  return Object.fromEntries(Object.entries(periods).map(([period, values]) => [period, { ...values, stages: stageLabels.map((label, index) => ({ label, count: values.counts[index], value: values.values[index], customers: customers[index] })) }]));
}

function VoiceVisitCapture({ language, onSaveRecord, savedVisits = [], embedded = false }) {
  const [state, setState] = useState("idle");
  const [lineCount, setLineCount] = useState(0);
  const saved = savedVisits.some((visit) => visit.customer === "GreenBite Packaging" && visit.recordedBy === "Nguyen Thi Lan");
  const vietnameseLines = [
    "Hôm nay tôi đã đến gặp GreenBite Packaging.",
    "Khách hàng quan tâm đến bao bì zipper cho snack.",
    "Dự kiến đơn hàng khoảng 180.000 tệ.",
    "Họ muốn nhận mẫu trước thứ Sáu, tôi sẽ gọi lại vào tuần sau.",
  ];
  const copy = {
    zh: {
      title: "模拟语音工作记录", subtitle: "模拟：越南销售员完成上门拜访后，用越南语提交现场汇报", start: "播放并识别越南语", recognizing: "正在识别越南语语音", recognized: "识别完成 · AI 已生成中文管理记录", source: "越南语原始汇报", management: "中文管理摘要", translate: "AI 自动翻译与提取", save: "确认同步到团队", synced: "已同步到销售负责人和老板看板", fields: [["客户", "GreenBite Packaging"], ["拜访类型", "上门拜访"], ["产品需求", "零食拉链包装袋"], ["预计机会", "¥ 180,000"], ["下一步", "周五前寄样"], ["风险", "样品寄送需跟进"]],
    },
    en: {
      title: "Simulated Voice Work Log", subtitle: "Simulation: a Vietnamese sales rep submits a Vietnamese visit report after an on-site meeting", start: "Play and recognize Vietnamese", recognizing: "Recognizing Vietnamese voice note", recognized: "Recognition complete · AI created a management record", source: "Vietnamese source note", management: "Management Summary", translate: "AI translation and extraction", save: "Sync to team", synced: "Synchronized to sales lead and owner dashboard", fields: [["Customer", "GreenBite Packaging"], ["Visit type", "On-site visit"], ["Requirement", "Snack zipper pouch"], ["Expected value", "¥ 180,000"], ["Next action", "Send samples by Friday"], ["Risk", "Sample dispatch follow-up"]],
    },
    vi: {
      title: "Ghi nhận công việc bằng giọng nói mô phỏng", subtitle: "Mô phỏng: nhân viên kinh doanh vừa gặp khách trực tiếp và gửi báo cáo bằng tiếng Việt", start: "Phát và nhận diện tiếng Việt", recognizing: "Đang nhận diện báo cáo giọng nói tiếng Việt", recognized: "Đã nhận diện · AI đã tạo ghi chú quản lý tiếng Trung", source: "Báo cáo gốc bằng tiếng Việt", management: "Tóm tắt quản lý tiếng Trung", translate: "AI tự động dịch và trích xuất", save: "Xác nhận đồng bộ cho đội", synced: "Đã đồng bộ với trưởng nhóm và bảng điều hành", fields: [["Khách hàng", "GreenBite Packaging"], ["Loại thăm gặp", "Đến thăm trực tiếp"], ["Nhu cầu", "Túi zipper cho snack"], ["Cơ hội dự kiến", "¥ 180,000"], ["Bước tiếp theo", "Gửi mẫu trước thứ Sáu"], ["Rủi ro", "Cần theo dõi gửi mẫu"]],
    },
  }[language];
  const record = {
    customer: "GreenBite Packaging",
    action: language === "vi" ? "Thăm gặp trực tiếp" : language === "en" ? "On-site visit" : "上门拜访",
    amount: "¥ 180,000",
    followUp: language === "vi" ? "Gửi mẫu trước thứ Sáu, gọi lại tuần sau" : language === "en" ? "Send samples by Friday; call next week" : "周五前寄样，下周电话跟进",
    language: "Tiếng Việt",
    visitType: "onSite",
  };
  useEffect(() => {
    if (state !== "recognizing") return undefined;
    setLineCount(0);
    const timers = vietnameseLines.map((_, index) => window.setTimeout(() => setLineCount(index + 1), (index + 1) * 620));
    const finish = window.setTimeout(() => setState("recognized"), 2850);
    return () => { timers.forEach(window.clearTimeout); window.clearTimeout(finish); };
  }, [state]);
  const runRecognition = () => {
    setLineCount(0);
    setState("recognizing");
  };
  const content = <>
    <div className="voice-capture-head"><div><span className="voice-icon"><Mic size={19} /></span><div><strong>{copy.title}</strong><small>{copy.subtitle}</small></div></div><span className="voice-demo-tag">DEMO</span></div>
    <div className="voice-capture-body">
      <div className="voice-player"><div className={`waveform ${state === "recognizing" ? "is-playing" : ""}`}>{Array.from({ length: 24 }, (_, index) => <i key={index} style={{ height: `${20 + ((index * 17) % 65)}%` }} />)}</div><button className="primary-button" onClick={runRecognition} disabled={state === "recognizing" || saved}><AudioLines size={16} /> {state === "recognizing" ? copy.recognizing : saved ? copy.synced : copy.start}</button></div>
      <div className="voice-status"><span className={state === "recognizing" ? "status-live" : state === "recognized" || saved ? "status-done" : ""} />{state === "idle" ? copy.subtitle : state === "recognizing" ? copy.recognizing : saved ? copy.synced : copy.recognized}</div>
    </div>
    {state !== "idle" && <div className="voice-results">
      <section className="voice-source"><div className="voice-result-label"><Mic size={15} /> {copy.source}</div>{vietnameseLines.slice(0, state === "recognizing" ? lineCount : 4).map((line) => <p key={line}>{line}</p>)}</section>
      <section className="voice-management"><div className="voice-result-label"><Languages size={15} /> {copy.management}<small>{copy.translate}</small></div><dl>{copy.fields.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>{!saved && state === "recognized" && <button className="primary-button" onClick={() => { onSaveRecord(record); setState("saved"); }}><CheckCircle2 size={16} /> {copy.save}</button>} {saved && <div className="voice-synced"><CheckCircle2 size={16} /> {copy.synced}</div>}</section>
    </div>}
  </>;
  if (embedded) return <div className={`voice-capture-embedded ${state}`}>{content}</div>;
  return <section className={`panel voice-capture-panel ${state}`}>{content}</section>;
}

function MissingRow({ icon: Icon, title, detail, button }) {
  return <div className="missing-row"><span><Icon size={17} /></span><div><strong>{title}</strong><p>{detail}</p></div><button>{button}</button></div>;
}

function Dashboard({ onNavigate, onAsk }) {
  return <div className="dashboard">
    <section className="welcome-row">
      <div><p className="eyebrow">Vietnam Factory · 2026.09.09 · Wednesday</p><h1>早上好，Michael</h1><p>越南工厂今天运转平稳，但有 <strong>3 项需要优先处理</strong>。</p></div>
      <div className="date-panel"><CalendarDays size={19} /><div><strong>2026 年 9 月</strong><small>经营数据实时模拟</small></div></div>
    </section>
    <section className="kpi-grid">
      {kpis.map((kpi) => <article className="kpi-card" key={kpi.label}>
        <p>{kpi.label}</p><h2>{kpi.value}</h2><div className={`kpi-change ${kpi.direction}`}><span>{kpi.direction === "up" ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}{kpi.delta}</span><small>{kpi.detail}</small></div>
      </article>)}
    </section>
    <section className="dashboard-grid">
      <article className="panel risk-panel">
        <PanelHead title="经营风险与待推进事项" action="查看预警中心" onClick={() => onNavigate("alerts")} />
        <div className="alert-list">{alerts.slice(0, 3).map((alert) => <AlertRow key={alert.title} alert={alert} />)}</div>
      </article>
      <article className="panel ai-brief">
        <div className="ai-title"><span className="sparkle-box"><Sparkles size={18} /></span><div><p>EPAC 智能简报</p><small>基于本地演示数据生成</small></div></div>
        <h3>今天最值得老板关注的三件事</h3>
        <ol><li><strong>先保交期：</strong>SO-2026-0918 原料未到，可能影响 Natura Foods 交付。</li><li><strong>再抓回款：</strong>Pacific Foods Co. 逾期 ¥286,000，已超过 14 天。</li><li><strong>推进机会：</strong>GreenBite Packaging 报价 ¥178,000 已 4 天未跟进。</li></ol>
        <button className="outline-button" onClick={() => { onNavigate("assistant"); onAsk("今天最需要处理什么？"); }}><MessageSquareText size={16} /> 向智能助手追问</button>
      </article>
    </section>
    <section className="dashboard-grid lower-grid">
      <article className="panel orders-panel">
        <PanelHead title="重点订单生产协同" action="查看全部订单" onClick={() => onNavigate("production")} />
        <div className="table-wrap"><table><thead><tr><th>订单</th><th>客户 / 产品</th><th>订单金额</th><th>计划交期</th><th>生产状态</th><th></th></tr></thead><tbody>{orders.map((order) => <tr key={order.code}><td><strong>{order.code}</strong><small>{order.owner}</small></td><td>{order.customer}<small>{order.product}</small></td><td>{order.amount}</td><td>{order.date}</td><td><Status status={order.status} risk={order.risk} /></td><td><button className="table-action" onClick={() => onNavigate("production")}>查看</button></td></tr>)}</tbody></table></div>
      </article>
      <article className="panel task-panel">
        <PanelHead title="部门执行概览" />
        <div className="department-progress">
          <Progress name="销售部" done="28/34" value={82} color="#39876f" />
          <Progress name="采购部" done="16/22" value={73} color="#cc9050" />
          <Progress name="行政部" done="12/13" value={92} color="#7185a6" />
        </div>
        <div className="approval-mini"><ReceiptText size={19} /><div><strong>6 项待审批</strong><small>其中 2 项已超过 24 小时</small></div><button onClick={() => onNavigate("approvals")} aria-label="查看审批"><ChevronDown size={18} /></button></div>
      </article>
    </section>
  </div>;
}

function PanelHead({ title, action, onClick }) {
  return <div className="panel-head"><h2>{title}</h2>{action && <button className="text-button" onClick={onClick}>{action} <ChevronDown size={15} /></button>}</div>;
}

function AlertRow({ alert }) {
  return <div className="alert-row"><span className={`priority-dot ${alert.priority}`} /><div className="alert-copy"><div><strong>{alert.title}</strong><span className="alert-tag">{alert.tag}</span></div><p>{alert.detail}</p><small>{alert.owner} · {alert.time}</small></div><button className="row-more" aria-label="查看事项">...</button></div>;
}

function Status({ status, risk }) {
  return <span className={`status ${risk}`}><i />{status}</span>;
}

function Progress({ name, done, value, color, language = "zh" }) {
  const onTime = language === "vi" ? "đúng kế hoạch" : language === "en" ? "on schedule" : "项按时";
  return <div className="progress-row"><div><strong>{name}</strong><span>{done} {onTime}</span></div><div className="progress-track"><i style={{ width: `${value}%`, background: color }} /></div><b>{value}%</b></div>;
}

function SalesPage({ language, role, onAsk, onCapture, onSaveRecord, entryPreview, lastSavedVisit, savedVisits = [] }) {
  const s = salesLocale[language];
  const isRep = role.id === "sales";
  const visitCount = 28 + savedVisits.length;
  const onSiteCount = 12 + savedVisits.filter((visit) => visit.visitType === "onSite").length;
  const saveMessage = lastSavedVisit && (language === "vi"
    ? `Đã lưu: Bản ghi thăm gặp ${lastSavedVisit.customer} đã đồng bộ với bảng đội kinh doanh.`
    : language === "en"
      ? `Saved: the ${lastSavedVisit.customer} visit has synchronized to the sales team dashboard.`
      : `已保存：${lastSavedVisit.customer} 的拜访记录已同步到销售团队看板。`);
  const [note, setNote] = useState(language === "vi" ? "Chiều nay tôi đến thăm GreenBite. Khách quan tâm túi nhôm, dự kiến 180.000 RMB, gửi mẫu trước thứ Sáu." : language === "en" ? "I visited GreenBite this afternoon. They are interested in foil pouches, expected value RMB 180k, and need samples by Friday." : "今天下午上门拜访 GreenBite，客户对铝箔袋有兴趣，预计 18 万，周五前寄样。");
  const stages = [s.prospect, s.visit, s.factoryAudit, s.sample, s.orderStage, s.delivery, s.reconciliation];
  return <div className="work-page sales-process-page">
    <PageIntro eyebrow={s.crmEyebrow} title={s.crmTitle} copy={s.crmCopy} actions={<><button className="secondary-button"><Upload size={16} /> {language === "vi" ? "Nhập khách hàng" : language === "en" ? "Import customers" : "导入客户"}</button><button className="primary-button"><UserRoundCheck size={16} /> {s.addProspect}</button></>} />
    <section className="metric-strip"><MiniMetric label={s.order} value="¥ 12.84M" note="+12.6%" positive /><MiniMetric label={s.visit} value={`${visitCount} / 34`} note={language === "vi" ? `Còn ${34 - visitCount} lượt cần hoàn thành` : language === "en" ? `${34 - visitCount} visits still due` : `${34 - visitCount} 次待完成`} /><MiniMetric label={s.factoryAudit} value="8" note={language === "vi" ? "2 việc cần khắc phục" : language === "en" ? "2 corrective actions" : "2 项待整改"} /><MiniMetric label={s.overdue} value="¥ 1.26M" note={language === "vi" ? "8 khoản phải theo dõi" : language === "en" ? "8 items to follow" : "8 笔待跟进"} /></section>
    {saveMessage && <section className="save-success"><CheckCircle2 size={18} /><div><strong>{saveMessage}</strong><small>{language === "vi" ? `Bước tiếp theo: ${lastSavedVisit.followUp}` : language === "en" ? `Next step: ${lastSavedVisit.followUp}` : "下一步：周五前寄样，下周电话跟进。"}</small></div></section>}
    <section className="panel customer-journey-panel"><PanelHead title={s.flow} /><div className="journey-flow">{stages.map((stage, index) => <div className={`journey-node ${index === 2 ? "audit" : ""}`} key={stage}><span>{index + 1}</span><strong>{stage}</strong><small>{[42, 28, 8, 15, 24, 21, 19][index]}</small></div>)}</div><div className="journey-caption"><Workflow size={17} /><span>{language === "vi" ? "Nhấn vào khách hàng để xem hành động tiếp theo, ảnh thăm gặp và tiến độ liên phòng ban." : language === "en" ? "Open any account to view its next action, visit photos, and cross-functional progress." : "进入客户后可查看下一步动作、拜访照片和跨部门协同进度。"}</span></div></section>
    <section className="dashboard-grid sales-overview-grid">
      <article className="panel"><PanelHead title={s.keyCustomers} /><div className="table-wrap"><table><thead><tr><th>{s.customer}</th><th>{s.stage}</th><th>{s.owner}</th><th>{s.next}</th><th>{s.health}</th></tr></thead><tbody>{keyAccounts.map(([customer, owner, next, amount, health, risk]) => <tr key={customer}><td><strong>{customer}</strong><small>{amount}</small></td><td>{accountText(next, language)}</td><td>{owner}</td><td>{accountText(next, language)}</td><td><Status status={healthText(health, language)} risk={risk === "risk" ? "high" : risk === "watch" ? "medium" : "normal"} /></td></tr>)}</tbody></table></div></article>
      <article className="panel visit-stat-panel"><PanelHead title={s.visitTypes} /><div className="visit-stat-grid"><VisitStat icon={BriefcaseBusiness} label={language === "vi" ? "Mời ăn / Gặp gỡ" : language === "en" ? "Hosted meeting" : "邀约吃饭"} value="7" color="#c89156" /><VisitStat icon={MapPin} label={language === "vi" ? "Đến thăm khách" : language === "en" ? "On-site visit" : "上门拜访"} value={String(onSiteCount)} color="#4f957d" /><VisitStat icon={UsersRound} label={language === "vi" ? "Khách đến nhà máy" : language === "en" ? "Customer factory visit" : "客户来厂"} value="5" color="#5683ae" /><VisitStat icon={MessageSquareText} label={language === "vi" ? "Triển lãm / Trực tuyến" : language === "en" ? "Exhibition / online" : "展会 / 线上"} value="11" color="#8a6ab2" /></div><div className="photo-strip"><span><Camera size={16} /></span><div><strong>{language === "vi" ? "18 ảnh thăm gặp đã tải lên" : language === "en" ? "18 visit photos uploaded" : "已上传 18 张拜访现场照片"}</strong><small>{language === "vi" ? "Còn 2 hồ sơ cần bổ sung ảnh" : language === "en" ? "2 records still need photos" : "另有 2 条记录待补照片"}</small></div></div></article>
    </section>
    <section className="dashboard-grid sales-lower-grid">
      <article className="panel ai-entry-panel"><div className="ai-entry-head"><span className="sparkle-box"><Sparkles size={18} /></span><div><strong>{s.aiEntry}</strong><small>{language === "vi" ? "Nhập bằng tiếng Việt, Trung hoặc Anh; AI sẽ tạo bản ghi có cấu trúc." : language === "en" ? "Enter in Vietnamese, Chinese, or English. AI will create a structured record." : "可使用越南文、中文或英文录入，AI 会生成结构化记录。"}</small></div></div><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder={s.aiHint} /><div className="ai-entry-actions"><small><Languages size={14} /> Vietnamese · Chinese · English</small><button className="primary-button" onClick={() => onCapture(note)}><Sparkles size={16} /> {s.analyze}</button></div>{entryPreview && <RecordPreview language={language} record={entryPreview} onConfirm={onSaveRecord} />}</article>
      <article className="panel sales-reminder-panel"><PanelHead title={s.reminder} /><div className="reminder-list"><ReminderRow icon={PhoneCall} title="GreenBite Packaging" detail={language === "vi" ? "Báo giá đã 4 ngày chưa theo dõi" : language === "en" ? "Quote has not been followed up for 4 days" : "报价 4 天未跟进"} tone="danger" /><ReminderRow icon={Camera} title="Saigon Harvest" detail={language === "vi" ? "Cần bổ sung ảnh và kết quả thăm gặp" : language === "en" ? "Visit photos and results need adding" : "需补充拜访照片和结果"} tone="watch" /><ReminderRow icon={CircleDollarSign} title="Pacific Foods Co." detail={language === "vi" ? "Công nợ quá hạn 14 ngày" : language === "en" ? "Collection overdue by 14 days" : "回款已逾期 14 天"} tone="danger" /></div>{isRep && <button className="outline-dark-button" onClick={() => onAsk("今天我最需要跟进什么？")}><Sparkles size={16} /> {s.askAI}</button>}</article>
    </section>
  </div>;
}

function VisitStat({ icon: Icon, label, value, color }) {
  return <div><span style={{ color, background: `${color}18` }}><Icon size={17} /></span><strong>{value}</strong><small>{label}</small></div>;
}

function ReminderRow({ icon: Icon, title, detail, tone }) {
  return <div className={`reminder-row ${tone}`}><span><Icon size={16} /></span><div><strong>{title}</strong><p>{detail}</p></div><ChevronDown size={15} /></div>;
}

function RecordPreview({ language, record, onConfirm }) {
  const s = salesLocale[language];
  return <div className="record-preview"><div><CheckCircle2 size={17} /><strong>{s.extracted}</strong></div><dl><div><dt>{s.customer}</dt><dd>{record.customer}</dd></div><div><dt>{s.action}</dt><dd>{record.action}</dd></div><div><dt>{s.amount}</dt><dd>{record.amount}</dd></div><div><dt>{s.followUp}</dt><dd>{record.followUp}</dd></div></dl><button className="secondary-button" onClick={() => onConfirm(record)}><CheckCircle2 size={15} /> {s.confirm}</button></div>;
}

function ProductionPage({ language }) {
  const l = language === "vi" ? {
    title: "Đơn hàng & sản xuất", copy: "Kết nối kinh doanh, mua hàng và kế hoạch sản xuất để phát hiện sớm rủi ro giao hàng.", update: "Cập nhật kế hoạch",
    metrics: [["Đơn chờ kế hoạch", "1 đơn gần hạn"], ["Đang sản xuất", "12 đơn bình thường"], ["Chờ giao", "2 đơn hôm nay"], ["Rủi ro giao hàng", "Cần phối hợp liên phòng ban"]],
    board: "Bảng trạng thái đơn hàng", columns: ["Chờ kế hoạch", "Chờ nguyên liệu", "Đang sản xuất", "Chờ giao"], due: "Hạn giao", risk: "Có rủi ro", normal: "Bình thường",
  } : language === "en" ? {
    title: "Order & Production", copy: "Connect sales, procurement, and production planning to surface delivery risks early.", update: "Update schedule",
    metrics: [["Awaiting scheduling", "1 order near due date"], ["In production", "12 orders on track"], ["Awaiting shipment", "2 planned today"], ["Delivery risks", "Cross-functional action needed"]],
    board: "Order Status Board", columns: ["Awaiting schedule", "Awaiting material", "In production", "Awaiting shipment"], due: "Due", risk: "At risk", normal: "Normal",
  } : {
    title: "订单生产协同", copy: "连接销售、采购与生产计划，提前暴露交付风险。", update: "更新排产状态",
    metrics: [["待排产订单", "其中 1 笔临近交期"], ["生产中", "12 笔进度正常"], ["待发货", "今日计划 2 笔"], ["交期风险", "需要跨部门处理"]],
    board: "订单状态看板", columns: ["待排产", "待原料", "生产中", "待发货"], due: "交期", risk: "有风险", normal: "正常",
  };
  const columnKey = ["scheduled", "material", "production", "shipping"];
  const match = (order, key) => (key === "scheduled" ? order.status === "已排产" : key === "material" ? order.status === "待原料" : key === "production" ? order.status === "生产中" : order.status === "待发货");
  return <div className="work-page"><PageIntro eyebrow="ORDER & PRODUCTION" title={l.title} copy={l.copy} actions={<button className="primary-button">{l.update}</button>} />
    <section className="metric-strip">{l.metrics.map(([label, note], index) => <MiniMetric key={label} label={label} value={["5", "14", "4", "2"][index]} note={note} positive={index === 1} />)}</section>
    <section className="panel production-board"><PanelHead title={l.board} /><div className="kanban">{l.columns.map((column, index) => <div className="kanban-col" key={column}><div className="kanban-title"><strong>{column}</strong><span>{[2, 1, 3, 2][index]}</span></div>{orders.filter((order) => match(order, columnKey[index])).map((order) => <div className={`order-ticket ${order.risk}`} key={order.code}><small>{order.code}</small><strong>{order.customer}</strong><p>{order.product}</p><div><span>{l.due} {order.date}</span><Status status={order.risk === "high" ? l.risk : l.normal} risk={order.risk} /></div></div>)}</div>)}</div></section>
  </div>;
}

function ProcurementPage({ language }) {
  const l = language === "vi" ? {
    title: "Bàn làm việc Mua hàng", copy: "Quản lý yêu cầu mua, so sánh nhà cung cấp và thời hạn nguyên liệu.", import: "Nhập báo giá", create: "Tạo yêu cầu mua",
    metrics: [["Giá trị mua tháng này", "so với tháng trước +4.8%"], ["Yêu cầu chờ so sánh", "2 việc hết hạn hôm nay"], ["Sắp đến hàng", "7 ngày tới"], ["Bất thường giá", "Giá nhôm tăng rõ rệt"]],
    comparison: "So sánh báo giá nhà cung cấp · Nhôm 12μ", all: "Xem tất cả vật liệu", headers: ["Nhà cung cấp", "Báo giá", "So với lịch sử", "Thời hạn", "Điểm NCC", "Khuyến nghị"], recommend: "Khuyến nghị",
    tracking: "Theo dõi thời hạn mua hàng", expedite: "Thúc giao", late: "Dự kiến đến: 09/14; nhu cầu sản xuất SO-2026-0918: 09/12", okay: "Dự kiến đến 09/10, đáp ứng kế hoạch Happy Bean",
  } : language === "en" ? {
    title: "Procurement Desk", copy: "Manage purchase requests, supplier comparisons, and material lead times.", import: "Import quotes", create: "New purchase request",
    metrics: [["Procurement this month", "+4.8% vs. last month"], ["Requests for comparison", "2 due today"], ["Incoming materials", "next 7 days"], ["Price anomalies", "Foil price increased"]],
    comparison: "Supplier Quote Comparison · 12μ Foil", all: "View all materials", headers: ["Supplier", "Current quote", "vs. history", "Lead time", "Supplier score", "Recommendation"], recommend: "Recommended",
    tracking: "Procurement Delivery Tracking", expedite: "Expedite", late: "Expected arrival: 09/14; SO-2026-0918 production need: 09/12", okay: "Expected 09/10; meets Happy Bean production needs",
  } : {
    title: "采购工作台", copy: "管理采购申请、供应商比价与原料交期。", import: "导入报价", create: "新建采购申请",
    metrics: [["本月采购金额", "较上月 +4.8%"], ["待比价申请", "2 项今日到期"], ["临近到货", "未来 7 天"], ["价格异常", "铝箔涨幅明显"]],
    comparison: "铝箔 12μ · 供应商报价比较", all: "查看全部物料", headers: ["供应商", "本次报价", "较历史价格", "交期", "供应商评分", "建议"], recommend: "推荐",
    tracking: "采购交期追踪", expedite: "催交", late: "供应商预计到货：09/14，SO-2026-0918 生产需求：09/12", okay: "预计 09/10 到货，已满足 Happy Bean 订单排产需求",
  };
  return <div className="work-page"><PageIntro eyebrow="PROCUREMENT DESK" title={l.title} copy={l.copy} actions={<><button className="secondary-button"><FileSpreadsheet size={16} /> {l.import}</button><button className="primary-button">{l.create}</button></>} />
    <section className="metric-strip">{l.metrics.map(([label, note], index) => <MiniMetric key={label} label={label} value={["¥ 5.42M", "6", "9", "3"][index]} note={note} />)}</section>
    <section className="panel"><PanelHead title={l.comparison} action={l.all} /><div className="table-wrap"><table><thead><tr>{l.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{suppliers.map((item) => <tr key={item.supplier}><td><strong>{item.supplier}</strong><small>{item.material}</small></td><td>{item.quote}</td><td className={item.change.startsWith("+8") ? "price-up" : ""}>{item.change}</td><td>{item.delivery}</td><td><span className={`score score-${item.score.charAt(0).toLowerCase()}`}>{item.score}</span></td><td>{item.selected ? <span className="recommended"><CheckCircle2 size={15} /> {l.recommend}</span> : "—"}</td></tr>)}</tbody></table></div></section>
    <section className="panel"><PanelHead title={l.tracking} /><div className="delivery-list"><div className="delivery-warning"><AlertTriangle size={18} /><div><strong>PO-2026-0451 · PE</strong><p>{l.late}</p></div><button className="primary-button compact">{l.expedite}</button></div><div className="delivery-ok"><CheckCircle2 size={18} /><div><strong>PO-2026-0447 · Kraft paper</strong><p>{l.okay}</p></div></div></div></section>
  </div>;
}

function AdminPage({ language }) {
  const l = language === "vi" ? {
    title: "Bàn làm việc Hành chính", copy: "Xử lý tập trung nghỉ phép, đóng dấu hợp đồng, tuyển dụng và thủ tục nhân sự.", create: "Tạo yêu cầu",
    cards: [["Quản lý nghỉ phép", "7 việc chờ xử lý", ["Nguyen Van Minh · Nghỉ phép năm 2 ngày", "Le Thi Hoa · Nghỉ ốm 1 ngày", "Pham Duc Anh · Nghỉ không lương 3 ngày"]], ["Đóng dấu hợp đồng", "3 việc chờ phê duyệt", ["Hợp đồng cung ứng năm · Đóng dấu", "Phụ lục thanh toán NCC · Đóng dấu", "Hợp đồng lao động · Lưu hồ sơ"]], ["Tuyển dụng & nhân sự", "5 việc cần làm", ["Chuyên viên sales · 2 người chờ phỏng vấn", "Tran Minh · Nhận việc 09/12", "Nguyen Quoc · Bàn giao nghỉ việc 09/15"]]],
    recent: "Yêu cầu hành chính gần đây", approvals: "Mở phê duyệt", headers: ["Người yêu cầu", "Nội dung", "Thời gian", "Bước hiện tại", "Trạng thái"], rows: [["Nguyen Van Minh", "Nghỉ phép năm · 2 ngày", "Hôm nay 09:12", "Trưởng kinh doanh phê duyệt", "Chờ phê duyệt"], ["陈明", "Đóng dấu hợp đồng cung ứng", "Hôm qua 16:45", "Tổng giám đốc phê duyệt", "Chờ phê duyệt"], ["Tran Mai", "Yêu cầu nhân viên mới", "Hôm qua 14:20", "Lưu hồ sơ hành chính", "Hoàn thành"]],
  } : language === "en" ? {
    title: "Administration Desk", copy: "Manage leave, contract seals, recruitment, and employee onboarding or offboarding in one place.", create: "New request",
    cards: [["Leave management", "7 items to process", ["Nguyen Van Minh · 2 days annual leave", "Le Thi Hoa · 1 day sick leave", "Pham Duc Anh · 3 days unpaid leave"]], ["Contract seals", "3 items for approval", ["Annual customer supply agreement · Company seal", "Supplier payment addendum · Seal", "Employment agreement · Archive"]], ["Recruitment & HR", "5 tasks", ["Sales specialist · 2 interviews pending", "Tran Minh · Start date 09/12", "Nguyen Quoc · Offboarding 09/15"]]],
    recent: "Recent Administration Requests", approvals: "Open approvals", headers: ["Applicant", "Request", "Submitted", "Current step", "Status"], rows: [["Nguyen Van Minh", "Annual leave · 2 days", "Today 09:12", "Sales lead approval", "Pending"], ["陈明", "Customer contract seal", "Yesterday 16:45", "GM approval", "Pending"], ["Tran Mai", "New employee onboarding", "Yesterday 14:20", "Admin archive", "Completed"]],
  } : {
    title: "行政工作台", copy: "统一处理员工请假、合同用印和人员入离职事项。", create: "新建申请",
    cards: [["请假管理", "7 项待处理", ["Nguyen Van Minh · 年假 2 天", "Le Thi Hoa · 病假 1 天", "Pham Duc Anh · 无薪假 3 天"]], ["合同用印", "3 项待审批", ["客户年度供货合同 · 盖公章", "供应商付款补充协议 · 盖章", "员工劳动合同 · 归档"]], ["招聘与入离职", "5 项待办", ["销售专员 · 2 人待面试", "Tran Minh · 09/12 入职", "Nguyen Quoc · 09/15 离职交接"]]],
    recent: "最近行政申请", approvals: "进入审批中心", headers: ["申请人", "事项", "提交时间", "当前节点", "状态"], rows: [["Nguyen Van Minh", "年假申请 · 2 天", "今天 09:12", "销售负责人审批", "待审批"], ["陈明", "客户供货合同用印", "昨天 16:45", "总经理审批", "待审批"], ["Tran Mai", "新员工入职申请", "昨天 14:20", "行政归档", "已完成"]],
  };
  const icons = [CalendarDays, ReceiptText, UsersRound];
  return <div className="work-page"><PageIntro eyebrow="ADMINISTRATION" title={l.title} copy={l.copy} actions={<button className="primary-button">{l.create}</button>} />
    <section className="three-columns">{l.cards.map(([title, total, items], index) => <AdminCard key={title} icon={icons[index]} color={["#5e80a7", "#b17952", "#4d957e"][index]} title={title} total={total} items={items} language={language} />)}</section>
    <section className="panel"><PanelHead title={l.recent} action={l.approvals} /><div className="table-wrap"><table><thead><tr>{l.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{l.rows.map((row) => <tr key={row[0]}><td>{row[0]}</td><td>{row[1]}</td><td>{row[2]}</td><td>{row[3]}</td><td><Status status={row[4]} risk={row[4] === "已完成" || row[4] === "Completed" || row[4] === "Hoàn thành" ? "normal" : "medium"} /></td></tr>)}</tbody></table></div></section>
  </div>;
}

function AdminCard({ icon: Icon, color, title, total, items, language }) {
  const viewAll = language === "vi" ? "Xem tất cả" : language === "en" ? "View all" : "查看全部";
  return <article className="admin-card"><span className="admin-icon" style={{ color, background: `${color}1a` }}><Icon size={21} /></span><div><p>{title}</p><h2>{total}</h2></div><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul><button>{viewAll} <ChevronDown size={15} /></button></article>;
}

function ApprovalsPage({ language, role }) {
  const text = (zh, en, vi) => ({ zh, en, vi });
  const localize = (value) => value?.[language] || value?.zh || value;
  const [decisions, setDecisions] = useState({});
  const l = language === "vi"
    ? { title: "Phê duyệt của tôi", copy: "Chỉ hiển thị các việc thuộc thẩm quyền xử lý của vai trò hiện tại.", pending: "Chờ tôi xử lý", urgent: "Ưu tiên hôm nay", total: "Trong phạm vi của tôi", approve: "Duyệt", reject: "Trả lại", confirm: "Xác nhận", return: "Yêu cầu bổ sung", approved: "Đã duyệt", returned: "Đã trả lại", summary: "Khuyến nghị AI", advice: "Xem cơ sở đề xuất", scope: "Phạm vi xử lý" }
    : language === "en"
      ? { title: "My Approvals", copy: "Only requests within the current role's authority are shown.", pending: "Awaiting My Action", urgent: "Due Today", total: "In My Scope", approve: "Approve", reject: "Return", confirm: "Confirm", return: "Request Details", approved: "Approved", returned: "Returned", summary: "AI Recommendation", advice: "View recommendation basis", scope: "Approval scope" }
      : { title: "我的审批", copy: "仅展示当前角色有权处理、确认或决策的事项。", pending: "待我处理", urgent: "今日优先", total: "我的审批范围", approve: "批准", reject: "退回", confirm: "确认", return: "补充材料", approved: "已批准", returned: "已退回", summary: "AI 审批建议", advice: "查看建议依据", scope: "审批范围" };

  const items = {
    purchaseRequest: {
      id: "purchaseRequest", priority: "high", value: "¥ 486,000",
      type: text("采购申请", "Purchase request", "Yêu cầu mua hàng"),
      title: text("PR-2026-0318 · PE 原料 18 吨", "PR-2026-0318 · 18t PE material", "PR-2026-0318 · 18 tấn nguyên liệu PE"),
      time: text("今天 10:20", "Today 10:20", "Hôm nay 10:20"),
      route: {
        owner: text("总经理已建议通过 · 等待最终决策", "GM recommends approval · awaiting final decision", "Tổng giám đốc đề xuất duyệt · chờ quyết định cuối"),
        gm: text("采购负责人已提交 · 等待经营审批", "Submitted by procurement lead · awaiting business approval", "Trưởng mua hàng đã gửi · chờ phê duyệt vận hành"),
        procLead: text("采购专员已比价 · 等待采购负责人审批", "Buyer completed comparison · awaiting procurement lead", "Nhân viên đã so sánh giá · chờ trưởng mua hàng duyệt"),
      },
    },
    quoteDiscount: {
      id: "quoteDiscount", priority: "high", value: text("毛利 13.8%", "Margin 13.8%", "Biên lợi nhuận 13,8%"),
      type: text("报价折扣", "Quote discount", "Chiết khấu báo giá"),
      title: text("QT-2026-0877 · GreenBite Packaging", "QT-2026-0877 · GreenBite Packaging", "QT-2026-0877 · GreenBite Packaging"),
      time: text("今天 09:10", "Today 09:10", "Hôm nay 09:10"),
      route: {
        owner: text("总经理已复核 · 低毛利报价待最终决策", "Reviewed by GM · low-margin quote awaits final decision", "Tổng giám đốc đã rà soát · báo giá biên thấp chờ quyết định cuối"),
        gm: text("销售负责人已提交 · 低于常规毛利底线", "Submitted by sales lead · below normal margin floor", "Trưởng kinh doanh đã gửi · thấp hơn mức biên lợi nhuận thông thường"),
        salesLead: text("Nguyen Thi Lan 申请 · 客户预计订单 ¥178,000", "Requested by Nguyen Thi Lan · expected order ¥178,000", "Nguyen Thi Lan đề nghị · đơn hàng dự kiến ¥178.000"),
      },
    },
    contractSeal: {
      id: "contractSeal", priority: "medium", value: text("1 份文件", "1 document", "1 tài liệu"),
      type: text("合同用印", "Contract seal", "Đóng dấu hợp đồng"),
      title: text("CT-2026-0042 · 客户年度供货合同", "CT-2026-0042 · Annual customer supply agreement", "CT-2026-0042 · Hợp đồng cung ứng năm"),
      time: text("昨天 16:45", "Yesterday 16:45", "Hôm qua 16:45"),
      route: {
        owner: text("总经理已审核 · 合同金额 ¥1.20M", "Reviewed by GM · contract value ¥1.20M", "Tổng giám đốc đã rà soát · giá trị hợp đồng ¥1,20M"),
        gm: text("行政已核验文件 · 等待用印授权", "Documents verified by admin · awaiting seal authorization", "Hành chính đã kiểm tra hồ sơ · chờ ủy quyền đóng dấu"),
        admin: text("总经理已批准 · 等待行政盖章与归档", "Approved by GM · awaiting seal and archive", "Tổng giám đốc đã duyệt · chờ hành chính đóng dấu và lưu hồ sơ"),
      },
    },
    supplierOrder: {
      id: "supplierOrder", priority: "medium", value: "¥ 268,000",
      type: text("采购订单", "Supplier purchase order", "Đơn đặt hàng NCC"),
      title: text("PO-2026-0451 · 铝箔 12μ", "PO-2026-0451 · 12μ foil", "PO-2026-0451 · Nhôm 12μ"),
      time: text("今天 14:00", "Today 14:00", "Hôm nay 14:00"),
      route: {
        owner: text("采购负责人已推荐 Golden Star · 需确认替代供应商", "Procurement lead recommends Golden Star · confirm alternate supplier", "Trưởng mua hàng đề xuất Golden Star · cần xác nhận NCC thay thế"),
        gm: text("采购负责人已完成比价 · 交期关系订单 SO-2026-0918", "Procurement lead completed comparison · linked to SO-2026-0918", "Trưởng mua hàng đã so sánh giá · liên quan đơn SO-2026-0918"),
        procLead: text("Pham Huy 已提交比价 · 交期需 09/14 前确认", "Submitted by Pham Huy · lead time must be confirmed before Sep 14", "Pham Huy đã gửi so sánh giá · cần xác nhận giao hàng trước 14/09"),
      },
    },
    leaveRequest: {
      id: "leaveRequest", priority: "normal", value: text("09/12 - 09/13", "Sep 12 - 13", "12/09 - 13/09"),
      type: text("员工请假", "Employee leave", "Nghỉ phép"),
      title: text("Nguyen Van Minh · 年假 2 天", "Nguyen Van Minh · 2 days annual leave", "Nguyen Van Minh · Nghỉ phép năm 2 ngày"),
      time: text("今天 09:12", "Today 09:12", "Hôm nay 09:12"),
      route: {
        salesLead: text("销售员工申请 · 已完成客户交接说明", "Sales representative request · customer handover provided", "Nhân viên kinh doanh đề nghị · đã có thông tin bàn giao khách hàng"),
        admin: text("销售负责人已批准 · 等待考勤确认", "Approved by sales lead · awaiting attendance confirmation", "Trưởng kinh doanh đã duyệt · chờ xác nhận chấm công"),
      },
    },
    headcountRequest: {
      id: "headcountRequest", priority: "medium", value: text("销售专员 2 人", "2 sales specialists", "2 nhân viên kinh doanh"),
      type: text("招聘编制", "Headcount request", "Yêu cầu tuyển dụng"),
      title: text("HR-2026-0068 · 销售团队补充编制", "HR-2026-0068 · Sales team headcount", "HR-2026-0068 · Bổ sung nhân sự kinh doanh"),
      time: text("今天 11:30", "Today 11:30", "Hôm nay 11:30"),
      route: {
        owner: text("总经理已建议通过 · 年度人力预算内", "GM recommends approval · within annual people budget", "Tổng giám đốc đề xuất duyệt · trong ngân sách nhân sự năm"),
        gm: text("行政已提交 · 团队拜访覆盖存在缺口", "Submitted by administration · visit coverage gap identified", "Hành chính đã gửi · thiếu nguồn lực bao phủ lịch thăm gặp"),
        admin: text("人力需求已确认 · 等待招聘启动授权", "Need confirmed · awaiting recruitment authorization", "Nhu cầu nhân sự đã xác nhận · chờ quyền khởi động tuyển dụng"),
      },
    },
  };

  const profiles = {
    owner: {
      scope: text("全公司 · 重大金额与跨部门事项", "Company-wide · major value and cross-functional", "Toàn công ty · giá trị lớn và liên phòng ban"),
      note: text("先处理 PR-2026-0318：它同时影响 Natura Foods 的交期和 PE 原料安全库存。第二优先级是 GreenBite 的低毛利报价，建议在批准前锁定客户预计订单与付款条件。", "Prioritize PR-2026-0318 because it affects both Natura Foods delivery and PE safety stock. Next, validate the expected order and payment terms before approving GreenBite's low-margin quote.", "Ưu tiên PR-2026-0318 vì ảnh hưởng cả giao hàng Natura Foods và tồn kho PE. Tiếp theo, xác nhận giá trị đơn hàng và điều kiện thanh toán trước khi duyệt báo giá biên thấp của GreenBite."),
      ids: ["purchaseRequest", "quoteDiscount", "contractSeal", "supplierOrder", "headcountRequest"], actionMode: "approve",
    },
    gm: {
      scope: text("跨部门 · 经营、合同与资源事项", "Cross-functional · business, contract, and resource requests", "Liên phòng ban · vận hành, hợp đồng và nguồn lực"),
      note: text("采购申请与供应商订单均关联 SO-2026-0918，建议先确认 Golden Star 的库存和到货承诺，再连续完成两项审批。", "Both the purchase request and supplier PO are linked to SO-2026-0918. Confirm Golden Star inventory and delivery commitment first, then clear the two approvals together.", "Yêu cầu mua và đơn đặt NCC đều liên quan SO-2026-0918. Xác nhận tồn kho và cam kết giao hàng của Golden Star trước, sau đó xử lý liền hai việc."),
      ids: ["purchaseRequest", "quoteDiscount", "contractSeal", "supplierOrder", "headcountRequest"], actionMode: "approve",
    },
    salesLead: {
      scope: text("销售部 · 报价例外与团队请假", "Sales · quote exceptions and team leave", "Kinh doanh · ngoại lệ báo giá và nghỉ phép của đội"),
      note: text("GreenBite 报价的毛利为 13.8%，批准前应在客户记录中确认预计订单金额、寄样节点和回款条件；Nguyen Van Minh 的请假已完成客户交接，可正常批准。", "GreenBite's margin is 13.8%. Confirm expected order value, sample milestone, and payment terms before approval. Nguyen Van Minh's customer handover is complete and the leave can be approved.", "Biên lợi nhuận GreenBite là 13,8%. Hãy xác nhận giá trị đơn dự kiến, mốc gửi mẫu và điều khoản thanh toán trước khi duyệt. Bàn giao khách hàng của Nguyen Van Minh đã hoàn tất, có thể duyệt nghỉ phép."),
      ids: ["quoteDiscount", "leaveRequest"], actionMode: "approve",
    },
    procLead: {
      scope: text("采购部 · 采购申请与供应商订单", "Procurement · requests and supplier orders", "Mua hàng · yêu cầu mua và đơn NCC"),
      note: text("先完成 PE 原料申请与铝箔订单的审批。两项都需要在 09/14 前确认交期，避免 SO-2026-0918 的生产计划继续被动。", "Clear the PE request and foil PO first. Both delivery dates must be confirmed before Sep 14 to prevent further impact on SO-2026-0918 production.", "Ưu tiên duyệt yêu cầu PE và đơn nhôm. Cần xác nhận giao hàng trước 14/09 để tránh ảnh hưởng thêm đến kế hoạch sản xuất SO-2026-0918."),
      ids: ["purchaseRequest", "supplierOrder"], actionMode: "approve",
    },
    admin: {
      scope: text("行政部 · 流程确认、用印与人事归档", "Administration · confirmation, sealing, and HR filing", "Hành chính · xác nhận quy trình, đóng dấu và lưu hồ sơ nhân sự"),
      note: text("合同用印已经过总经理批准，应优先完成盖章、扫描和台账归档。请假和招聘事项分别需要更新考勤与招聘台账。", "The contract seal is GM-approved and should be sealed, scanned, and filed first. Then update attendance for the leave request and the recruiting register for headcount.", "Hợp đồng đã được tổng giám đốc duyệt; cần đóng dấu, quét và lưu hồ sơ trước. Sau đó cập nhật chấm công nghỉ phép và sổ theo dõi tuyển dụng."),
      ids: ["contractSeal", "leaveRequest", "headcountRequest"], actionMode: "confirm",
    },
  };

  const profile = profiles[role.id] || profiles.gm;
  const visibleItems = profile.ids.map((id) => items[id]);
  const pendingCount = visibleItems.filter((item) => !decisions[item.id]).length;
  const urgentCount = visibleItems.filter((item) => item.priority === "high" && !decisions[item.id]).length;
  const isConfirmMode = profile.actionMode === "confirm";
  const processDecision = (itemId, status) => setDecisions((current) => ({ ...current, [itemId]: status }));

  return <div className="work-page approval-page">
    <PageIntro eyebrow="APPROVAL CENTER · ROLE-BASED" title={l.title} copy={l.copy} actions={<span className="approval-scope"><ShieldCheck size={15} /> {localize(profile.scope)}</span>} />
    <section className="approval-overview">
      <div><small>{l.pending}</small><strong>{pendingCount}</strong><span>{roleTitle(role.id, language)}</span></div>
      <div><small>{l.urgent}</small><strong>{urgentCount}</strong><span>{localize(profile.scope)}</span></div>
      <div><small>{l.total}</small><strong>{visibleItems.length}</strong><span>{l.scope}</span></div>
    </section>
    <section className="approval-layout">
      <article className="panel">
        <PanelHead title={`${l.pending} · ${pendingCount}`} />
        <div className="approval-list">{visibleItems.map((item) => {
          const decision = decisions[item.id];
          const route = localize(item.route[role.id] || item.route.gm);
          return <div className={`approval-row ${item.priority}`} key={item.id}>
            <span className="approval-type">{localize(item.type)}</span>
            <div><strong>{localize(item.title)}</strong><small>{route} · {localize(item.time)}</small></div>
            <b>{localize(item.value)}</b>
            {decision
              ? <Status status={decision === "approved" ? l.approved : l.returned} risk={decision === "approved" ? "normal" : "medium"} />
              : <div className="approval-actions"><button className="approve" onClick={() => processDecision(item.id, "approved")}>{isConfirmMode ? l.confirm : l.approve}</button><button className="reject" onClick={() => processDecision(item.id, "returned")}>{isConfirmMode ? l.return : l.reject}</button></div>}
          </div>;
        })}</div>
      </article>
      <article className="panel approval-guide">
        <span className="sparkle-box"><Sparkles size={18} /></span>
        <h3>{l.summary}</h3>
        <p>{localize(profile.note)}</p>
        <button className="outline-button"><BarChart3 size={15} /> {l.advice}</button>
      </article>
    </section>
  </div>;
}

function AlertsPage({ language, role }) {
  const [read, setRead] = useState(false);
  const center = getRoleAlertCenter(role.id, language);
  const action = language === "vi" ? (read ? "Đã đánh dấu là đã đọc" : "Đánh dấu đã đọc") : language === "en" ? (read ? "Marked as read" : "Mark all as read") : (read ? "已标为已读" : "全部标为已读");
  const eyebrow = language === "vi" ? `${roleTitle(role.id, language).toUpperCase()} · NHẮC VIỆC` : language === "en" ? `${roleTitle(role.id, language).toUpperCase()} · REMINDERS` : `${roleTitle(role.id, language)} · 待办提醒`;
  return <div className="work-page">
    <PageIntro eyebrow={eyebrow} title={center.title} copy={center.copy} actions={<button className="secondary-button" onClick={() => setRead(true)}><CheckCircle2 size={16} /> {action}</button>} />
    <section className="alert-summary">{center.summary.map((item, index) => <div key={item}><span className={`priority-dot ${["high", "medium", "normal"][index]}`} /><strong>{item}</strong></div>)}</section>
    <section className={`panel role-alert-panel ${read ? "is-read" : ""}`}>
      <div className="role-alert-caption"><Bell size={16} /><span>{language === "vi" ? "Nội dung được lọc theo quyền và công việc của vai trò hiện tại" : language === "en" ? "Items are filtered by the current role's permissions and assigned work" : "内容已按当前角色权限和本人负责事项过滤"}</span></div>
      <div className="alert-list full">{center.items.map((alert) => <AlertRow key={alert.title} alert={alert} />)}</div>
    </section>
  </div>;
}

function AssistantPage({ language, query, setQuery, response, onAsk, onCapture, onSaveRecord, entryPreview }) {
  const s = salesLocale[language];
  const [mode, setMode] = useState("query");
  const suggestions = language === "vi"
    ? ["Đơn hàng nào có rủi ro giao hàng?", "Báo giá nào chưa được theo dõi?", "So sánh giá nhà cung cấp nhôm", "Nhân viên nào chưa hoàn thành thăm gặp?"]
    : language === "en"
      ? ["Which orders have delivery risks?", "Which quotes were not followed up?", "Compare foil supplier quotes", "Who missed key customer visits?"]
      : ["哪些订单有交期风险？", "列出未跟进报价", "比较铝箔供应商报价", "哪些销售员没有完成重点客户拜访？"];
  const recordText = language === "vi" ? "Chiều nay tôi đến thăm GreenBite. Khách quan tâm túi nhôm, dự kiến 180.000 RMB, gửi mẫu trước thứ Sáu." : language === "en" ? "I visited GreenBite this afternoon. They are interested in foil pouches, expected value RMB 180k, and need samples by Friday." : "今天下午上门拜访 GreenBite，客户对铝箔袋有兴趣，预计 18 万，周五前寄样。";
  const placeholder = mode === "record" ? s.aiHint : language === "vi" ? "Ví dụ: Khách hàng nào cần theo dõi hôm nay?" : language === "en" ? "Example: Which accounts need a follow-up today?" : "例如：哪些客户今天需要跟进？";
  return <div className="assistant-page"><PageIntro eyebrow="EPAC INTELLIGENCE · LOCAL DEMO" title={s.assistantTitle} copy={s.assistantCopy} /><div className="assistant-layout"><section className="assistant-chat panel"><div className="assistant-hero"><span className="sparkle-box"><Sparkles size={20} /></span><div><strong>EPAC AI Work Assistant</strong><small>{language === "vi" ? "Chế độ mô phỏng cục bộ · Dữ liệu minh họa" : language === "en" ? "Local simulation mode · Demonstration data" : "本地模拟模式 · 当前使用演示数据"}</small></div></div><div className="assistant-tabs"><button className={mode === "query" ? "active" : ""} onClick={() => setMode("query")}><Search size={15} /> {s.queryMode}</button><button className={mode === "record" ? "active" : ""} onClick={() => { setMode("record"); if (!query) setQuery(recordText); }}><MessageSquareText size={15} /> {s.recordMode}</button></div>{entryPreview ? <RecordPreview language={language} record={entryPreview} onConfirm={onSaveRecord} /> : response ? <div className="chat-response"><span className="bot-avatar">AI</span><div><p>{language === "vi" ? "Phân tích của AI:" : language === "en" ? "AI analysis:" : "已为你分析："}</p><strong>{response}</strong></div></div> : <div className="empty-chat"><MessageSquareText size={30} /><h3>{mode === "record" ? s.aiEntry : language === "vi" ? "Hôm nay bạn muốn biết điều gì?" : language === "en" ? "What would you like to know today?" : "今天想了解什么？"}</h3><p>{mode === "record" ? s.aiHint : language === "vi" ? "Tôi có thể phân tích khách hàng, báo giá, đơn hàng, mua hàng và công nợ." : language === "en" ? "I can analyze customers, quotes, orders, procurement, and collections." : "我可以根据客户、报价、订单、采购和回款数据给出建议。"}</p></div>}<div className="chat-input"><input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === "Enter" && (mode === "record" ? onCapture(query) : onAsk(query))} placeholder={placeholder} /><button onClick={() => mode === "record" ? onCapture(query) : onAsk(query)} aria-label={translations[language].send}><ArrowUpRight size={19} /></button></div></section><aside className="suggestion-panel"><p>{mode === "record" ? s.recordMode : language === "vi" ? "Câu hỏi thường dùng" : language === "en" ? "Common questions" : "常用提问"}</p>{mode === "query" ? suggestions.map((suggestion) => <button key={suggestion} onClick={() => { setQuery(suggestion); onAsk(suggestion); }}>{suggestion}<ChevronDown size={15} /></button>) : <button onClick={() => setQuery(recordText)}>{recordText}<ChevronDown size={15} /></button>}<div className="assistant-note"><Languages size={17} /><span>{language === "vi" ? "Hỗ trợ nhập liệu và tạo bản xem trước bằng tiếng Việt, Trung hoặc Anh." : language === "en" ? "Supports Vietnamese, Chinese, and English input with translated previews." : "支持中英越自然语言录入，并生成可确认的翻译与结构化记录。"}</span></div><div className="assistant-note"><ShieldCheck size={17} /><span>{language === "vi" ? "Bản demo sử dụng dữ liệu mô phỏng; API mô hình bên ngoài sẽ được kết nối ở giai đoạn triển khai chính thức." : language === "en" ? "The demo uses simulated data; an external model API will be connected in the production phase." : "演示版使用模拟数据；正式开发阶段将接入您提供的外部大模型 API。"}</span></div></aside></div></div>;
}

function ImportPage({ language, imported, setImported }) {
  const [stage, setStage] = useState(imported ? 4 : 0);
  const [fileName, setFileName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [processingIndex, setProcessingIndex] = useState(0);
  const [translationRows, setTranslationRows] = useState([
    { customer: "GreenBite Packaging", source: "Thăm gặp trực tiếp · Theo dõi sau báo giá", translated: "上门拜访 · 报价后跟进", amount: "¥180,000", action: "周五前寄样，下周回访" },
    { customer: "Pacific Foods Co.", source: "Đối soát công nợ · Quá hạn thu tiền", translated: "财务对账 · 回款逾期", amount: "¥286,000", action: "今天更新付款承诺" },
    { customer: "Natura Foods", source: "Khách đến nhà máy · Rủi ro giao hàng", translated: "客户来厂验厂 · 交期风险", amount: "¥362,000", action: "跟进 PE 原料到货" },
  ]);
  const l = language === "vi" ? {
    title: "Nhập dữ liệu Excel", copy: "Từng bước nhận diện, dịch, xác nhận và đưa dữ liệu Excel vào quy trình vận hành.",
    choose: "Chọn tệp Excel", demo: "Tải dữ liệu demo tiếng Việt", again: "Chọn tệp khác", sourceLanguage: "Tiếng Việt",
    simulation: "EPAC_du_lieu_ban_hang_demo_tieng_Viet.xlsx", uploadTitle: "Tải dữ liệu nghiệp vụ", uploadCopy: "Hỗ trợ .xlsx, .xls và .csv. Dữ liệu chỉ được xử lý trong môi trường demo cục bộ.",
    steps: ["Chọn tệp", "AI nhận diện", "Xác nhận bản dịch", "Kiểm tra ảnh hưởng", "Xác nhận nhập"],
    recognitionTitle: "AI đang đọc tệp Excel", recognitionCopy: "Vui lòng chờ một chút, AI đang nhận diện cấu trúc và ngôn ngữ gốc.", recognition: ["Đang đọc cấu trúc bảng tính", "Đã nhận diện dữ liệu gốc: Tiếng Việt", "Đang trích xuất khách hàng, hoạt động và giá trị", "Đang dịch nội dung sang tiếng Trung để xác nhận"],
    reviewTitle: "Vui lòng xác nhận bản dịch tiếng Trung", reviewCopy: "AI đã nhận diện dữ liệu nguồn bằng tiếng Việt. Bạn có thể sửa trực tiếp các bản dịch trước khi đi tiếp.", fileRead: "Đã đọc dữ liệu bán hàng tiếng Việt", headers: ["Khách hàng", "Dữ liệu gốc tiếng Việt", "Bản dịch tiếng Trung có thể chỉnh sửa", "Giá trị", "Việc tiếp theo"],
    qualityTitle: "Kết quả nhận diện", quality: ["19/19 trường đã nhận diện", "Nguồn dữ liệu: Tiếng Việt", "0 cột cần ánh xạ thủ công"], translationAccurate: "Bản dịch chính xác, tiếp tục kiểm tra ảnh hưởng", modified: "Đã chỉnh sửa, tiếp tục kiểm tra ảnh hưởng",
    impactTitle: "Kiểm tra ảnh hưởng trước khi nhập", impactCopy: "Hệ thống sẽ chỉ tạo hoặc cập nhật các bản ghi bên dưới; không ghi đè dữ liệu khách hàng đã có.", metrics: [["18", "Hồ sơ bán hàng"], ["10", "Khách hàng"], ["6", "Giai đoạn bán hàng"], ["3", "Rủi ro cần theo dõi"]],
    impact: [["Hồ sơ khách hàng", "10 khách hàng", "Cập nhật cơ hội và lịch sử liên hệ"], ["Hoạt động kinh doanh", "18 hoạt động", "Đưa vào thăm gặp, báo giá, làm mẫu và đối soát"], ["Nhắc việc & rủi ro", "3 cảnh báo", "Đưa vào theo dõi giao hàng và thu tiền"]],
    import: "Xác nhận nhập dữ liệu", doneTitle: "Đã hoàn tất nhập mô phỏng", doneCopy: "Dữ liệu tiếng Việt đã được dịch, xác nhận và cập nhật vào khách hàng, hoạt động bán hàng và danh sách theo dõi.", restart: "Nhập một tệp khác",
  } : language === "en" ? {
    title: "Excel Data Import", copy: "Recognize, translate, confirm, and bring Excel data into the operating workflow step by step.",
    choose: "Choose Excel file", demo: "Load Vietnamese demo data", again: "Choose another file", sourceLanguage: "Vietnamese",
    simulation: "EPAC_du_lieu_ban_hang_demo_tieng_Viet.xlsx", uploadTitle: "Upload business data", uploadCopy: "Supports .xlsx, .xls, and .csv. Data is processed only in this local demo.",
    steps: ["Choose file", "AI recognition", "Confirm translation", "Review impact", "Confirm import"],
    recognitionTitle: "AI is reading the Excel file", recognitionCopy: "Please wait while AI detects the file structure and original language.", recognition: ["Reading worksheet structure", "Original data detected: Vietnamese", "Extracting customers, activities, and values", "Translating content into Chinese for confirmation"],
    reviewTitle: "Please confirm the Chinese translation", reviewCopy: "AI detected Vietnamese source data. You can edit the translations directly before continuing.", fileRead: "Vietnamese sales data has been read", headers: ["Customer", "Vietnamese source data", "Editable Chinese translation", "Value", "Next action"],
    qualityTitle: "Recognition results", quality: ["19/19 fields recognized", "Source data: Vietnamese", "0 columns need manual mapping"], translationAccurate: "Translation is accurate, review impact", modified: "Changes saved, review impact",
    impactTitle: "Review impact before import", impactCopy: "The system will only create or update the records below and will not overwrite existing customer data.", metrics: [["18", "Sales records"], ["10", "Customers"], ["6", "Sales stages"], ["3", "Risks to follow"]],
    impact: [["Customer profiles", "10 customers", "Update opportunities and contact history"], ["Sales activities", "18 activities", "Send to visit, quote, sample, and reconciliation workflows"], ["Reminders & risks", "3 alerts", "Send to delivery and collection follow-up"]],
    import: "Confirm import", doneTitle: "Simulation import complete", doneCopy: "Vietnamese data was translated, confirmed, and updated to customer profiles, sales activities, and follow-up work.", restart: "Import another file",
  } : {
    title: "Excel 数据导入", copy: "让 Excel 数据经过识别、翻译、人工确认和影响检查后，再进入销售经营流程。",
    choose: "选择 Excel 文件", demo: "加载演示越南文数据", again: "选择其他文件", sourceLanguage: "越南文",
    simulation: "EPAC_du_lieu_ban_hang_demo_tieng_Viet.xlsx", uploadTitle: "上传业务数据", uploadCopy: "支持 .xlsx、.xls、.csv 文件，数据仅在本机演示环境处理。",
    steps: ["选择文件", "AI 识别", "确认翻译", "检查影响", "确认导入"],
    recognitionTitle: "AI 正在读取 Excel 文件", recognitionCopy: "请稍候，AI 正在识别表格结构和原始语言。", recognition: ["正在读取工作表结构", "已识别原文语言：越南文", "正在提取客户、活动和金额字段", "正在翻译为中文，等待你确认"],
    reviewTitle: "请确认中文翻译是否准确", reviewCopy: "AI 已识别源数据为越南文。您可以直接修改以下中文翻译，再继续下一步。", fileRead: "已读懂越南文销售数据", headers: ["客户", "越南文原始数据", "可编辑的中文翻译", "预计金额", "导入后的下一步"],
    qualityTitle: "AI 识别结果", quality: ["19 / 19 个字段已识别", "源数据语言：越南文", "0 列需要人工映射"], translationAccurate: "翻译准确，继续检查影响", modified: "已修改翻译，继续检查影响",
    impactTitle: "导入前检查影响", impactCopy: "系统只会创建或更新下列记录，不会覆盖已有客户的现有数据。", metrics: [["18", "销售记录"], ["10", "客户档案"], ["6", "销售阶段"], ["3", "风险待办"]],
    impact: [["客户档案", "10 家客户", "更新客户机会与沟通历史"], ["销售活动", "18 条活动", "进入拜访、报价、打样、对账流程"], ["提醒与风险", "3 项预警", "进入交期与回款跟进清单"]],
    import: "确认导入数据", doneTitle: "模拟导入已完成", doneCopy: "越南文数据已完成翻译、人工确认，并更新至客户档案、销售活动和跟进事项。", restart: "导入另一份文件",
  };

  useEffect(() => {
    if (!processing) return undefined;
    const timers = [
      window.setTimeout(() => setProcessingIndex(1), 700),
      window.setTimeout(() => setProcessingIndex(2), 1500),
      window.setTimeout(() => setProcessingIndex(3), 2450),
      window.setTimeout(() => { setProcessing(false); setStage(2); }, 3500),
    ];
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [processing]);

  const startRecognition = (name) => {
    setFileName(name);
    setImported(false);
    setProcessingIndex(0);
    setStage(1);
    setProcessing(true);
  };
  const restart = () => {
    setImported(false);
    setProcessing(false);
    setProcessingIndex(0);
    setStage(0);
    setFileName("");
  };
  const activeStep = processing ? 1 : stage;
  const updateTranslation = (index, value) => setTranslationRows((rows) => rows.map((row, rowIndex) => rowIndex === index ? { ...row, translated: value } : row));
  const fileLabel = fileName || l.simulation;

  return <div className="work-page excel-import-page">
    <PageIntro eyebrow="EXCEL IMPORT · AI WORKFLOW" title={l.title} copy={l.copy} />
    <section className="import-flow import-flow-modern" aria-label="Excel import workflow">{l.steps.map((step, index) => {
      const complete = stage === 4 || index < activeStep;
      const active = stage !== 4 && index === activeStep;
      return <div className={`import-step ${complete ? "complete" : ""} ${active ? "active" : ""}`} key={step}><span>{complete ? <CheckCircle2 size={16} /> : index + 1}</span><strong>{step}</strong></div>;
    })}</section>

    {stage === 0 && <section className="import-upload-panel import-upload-panel-large">
      <span className="upload-icon"><Upload size={31} /></span>
      <div><h2>{l.uploadTitle}</h2><p>{l.uploadCopy}</p></div>
      <div className="import-upload-actions">
        <input id="excel-demo-upload" className="file-upload-control" type="file" accept=".xlsx,.xls,.csv" aria-label={l.choose} onChange={(event) => { const selected = event.target.files?.[0]; if (selected) startRecognition(selected.name); }} />
        <label className="primary-button" htmlFor="excel-demo-upload">{l.choose}</label>
        <button className="secondary-button" onClick={() => startRecognition(l.simulation)}>{l.demo}</button>
      </div>
    </section>}

    {stage === 1 && <section className="import-recognition-panel" aria-live="polite">
      <div className="import-scan-mark"><FileSpreadsheet size={28} /><i /></div>
      <div className="import-recognition-copy"><p>{fileLabel}</p><h2>{l.recognitionTitle}</h2><span>{l.recognitionCopy}</span></div>
      <div className="recognition-log">{l.recognition.map((item, index) => <div className={index <= processingIndex ? "done" : ""} key={item}><span>{index < processingIndex ? <CheckCircle2 size={15} /> : index === processingIndex ? <i /> : index + 1}</span><strong>{item}</strong>{index === processingIndex && <small>AI</small>}</div>)}</div>
    </section>}

    {stage === 2 && <section className="import-review-layout">
      <article className="panel import-translation-panel">
        <div className="panel-head"><div><p className="eyebrow">{l.sourceLanguage} → 中文</p><h2>{l.reviewTitle}</h2></div><span className="import-source-pill">{l.fileRead}</span></div>
        <p className="translation-review-copy">{l.reviewCopy}</p>
        <div className="source-quality"><div><strong>{l.qualityTitle}</strong>{l.quality.map((item) => <span key={item}><CheckCircle2 size={13} /> {item}</span>)}</div></div>
        <div className="table-wrap import-preview-table editable-translation-table"><table><thead><tr>{l.headers.map((item) => <th key={item}>{item}</th>)}</tr></thead><tbody>{translationRows.map((row, index) => <tr key={row.customer}><td><strong>{row.customer}</strong></td><td>{row.source}</td><td><input value={row.translated} onChange={(event) => updateTranslation(index, event.target.value)} aria-label={`${l.headers[2]} ${row.customer}`} /></td><td>{row.amount}</td><td>{row.action}</td></tr>)}</tbody></table></div>
        <div className="translation-review-actions"><span><Languages size={16} /> {l.sourceLanguage} → 中文</span><button className="primary-button" onClick={() => setStage(3)}>{l.translationAccurate}</button><button className="secondary-button" onClick={() => setStage(3)}>{l.modified}</button></div>
      </article>
    </section>}

    {stage === 3 && <section className="import-impact-layout">
      <section className="import-status-band"><span><CheckCircle2 size={20} /></span><div><strong>{l.reviewTitle}</strong><p>{l.impactCopy}</p><small>{fileLabel}</small></div><button className="secondary-button" onClick={() => setStage(2)}>{l.again}</button></section>
      <section className="import-metrics">{l.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</section>
      <section className="import-analysis-grid"><article className="panel import-impact-panel import-impact-panel-wide"><div className="panel-head"><h2>{l.impactTitle}</h2></div><div>{l.impact.map(([title, count, copy]) => <section key={title}><span><FileSpreadsheet size={18} /></span><div><strong>{title}</strong><p>{copy}</p></div><b>{count}</b></section>)}</div></article>
        <article className="import-confirm-panel"><span><ShieldCheck size={20} /></span><div><strong>{l.impactTitle}</strong><p>{l.impactCopy}</p></div><button className="primary-button" onClick={() => { setImported(true); setStage(4); }}>{l.import}</button></article>
      </section>
    </section>}

    {stage === 4 && <section className="import-complete-panel"><span><CheckCircle2 size={28} /></span><div><p>{fileLabel}</p><h2>{l.doneTitle}</h2><p>{l.doneCopy}</p></div><button className="secondary-button" onClick={restart}>{l.restart}</button></section>}
  </div>;
}

function PageIntro({ eyebrow, title, copy, actions }) {
  return <section className="page-intro"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></div>{actions && <div className="page-actions">{actions}</div>}</section>;
}

function RoleFocusButton({ language, onClick, active = false }) {
  const label = roleFocusCopy.owner[language]?.label || roleFocusCopy.owner.zh.label;
  const activeLabel = language === "zh" ? "工作重点" : language === "en" ? "Work Focus" : "Trọng tâm công việc";
  return <button className={`secondary-button role-focus-trigger ${active ? "is-active" : ""}`} onClick={onClick}><Target size={16} /> {active ? activeLabel : label}</button>;
}

function RoleFocusOverlay({ role, language }) {
  const content = roleFocusCopy[role.id]?.[language] || roleFocusCopy[role.id]?.zh;

  if (!content) return null;
  const heading = language === "zh" ? "工作重点" : language === "en" ? "Work Focus" : "Trọng tâm công việc";

  return <section className="role-focus-screen" aria-label={heading}>
    <div className="role-focus-content">
      <p>{heading}</p>
      <strong>{content.summary}</strong>
      <div className="role-focus-keywords">{content.keywords.map((keyword, index) => <span key={keyword}><i>{index + 1}</i>{keyword}</span>)}</div>
    </div>
  </section>;
}

function MiniMetric({ label, value, note, positive }) {
  return <div className="mini-metric"><p>{label}</p><strong>{value}</strong><small className={positive ? "positive" : ""}>{note}</small></div>;
}

createRoot(document.getElementById("root")).render(<App />);

