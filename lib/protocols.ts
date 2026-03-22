export interface Protocol {
  port: number;
  name: string;
  abbreviation: string;
  description: { fa: string; en: string };
  category: { fa: string; en: string };
  transport: "TCP" | "UDP" | "TCP/UDP";
}

export const protocolsData: Protocol[] = [

  // ═══════════════════════════════════════════
  // === انتقال فایل / File Transfer ===
  // ═══════════════════════════════════════════
  { port: 20, name: "FTP Data", abbreviation: "FTP", description: { fa: "انتقال داده‌های فایل بین کلاینت و سرور", en: "File data transfer between client and server" }, category: { fa: "انتقال فایل", en: "File Transfer" }, transport: "TCP" },
  { port: 21, name: "FTP Control", abbreviation: "FTP", description: { fa: "کانال کنترلی FTP برای مدیریت اتصال", en: "FTP control channel for connection management" }, category: { fa: "انتقال فایل", en: "File Transfer" }, transport: "TCP" },
  { port: 69, name: "TFTP", abbreviation: "TFTP", description: { fa: "انتقال ساده فایل بدون احراز هویت", en: "Simple file transfer without authentication" }, category: { fa: "انتقال فایل", en: "File Transfer" }, transport: "UDP" },
  { port: 115, name: "SFTP", abbreviation: "SFTP", description: { fa: "انتقال امن فایل از طریق SSH", en: "Secure file transfer over SSH" }, category: { fa: "انتقال فایل", en: "File Transfer" }, transport: "TCP" },
  { port: 540, name: "UUCP", abbreviation: "UUCP", description: { fa: "پروتکل کپی یونیکس به یونیکس برای انتقال فایل", en: "Unix-to-Unix Copy Protocol for file transfer" }, category: { fa: "انتقال فایل", en: "File Transfer" }, transport: "TCP" },
  { port: 873, name: "Rsync", abbreviation: "Rsync", description: { fa: "همگام‌سازی و انتقال فایل سریع", en: "Fast file synchronization and transfer" }, category: { fa: "انتقال فایل", en: "File Transfer" }, transport: "TCP" },
  { port: 989, name: "FTPS Data", abbreviation: "FTPS", description: { fa: "انتقال داده FTP با رمزنگاری SSL/TLS", en: "FTP data transfer with SSL/TLS encryption" }, category: { fa: "انتقال فایل", en: "File Transfer" }, transport: "TCP" },
  { port: 990, name: "FTPS Control", abbreviation: "FTPS", description: { fa: "کانال کنترلی FTP امن", en: "Secure FTP control channel" }, category: { fa: "انتقال فایل", en: "File Transfer" }, transport: "TCP" },

  // ═══════════════════════════════════════════
  // === وب / Web ===
  // ═══════════════════════════════════════════
  { port: 70, name: "Gopher", abbreviation: "Gopher", description: { fa: "پروتکل توزیع اطلاعات پیش از وب", en: "Pre-web information distribution protocol" }, category: { fa: "وب", en: "Web" }, transport: "TCP" },
  { port: 80, name: "HTTP", abbreviation: "HTTP", description: { fa: "پروتکل اصلی وب بدون رمزنگاری", en: "Main web protocol without encryption" }, category: { fa: "وب", en: "Web" }, transport: "TCP" },
  { port: 443, name: "HTTPS", abbreviation: "HTTPS", description: { fa: "پروتکل امن وب با SSL/TLS", en: "Secure web protocol with SSL/TLS" }, category: { fa: "وب", en: "Web" }, transport: "TCP" },
  { port: 591, name: "FileMaker Web", abbreviation: "FileMaker", description: { fa: "اشتراک وب FileMaker (HTTP جایگزین)", en: "FileMaker web sharing (HTTP alternate)" }, category: { fa: "وب", en: "Web" }, transport: "TCP" },
  { port: 8008, name: "HTTP Alt 3", abbreviation: "HTTP-Alt3", description: { fa: "پورت جایگزین HTTP سوم", en: "Third alternative HTTP port" }, category: { fa: "وب", en: "Web" }, transport: "TCP" },
  { port: 8080, name: "HTTP Alternate", abbreviation: "HTTP-Alt", description: { fa: "پورت جایگزین HTTP برای پراکسی و توسعه", en: "Alternative HTTP port for proxy and development" }, category: { fa: "وب", en: "Web" }, transport: "TCP" },
  { port: 8443, name: "HTTPS Alternate", abbreviation: "HTTPS-Alt", description: { fa: "پورت جایگزین HTTPS", en: "Alternative HTTPS port" }, category: { fa: "وب", en: "Web" }, transport: "TCP" },
  { port: 8888, name: "HTTP Alt 2", abbreviation: "HTTP-Alt2", description: { fa: "پورت جایگزین دیگر برای سرویس‌های وب و Jupyter", en: "Another alternative port for web services and Jupyter" }, category: { fa: "وب", en: "Web" }, transport: "TCP" },

  // ═══════════════════════════════════════════
  // === ایمیل / Email ===
  // ═══════════════════════════════════════════
  { port: 25, name: "SMTP", abbreviation: "SMTP", description: { fa: "ارسال ایمیل بین سرورها", en: "Email transfer between servers" }, category: { fa: "ایمیل", en: "Email" }, transport: "TCP" },
  { port: 109, name: "POP2", abbreviation: "POP2", description: { fa: "پروتکل پست الکترونیک نسخه ۲ (منسوخ)", en: "Post Office Protocol version 2 (obsolete)" }, category: { fa: "ایمیل", en: "Email" }, transport: "TCP" },
  { port: 110, name: "POP3", abbreviation: "POP3", description: { fa: "دریافت ایمیل از سرور (حذف از سرور)", en: "Retrieve email from server (removed from server)" }, category: { fa: "ایمیل", en: "Email" }, transport: "TCP" },
  { port: 143, name: "IMAP", abbreviation: "IMAP", description: { fa: "دسترسی و همگام‌سازی ایمیل‌ها", en: "Email access and synchronization" }, category: { fa: "ایمیل", en: "Email" }, transport: "TCP" },
  { port: 220, name: "IMAP3", abbreviation: "IMAP3", description: { fa: "IMAP نسخه ۳", en: "Internet Message Access Protocol version 3" }, category: { fa: "ایمیل", en: "Email" }, transport: "TCP" },
  { port: 366, name: "ODMR", abbreviation: "ODMR", description: { fa: "رله ایمیل بر اساس تقاضا", en: "On-Demand Mail Relay" }, category: { fa: "ایمیل", en: "Email" }, transport: "TCP" },
  { port: 465, name: "SMTPS", abbreviation: "SMTPS", description: { fa: "ارسال ایمیل امن با SSL", en: "Secure email sending with SSL" }, category: { fa: "ایمیل", en: "Email" }, transport: "TCP" },
  { port: 587, name: "SMTP Submission", abbreviation: "SMTP-Sub", description: { fa: "ارسال ایمیل از کلاینت با احراز هویت", en: "Email submission from client with authentication" }, category: { fa: "ایمیل", en: "Email" }, transport: "TCP" },
  { port: 993, name: "IMAPS", abbreviation: "IMAPS", description: { fa: "دسترسی امن به ایمیل با SSL/TLS", en: "Secure email access with SSL/TLS" }, category: { fa: "ایمیل", en: "Email" }, transport: "TCP" },
  { port: 995, name: "POP3S", abbreviation: "POP3S", description: { fa: "دریافت امن ایمیل با SSL/TLS", en: "Secure email retrieval with SSL/TLS" }, category: { fa: "ایمیل", en: "Email" }, transport: "TCP" },

  // ═══════════════════════════════════════════
  // === امنیت / Security ===
  // ═══════════════════════════════════════════
  { port: 22, name: "SSH", abbreviation: "SSH", description: { fa: "اتصال امن رمزنگاری‌شده به سرور", en: "Secure encrypted connection to server" }, category: { fa: "امنیت", en: "Security" }, transport: "TCP" },
  { port: 49, name: "TACACS+", abbreviation: "TACACS+", description: { fa: "احراز هویت و مجوزدهی تجهیزات شبکه", en: "Network device authentication and authorization" }, category: { fa: "امنیت", en: "Security" }, transport: "TCP" },
  { port: 88, name: "Kerberos", abbreviation: "Kerberos", description: { fa: "احراز هویت شبکه‌ای امن", en: "Secure network authentication" }, category: { fa: "امنیت", en: "Security" }, transport: "TCP/UDP" },
  { port: 318, name: "TSP", abbreviation: "TSP", description: { fa: "پروتکل تایم‌استمپ PKIX", en: "PKIX Time Stamp Protocol" }, category: { fa: "امنیت", en: "Security" }, transport: "TCP" },
  { port: 464, name: "Kpasswd", abbreviation: "Kpasswd", description: { fa: "تغییر رمز Kerberos", en: "Kerberos change/set password" }, category: { fa: "امنیت", en: "Security" }, transport: "TCP/UDP" },
  { port: 500, name: "IKE/IPSec", abbreviation: "IKE", description: { fa: "تبادل کلید اینترنتی برای VPN", en: "Internet Key Exchange for VPN" }, category: { fa: "امنیت", en: "Security" }, transport: "UDP" },
  { port: 636, name: "LDAPS", abbreviation: "LDAPS", description: { fa: "LDAP امن با SSL/TLS", en: "Secure LDAP with SSL/TLS" }, category: { fa: "امنیت", en: "Security" }, transport: "TCP" },
  { port: 749, name: "Kerberos Admin", abbreviation: "Kerb-Admin", description: { fa: "مدیریت Kerberos", en: "Kerberos administration" }, category: { fa: "امنیت", en: "Security" }, transport: "TCP/UDP" },
  { port: 992, name: "Telnet TLS", abbreviation: "Telnet-TLS", description: { fa: "Telnet رمزنگاری‌شده با TLS/SSL", en: "Telnet encrypted with TLS/SSL" }, category: { fa: "امنیت", en: "Security" }, transport: "TCP" },
  { port: 1194, name: "OpenVPN", abbreviation: "OpenVPN", description: { fa: "VPN متن‌باز و امن", en: "Open-source secure VPN" }, category: { fa: "امنیت", en: "Security" }, transport: "TCP/UDP" },
  { port: 1701, name: "L2TP", abbreviation: "L2TP", description: { fa: "پروتکل تونل‌زنی لایه ۲", en: "Layer 2 Tunneling Protocol" }, category: { fa: "امنیت", en: "Security" }, transport: "UDP" },
  { port: 1723, name: "PPTP", abbreviation: "PPTP", description: { fa: "پروتکل تونل‌زنی نقطه به نقطه", en: "Point-to-Point Tunneling Protocol" }, category: { fa: "امنیت", en: "Security" }, transport: "TCP" },
  { port: 1812, name: "RADIUS Auth", abbreviation: "RADIUS", description: { fa: "احراز هویت مرکزی RADIUS", en: "RADIUS central authentication" }, category: { fa: "امنیت", en: "Security" }, transport: "UDP" },
  { port: 1813, name: "RADIUS Acct", abbreviation: "RADIUS-Acc", description: { fa: "حسابداری RADIUS", en: "RADIUS accounting" }, category: { fa: "امنیت", en: "Security" }, transport: "UDP" },
  { port: 2222, name: "SSH Alternate", abbreviation: "SSH-Alt", description: { fa: "پورت جایگزین SSH برای امنیت بیشتر", en: "Alternative SSH port for extra security" }, category: { fa: "امنیت", en: "Security" }, transport: "TCP" },
  { port: 4500, name: "IPSec NAT-T", abbreviation: "NAT-T", description: { fa: "عبور IPSec از NAT", en: "IPSec NAT Traversal" }, category: { fa: "امنیت", en: "Security" }, transport: "UDP" },
  { port: 51820, name: "WireGuard", abbreviation: "WireGuard", description: { fa: "VPN مدرن و سریع", en: "Modern fast VPN protocol" }, category: { fa: "امنیت", en: "Security" }, transport: "UDP" },

  // ═══════════════════════════════════════════
  // === دسترسی از راه دور / Remote Access ===
  // ═══════════════════════════════════════════
  { port: 23, name: "Telnet", abbreviation: "Telnet", description: { fa: "دسترسی از راه دور بدون رمزنگاری", en: "Remote access without encryption" }, category: { fa: "دسترسی از راه دور", en: "Remote Access" }, transport: "TCP" },
  { port: 512, name: "Rexec", abbreviation: "Rexec", description: { fa: "اجرای فرآیند از راه دور (منسوخ)", en: "Remote process execution (legacy)" }, category: { fa: "دسترسی از راه دور", en: "Remote Access" }, transport: "TCP" },
  { port: 513, name: "Rlogin", abbreviation: "Rlogin", description: { fa: "ورود از راه دور به سیستم یونیکس (منسوخ)", en: "Remote login to Unix systems (legacy)" }, category: { fa: "دسترسی از راه دور", en: "Remote Access" }, transport: "TCP" },
  { port: 514, name: "RSH", abbreviation: "RSH", description: { fa: "اجرای دستور از راه دور (منسوخ)", en: "Remote shell command execution (legacy)" }, category: { fa: "دسترسی از راه دور", en: "Remote Access" }, transport: "TCP" },
  { port: 2049, name: "NFS", abbreviation: "NFS", description: { fa: "سیستم فایل شبکه‌ای (لینوکس/یونیکس)", en: "Network File System (Linux/Unix)" }, category: { fa: "دسترسی از راه دور", en: "Remote Access" }, transport: "TCP/UDP" },
  { port: 3389, name: "RDP", abbreviation: "RDP", description: { fa: "دسکتاپ از راه دور ویندوز", en: "Windows Remote Desktop" }, category: { fa: "دسترسی از راه دور", en: "Remote Access" }, transport: "TCP/UDP" },
  { port: 5800, name: "VNC Web", abbreviation: "VNC-Web", description: { fa: "دسترسی گرافیکی از راه دور از طریق HTTP", en: "Remote graphical access via HTTP" }, category: { fa: "دسترسی از راه دور", en: "Remote Access" }, transport: "TCP" },
  { port: 5900, name: "VNC", abbreviation: "VNC", description: { fa: "دسترسی گرافیکی از راه دور", en: "Remote graphical access" }, category: { fa: "دسترسی از راه دور", en: "Remote Access" }, transport: "TCP" },
  { port: 5938, name: "TeamViewer", abbreviation: "TeamViewer", description: { fa: "نرم‌افزار کنترل از راه دور", en: "Remote control software" }, category: { fa: "دسترسی از راه دور", en: "Remote Access" }, transport: "TCP/UDP" },

  // ═══════════════════════════════════════════
  // === سرویس‌های شبکه / Network Services ===
  // ═══════════════════════════════════════════
  { port: 7, name: "Echo", abbreviation: "Echo", description: { fa: "سرویس اکو برای تست اتصال", en: "Echo service for connection testing" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "TCP/UDP" },
  { port: 9, name: "Discard", abbreviation: "Discard", description: { fa: "سرویس حذف داده برای تست", en: "Data discard service for testing" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "TCP/UDP" },
  { port: 13, name: "Daytime", abbreviation: "Daytime", description: { fa: "سرویس نمایش تاریخ و ساعت", en: "Date and time display service" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "TCP/UDP" },
  { port: 17, name: "QOTD", abbreviation: "QOTD", description: { fa: "سرویس نقل‌قول روزانه", en: "Quote of the Day service" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "TCP/UDP" },
  { port: 19, name: "CHARGEN", abbreviation: "CHARGEN", description: { fa: "تولیدکننده کاراکتر برای تست شبکه", en: "Character generator for network testing" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "TCP/UDP" },
  { port: 37, name: "Time Protocol", abbreviation: "Time", description: { fa: "پروتکل زمان ساده", en: "Simple time protocol" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "TCP/UDP" },
  { port: 42, name: "WINS", abbreviation: "WINS", description: { fa: "سرویس نام میزبان ویندوز", en: "Windows Internet Name Service" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "TCP/UDP" },
  { port: 43, name: "WHOIS", abbreviation: "WHOIS", description: { fa: "جستجوی اطلاعات دامنه و IP", en: "Domain and IP information lookup" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "TCP" },
  { port: 53, name: "DNS", abbreviation: "DNS", description: { fa: "تبدیل نام دامنه به آدرس IP", en: "Domain name to IP address resolution" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "TCP/UDP" },
  { port: 67, name: "DHCP Server", abbreviation: "DHCP", description: { fa: "تخصیص خودکار IP توسط سرور", en: "Automatic IP assignment by server" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "UDP" },
  { port: 68, name: "DHCP Client", abbreviation: "DHCP", description: { fa: "دریافت تنظیمات شبکه از سرور DHCP", en: "Receive network settings from DHCP server" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "UDP" },
  { port: 79, name: "Finger", abbreviation: "Finger", description: { fa: "دریافت اطلاعات کاربران از سرور", en: "Retrieve user information from server" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "TCP" },
  { port: 111, name: "ONC RPC", abbreviation: "RPC", description: { fa: "فراخوانی روش از راه دور، پایه NFS", en: "Remote Procedure Call, foundation for NFS" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "TCP/UDP" },
  { port: 113, name: "Ident", abbreviation: "Ident", description: { fa: "شناسایی کاربر پشت اتصال TCP", en: "Identify user behind a TCP connection" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "TCP" },
  { port: 119, name: "NNTP", abbreviation: "NNTP", description: { fa: "پروتکل انتقال اخبار شبکه", en: "Network News Transfer Protocol" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "TCP" },
  { port: 123, name: "NTP", abbreviation: "NTP", description: { fa: "همگام‌سازی ساعت سیستم‌ها در شبکه", en: "Network time synchronization" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "UDP" },
  { port: 177, name: "XDMCP", abbreviation: "XDMCP", description: { fa: "پروتکل کنترل مدیریت X Display", en: "X Display Manager Control Protocol" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "TCP/UDP" },
  { port: 179, name: "BGP", abbreviation: "BGP", description: { fa: "پروتکل مسیریابی مرزی", en: "Border Gateway Protocol" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "TCP" },
  { port: 319, name: "PTP Event", abbreviation: "PTP", description: { fa: "پروتکل زمان دقیق - پیام‌های رویداد", en: "Precision Time Protocol event messages" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "UDP" },
  { port: 320, name: "PTP General", abbreviation: "PTP", description: { fa: "پروتکل زمان دقیق - پیام‌های عمومی", en: "Precision Time Protocol general messages" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "UDP" },
  { port: 427, name: "SLP", abbreviation: "SLP", description: { fa: "پروتکل مکان‌یابی سرویس", en: "Service Location Protocol" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "TCP/UDP" },
  { port: 514, name: "Syslog", abbreviation: "Syslog", description: { fa: "ثبت و ارسال لاگ‌های سیستم", en: "System log collection and forwarding" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "UDP" },
  { port: 520, name: "RIP", abbreviation: "RIP", description: { fa: "پروتکل اطلاعات مسیریابی", en: "Routing Information Protocol" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "UDP" },
  { port: 521, name: "RIPng", abbreviation: "RIPng", description: { fa: "پروتکل مسیریابی RIP نسل بعد برای IPv6", en: "Routing Information Protocol next generation for IPv6" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "UDP" },
  { port: 546, name: "DHCPv6 Client", abbreviation: "DHCPv6", description: { fa: "کلاینت DHCP برای IPv6", en: "DHCP client for IPv6" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "UDP" },
  { port: 547, name: "DHCPv6 Server", abbreviation: "DHCPv6-S", description: { fa: "سرور DHCP برای IPv6", en: "DHCP server for IPv6" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "UDP" },
  { port: 563, name: "NNTPS", abbreviation: "NNTPS", description: { fa: "پروتکل انتقال اخبار امن با SSL", en: "Secure Network News Transfer Protocol over SSL" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "TCP" },
  { port: 601, name: "Syslog TLS", abbreviation: "Syslog-TLS", description: { fa: "سرویس سیستم‌لاگ مطمئن", en: "Reliable Syslog Service" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "TCP" },
  { port: 647, name: "DHCP Failover", abbreviation: "DHCP-FO", description: { fa: "پروتکل پشتیبانی DHCP", en: "DHCP Failover protocol" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "TCP" },
  { port: 700, name: "EPP", abbreviation: "EPP", description: { fa: "پروتکل ثبت دامنه گسترش‌پذیر", en: "Extensible Provisioning Protocol for domain registrars" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "TCP" },
  { port: 847, name: "DHCP Failover 2", abbreviation: "DHCP-FO2", description: { fa: "پروتکل پشتیبانی DHCP (نسخه ۲)", en: "DHCP Failover protocol (version 2)" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "TCP" },
  { port: 853, name: "DNS over TLS", abbreviation: "DoT", description: { fa: "DNS رمزنگاری‌شده با TLS", en: "Encrypted DNS with TLS" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "TCP" },
  { port: 953, name: "RNDC", abbreviation: "RNDC", description: { fa: "کنترل از راه دور BIND DNS", en: "BIND Remote Name Daemon Control" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "TCP" },
  { port: 5353, name: "mDNS", abbreviation: "mDNS", description: { fa: "DNS چندپخشی برای شبکه محلی", en: "Multicast DNS for local network" }, category: { fa: "سرویس‌های شبکه", en: "Network Services" }, transport: "UDP" },

  // ═══════════════════════════════════════════
  // === مدیریت شبکه / Network Management ===
  // ═══════════════════════════════════════════
  { port: 161, name: "SNMP", abbreviation: "SNMP", description: { fa: "مانیتورینگ و مدیریت تجهیزات شبکه", en: "Network device monitoring and management" }, category: { fa: "مدیریت شبکه", en: "Network Management" }, transport: "UDP" },
  { port: 162, name: "SNMP Trap", abbreviation: "SNMP-Trap", description: { fa: "دریافت هشدارهای SNMP", en: "Receive SNMP alert notifications" }, category: { fa: "مدیریت شبکه", en: "Network Management" }, transport: "UDP" },
  { port: 623, name: "IPMI", abbreviation: "IPMI", description: { fa: "مدیریت از راه دور سرور بدون سیستم‌عامل", en: "Remote server management without OS" }, category: { fa: "مدیریت شبکه", en: "Network Management" }, transport: "UDP" },
  { port: 646, name: "LDP", abbreviation: "LDP", description: { fa: "پروتکل توزیع برچسب MPLS", en: "Label Distribution Protocol for MPLS" }, category: { fa: "مدیریت شبکه", en: "Network Management" }, transport: "TCP" },
  { port: 698, name: "OLSR", abbreviation: "OLSR", description: { fa: "مسیریابی بهینه وضعیت لینک", en: "Optimized Link State Routing protocol" }, category: { fa: "مدیریت شبکه", en: "Network Management" }, transport: "UDP" },
  { port: 711, name: "Cisco TDP", abbreviation: "TDP", description: { fa: "پروتکل توزیع تگ Cisco (جایگزین شده توسط LDP)", en: "Cisco Tag Distribution Protocol (replaced by LDP)" }, category: { fa: "مدیریت شبکه", en: "Network Management" }, transport: "TCP" },
  { port: 830, name: "NETCONF", abbreviation: "NETCONF", description: { fa: "پیکربندی تجهیزات شبکه با XML", en: "Network device configuration with XML" }, category: { fa: "مدیریت شبکه", en: "Network Management" }, transport: "TCP" },

  // ═══════════════════════════════════════════
  // === دایرکتوری / Directory ===
  // ═══════════════════════════════════════════
  { port: 389, name: "LDAP", abbreviation: "LDAP", description: { fa: "دسترسی به سرویس دایرکتوری", en: "Directory service access protocol" }, category: { fa: "دایرکتوری", en: "Directory" }, transport: "TCP/UDP" },

  // ═══════════════════════════════════════════
  // === پایگاه داده / Database ===
  // ═══════════════════════════════════════════
  { port: 1433, name: "MS SQL Server", abbreviation: "MSSQL", description: { fa: "پایگاه داده مایکروسافت SQL Server", en: "Microsoft SQL Server database" }, category: { fa: "پایگاه داده", en: "Database" }, transport: "TCP" },
  { port: 1434, name: "MSSQL Monitor", abbreviation: "MSSQL-M", description: { fa: "مانیتور SQL Server، کشف نمونه", en: "SQL Server Monitor, instance discovery" }, category: { fa: "پایگاه داده", en: "Database" }, transport: "UDP" },
  { port: 1521, name: "Oracle DB", abbreviation: "Oracle", description: { fa: "پایگاه داده اوراکل", en: "Oracle database system" }, category: { fa: "پایگاه داده", en: "Database" }, transport: "TCP" },
  { port: 3306, name: "MySQL", abbreviation: "MySQL", description: { fa: "پایگاه داده رابطه‌ای متن‌باز محبوب", en: "Popular open-source relational database" }, category: { fa: "پایگاه داده", en: "Database" }, transport: "TCP" },
  { port: 5432, name: "PostgreSQL", abbreviation: "PostgreSQL", description: { fa: "پایگاه داده رابطه‌ای قدرتمند متن‌باز", en: "Powerful open-source relational database" }, category: { fa: "پایگاه داده", en: "Database" }, transport: "TCP" },
  { port: 5984, name: "CouchDB", abbreviation: "CouchDB", description: { fa: "پایگاه داده NoSQL با رابط HTTP", en: "NoSQL database with HTTP interface" }, category: { fa: "پایگاه داده", en: "Database" }, transport: "TCP" },
  { port: 6379, name: "Redis", abbreviation: "Redis", description: { fa: "ذخیره‌سازی داده در حافظه (کش)", en: "In-memory data store (cache)" }, category: { fa: "پایگاه داده", en: "Database" }, transport: "TCP" },
  { port: 6380, name: "Redis TLS", abbreviation: "Redis-TLS", description: { fa: "Redis با رمزنگاری TLS", en: "Redis with TLS encryption" }, category: { fa: "پایگاه داده", en: "Database" }, transport: "TCP" },
  { port: 7474, name: "Neo4j", abbreviation: "Neo4j", description: { fa: "پایگاه داده گرافی", en: "Graph database" }, category: { fa: "پایگاه داده", en: "Database" }, transport: "TCP" },
  { port: 8086, name: "InfluxDB", abbreviation: "InfluxDB", description: { fa: "پایگاه داده سری زمانی", en: "Time series database" }, category: { fa: "پایگاه داده", en: "Database" }, transport: "TCP" },
  { port: 9042, name: "Cassandra", abbreviation: "Cassandra", description: { fa: "پایگاه داده توزیع‌شده NoSQL", en: "Distributed NoSQL database" }, category: { fa: "پایگاه داده", en: "Database" }, transport: "TCP" },
  { port: 9200, name: "Elasticsearch", abbreviation: "ES", description: { fa: "موتور جستجو و تحلیل داده", en: "Search and analytics engine" }, category: { fa: "پایگاه داده", en: "Database" }, transport: "TCP" },
  { port: 9300, name: "Elasticsearch Cluster", abbreviation: "ES-Cluster", description: { fa: "ارتباط داخلی کلاستر Elasticsearch", en: "Elasticsearch cluster internal communication" }, category: { fa: "پایگاه داده", en: "Database" }, transport: "TCP" },
  { port: 11211, name: "Memcached", abbreviation: "Memcached", description: { fa: "سیستم کشینگ توزیع‌شده در حافظه", en: "Distributed in-memory caching system" }, category: { fa: "پایگاه داده", en: "Database" }, transport: "TCP/UDP" },
  { port: 27017, name: "MongoDB", abbreviation: "MongoDB", description: { fa: "پایگاه داده NoSQL سندگرا", en: "Document-oriented NoSQL database" }, category: { fa: "پایگاه داده", en: "Database" }, transport: "TCP" },
  { port: 27018, name: "MongoDB Shard", abbreviation: "MongoDB-S", description: { fa: "شاردینگ MongoDB", en: "MongoDB shard process" }, category: { fa: "پایگاه داده", en: "Database" }, transport: "TCP" },
  { port: 27019, name: "MongoDB Config", abbreviation: "MongoDB-C", description: { fa: "پیکربندی MongoDB", en: "MongoDB config server" }, category: { fa: "پایگاه داده", en: "Database" }, transport: "TCP" },
  { port: 28015, name: "RethinkDB", abbreviation: "RethinkDB", description: { fa: "پایگاه داده بلادرنگ برای برنامه‌های وب", en: "Real-time database for web applications" }, category: { fa: "پایگاه داده", en: "Database" }, transport: "TCP" },

  // ═══════════════════════════════════════════
  // === صف پیام / Message Queue ===
  // ═══════════════════════════════════════════
  { port: 1883, name: "MQTT", abbreviation: "MQTT", description: { fa: "پروتکل پیام‌رسانی سبک برای IoT", en: "Lightweight messaging protocol for IoT" }, category: { fa: "صف پیام", en: "Message Queue" }, transport: "TCP" },
  { port: 4369, name: "EPMD", abbreviation: "EPMD", description: { fa: "دیمون نگاشت پورت Erlang - برای RabbitMQ", en: "Erlang Port Mapper Daemon - used by RabbitMQ" }, category: { fa: "صف پیام", en: "Message Queue" }, transport: "TCP" },
  { port: 5671, name: "AMQPS", abbreviation: "AMQPS", description: { fa: "پروتکل صف پیام پیشرفته با TLS", en: "Advanced Message Queuing Protocol with TLS" }, category: { fa: "صف پیام", en: "Message Queue" }, transport: "TCP" },
  { port: 5672, name: "RabbitMQ", abbreviation: "AMQP", description: { fa: "پروتکل صف پیام پیشرفته", en: "Advanced Message Queuing Protocol" }, category: { fa: "صف پیام", en: "Message Queue" }, transport: "TCP" },
  { port: 8883, name: "MQTT over TLS", abbreviation: "MQTTS", description: { fa: "MQTT امن با رمزنگاری TLS", en: "Secure MQTT with TLS encryption" }, category: { fa: "صف پیام", en: "Message Queue" }, transport: "TCP" },
  { port: 9092, name: "Apache Kafka", abbreviation: "Kafka", description: { fa: "پلتفرم پردازش جریان داده", en: "Data stream processing platform" }, category: { fa: "صف پیام", en: "Message Queue" }, transport: "TCP" },
  { port: 15672, name: "RabbitMQ UI", abbreviation: "AMQP-UI", description: { fa: "رابط وب مدیریت RabbitMQ", en: "RabbitMQ management web interface" }, category: { fa: "صف پیام", en: "Message Queue" }, transport: "TCP" },
  { port: 61613, name: "ActiveMQ STOMP", abbreviation: "STOMP", description: { fa: "پروتکل STOMP برای ActiveMQ", en: "STOMP protocol for ActiveMQ" }, category: { fa: "صف پیام", en: "Message Queue" }, transport: "TCP" },
  { port: 61614, name: "ActiveMQ WS", abbreviation: "ActiveMQ-WS", description: { fa: "ActiveMQ از طریق WebSocket", en: "ActiveMQ over WebSocket" }, category: { fa: "صف پیام", en: "Message Queue" }, transport: "TCP" },
  { port: 61616, name: "ActiveMQ", abbreviation: "ActiveMQ", description: { fa: "واسط پیام‌رسانی متن‌باز آپاچی", en: "Apache open-source message broker" }, category: { fa: "صف پیام", en: "Message Queue" }, transport: "TCP" },

  // ═══════════════════════════════════════════
  // === رسانه و ارتباطات / Media & Communication ===
  // ═══════════════════════════════════════════
  { port: 554, name: "RTSP", abbreviation: "RTSP", description: { fa: "پخش جریانی رسانه در زمان واقعی", en: "Real-time media streaming" }, category: { fa: "رسانه و ارتباطات", en: "Media & Communication" }, transport: "TCP/UDP" },
  { port: 1935, name: "RTMP", abbreviation: "RTMP", description: { fa: "پخش زنده ویدیو (فلش)", en: "Live video streaming (Flash)" }, category: { fa: "رسانه و ارتباطات", en: "Media & Communication" }, transport: "TCP" },
  { port: 3478, name: "STUN/TURN", abbreviation: "STUN", description: { fa: "عبور از NAT برای ارتباطات P2P", en: "NAT traversal for P2P communications" }, category: { fa: "رسانه و ارتباطات", en: "Media & Communication" }, transport: "TCP/UDP" },
  { port: 4569, name: "IAX2", abbreviation: "IAX2", description: { fa: "پروتکل ارتباط Asterisk VoIP", en: "Asterisk VoIP communication protocol" }, category: { fa: "رسانه و ارتباطات", en: "Media & Communication" }, transport: "UDP" },
  { port: 5060, name: "SIP", abbreviation: "SIP", description: { fa: "پروتکل شروع نشست VoIP", en: "Session Initiation Protocol for VoIP" }, category: { fa: "رسانه و ارتباطات", en: "Media & Communication" }, transport: "TCP/UDP" },
  { port: 5061, name: "SIP TLS", abbreviation: "SIPS", description: { fa: "SIP امن با TLS", en: "Secure SIP with TLS" }, category: { fa: "رسانه و ارتباطات", en: "Media & Communication" }, transport: "TCP" },

  // ═══════════════════════════════════════════
  // === اشتراک‌گذاری / Sharing ===
  // ═══════════════════════════════════════════
  { port: 137, name: "NetBIOS Name", abbreviation: "NetBIOS", description: { fa: "سرویس نام NetBIOS", en: "NetBIOS Name Service" }, category: { fa: "اشتراک‌گذاری", en: "Sharing" }, transport: "TCP/UDP" },
  { port: 138, name: "NetBIOS Datagram", abbreviation: "NetBIOS", description: { fa: "سرویس دیتاگرام NetBIOS", en: "NetBIOS Datagram Service" }, category: { fa: "اشتراک‌گذاری", en: "Sharing" }, transport: "UDP" },
  { port: 139, name: "NetBIOS Session", abbreviation: "NetBIOS", description: { fa: "سرویس نشست NetBIOS", en: "NetBIOS Session Service" }, category: { fa: "اشتراک‌گذاری", en: "Sharing" }, transport: "TCP" },
  { port: 445, name: "SMB/CIFS", abbreviation: "SMB", description: { fa: "اشتراک‌گذاری فایل و پرینتر در ویندوز", en: "Windows file and printer sharing" }, category: { fa: "اشتراک‌گذاری", en: "Sharing" }, transport: "TCP" },
  { port: 548, name: "AFP", abbreviation: "AFP", description: { fa: "پروتکل فایل Apple برای macOS", en: "Apple Filing Protocol for macOS" }, category: { fa: "اشتراک‌گذاری", en: "Sharing" }, transport: "TCP" },

  // ═══════════════════════════════════════════
  // === پراکسی / Proxy ===
  // ═══════════════════════════════════════════
  { port: 1080, name: "SOCKS Proxy", abbreviation: "SOCKS", description: { fa: "پراکسی SOCKS برای عبور ترافیک", en: "SOCKS proxy for traffic routing" }, category: { fa: "پراکسی", en: "Proxy" }, transport: "TCP" },
  { port: 3128, name: "Squid Proxy", abbreviation: "Squid", description: { fa: "پراکسی وب Squid", en: "Squid web proxy" }, category: { fa: "پراکسی", en: "Proxy" }, transport: "TCP" },
  { port: 8118, name: "Privoxy", abbreviation: "Privoxy", description: { fa: "پراکسی HTTP با فیلتر محتوا", en: "HTTP proxy with content filtering" }, category: { fa: "پراکسی", en: "Proxy" }, transport: "TCP" },
  { port: 9050, name: "Tor SOCKS", abbreviation: "Tor", description: { fa: "پراکسی شبکه Tor", en: "Tor network SOCKS proxy" }, category: { fa: "پراکسی", en: "Proxy" }, transport: "TCP" },
  { port: 9051, name: "Tor Control", abbreviation: "Tor-Ctrl", description: { fa: "کنترل Tor daemon", en: "Tor daemon control port" }, category: { fa: "پراکسی", en: "Proxy" }, transport: "TCP" },

  // ═══════════════════════════════════════════
  // === کانتینر و DevOps / Container & DevOps ===
  // ═══════════════════════════════════════════
  { port: 2375, name: "Docker", abbreviation: "Docker", description: { fa: "API داکر بدون رمزنگاری", en: "Docker API without encryption" }, category: { fa: "کانتینر و DevOps", en: "Container & DevOps" }, transport: "TCP" },
  { port: 2376, name: "Docker TLS", abbreviation: "Docker-TLS", description: { fa: "API داکر با رمزنگاری TLS", en: "Docker API with TLS encryption" }, category: { fa: "کانتینر و DevOps", en: "Container & DevOps" }, transport: "TCP" },
  { port: 2377, name: "Docker Swarm", abbreviation: "Docker-Swarm", description: { fa: "مدیریت کلاستر Docker Swarm", en: "Docker Swarm cluster management" }, category: { fa: "کانتینر و DevOps", en: "Container & DevOps" }, transport: "TCP" },
  { port: 2379, name: "etcd Client", abbreviation: "etcd", description: { fa: "ذخیره‌سازی کلید-مقدار توزیع‌شده", en: "Distributed key-value store" }, category: { fa: "کانتینر و DevOps", en: "Container & DevOps" }, transport: "TCP" },
  { port: 2380, name: "etcd Peer", abbreviation: "etcd-P", description: { fa: "ارتباط بین نودهای etcd", en: "etcd peer communication" }, category: { fa: "کانتینر و DevOps", en: "Container & DevOps" }, transport: "TCP" },
  { port: 4243, name: "Docker Alt", abbreviation: "Docker-Alt", description: { fa: "پورت جایگزین قدیمی داکر", en: "Legacy alternative Docker port" }, category: { fa: "کانتینر و DevOps", en: "Container & DevOps" }, transport: "TCP" },
  { port: 6443, name: "Kubernetes API", abbreviation: "K8s", description: { fa: "API سرور کوبرنتیز", en: "Kubernetes API server" }, category: { fa: "کانتینر و DevOps", en: "Container & DevOps" }, transport: "TCP" },
  { port: 8200, name: "Vault", abbreviation: "Vault", description: { fa: "مدیریت رمزها و کلیدها (HashiCorp)", en: "Secret and key management (HashiCorp)" }, category: { fa: "کانتینر و DevOps", en: "Container & DevOps" }, transport: "TCP" },
  { port: 8300, name: "Consul Server", abbreviation: "Consul-S", description: { fa: "ارتباط سرور به سرور Consul", en: "Consul server-to-server communication" }, category: { fa: "کانتینر و DevOps", en: "Container & DevOps" }, transport: "TCP" },
  { port: 8301, name: "Consul LAN", abbreviation: "Consul-LAN", description: { fa: "پروتکل gossip شبکه محلی Consul", en: "Consul LAN gossip protocol" }, category: { fa: "کانتینر و DevOps", en: "Container & DevOps" }, transport: "TCP/UDP" },
  { port: 8302, name: "Consul WAN", abbreviation: "Consul-WAN", description: { fa: "پروتکل gossip شبکه WAN Consul", en: "Consul WAN gossip protocol" }, category: { fa: "کانتینر و DevOps", en: "Container & DevOps" }, transport: "TCP/UDP" },
  { port: 8500, name: "Consul", abbreviation: "Consul", description: { fa: "کشف سرویس و پیکربندی (HashiCorp)", en: "Service discovery and configuration (HashiCorp)" }, category: { fa: "کانتینر و DevOps", en: "Container & DevOps" }, transport: "TCP" },
  { port: 8600, name: "Consul DNS", abbreviation: "Consul-DNS", description: { fa: "DNS رزولوشن Consul", en: "Consul DNS resolution" }, category: { fa: "کانتینر و DevOps", en: "Container & DevOps" }, transport: "TCP/UDP" },
  { port: 10250, name: "Kubelet", abbreviation: "Kubelet", description: { fa: "API کوبلت در کوبرنتیز", en: "Kubelet API in Kubernetes" }, category: { fa: "کانتینر و DevOps", en: "Container & DevOps" }, transport: "TCP" },
  { port: 10255, name: "Kubelet Read", abbreviation: "Kubelet-R", description: { fa: "پورت فقط‌خواندنی Kubelet (منسوخ)", en: "Kubelet read-only port (deprecated)" }, category: { fa: "کانتینر و DevOps", en: "Container & DevOps" }, transport: "TCP" },
  { port: 30000, name: "K8s NodePort", abbreviation: "K8s-NP", description: { fa: "شروع محدوده NodePort کوبرنتیز", en: "Kubernetes NodePort range start" }, category: { fa: "کانتینر و DevOps", en: "Container & DevOps" }, transport: "TCP" },

  // ═══════════════════════════════════════════
  // === مانیتورینگ / Monitoring ===
  // ═══════════════════════════════════════════
  { port: 3000, name: "Grafana", abbreviation: "Grafana", description: { fa: "داشبورد تجسم داده و مانیتورینگ", en: "Data visualization and monitoring dashboard" }, category: { fa: "مانیتورینگ", en: "Monitoring" }, transport: "TCP" },
  { port: 4317, name: "OTLP gRPC", abbreviation: "OTLP", description: { fa: "پروتکل OpenTelemetry از طریق gRPC", en: "OpenTelemetry Protocol over gRPC" }, category: { fa: "مانیتورینگ", en: "Monitoring" }, transport: "TCP" },
  { port: 4318, name: "OTLP HTTP", abbreviation: "OTLP-H", description: { fa: "پروتکل OpenTelemetry از طریق HTTP", en: "OpenTelemetry Protocol over HTTP" }, category: { fa: "مانیتورینگ", en: "Monitoring" }, transport: "TCP" },
  { port: 5044, name: "Logstash Beats", abbreviation: "Logstash", description: { fa: "دریافت لاگ از Beats در ELK", en: "Receive logs from Beats in ELK stack" }, category: { fa: "مانیتورینگ", en: "Monitoring" }, transport: "TCP" },
  { port: 5601, name: "Kibana", abbreviation: "Kibana", description: { fa: "رابط وب Elasticsearch", en: "Elasticsearch web interface" }, category: { fa: "مانیتورینگ", en: "Monitoring" }, transport: "TCP" },
  { port: 8125, name: "StatsD", abbreviation: "StatsD", description: { fa: "جمع‌آوری آمار و متریک اپلیکیشن", en: "Application statistics and metrics collection" }, category: { fa: "مانیتورینگ", en: "Monitoring" }, transport: "UDP" },
  { port: 9090, name: "Prometheus", abbreviation: "Prometheus", description: { fa: "سیستم مانیتورینگ و هشدار", en: "Monitoring and alerting system" }, category: { fa: "مانیتورینگ", en: "Monitoring" }, transport: "TCP" },
  { port: 9093, name: "Alertmanager", abbreviation: "Alertmgr", description: { fa: "مدیریت هشدارهای Prometheus", en: "Prometheus Alertmanager" }, category: { fa: "مانیتورینگ", en: "Monitoring" }, transport: "TCP" },
  { port: 9100, name: "Node Exporter", abbreviation: "Node-Exp", description: { fa: "صادرکننده متریک سیستم برای Prometheus", en: "System metrics exporter for Prometheus" }, category: { fa: "مانیتورینگ", en: "Monitoring" }, transport: "TCP" },
  { port: 9115, name: "Blackbox Exporter", abbreviation: "BB-Exp", description: { fa: "پروب endpoint برای Prometheus", en: "Endpoint probing exporter for Prometheus" }, category: { fa: "مانیتورینگ", en: "Monitoring" }, transport: "TCP" },
  { port: 14268, name: "Jaeger Collector", abbreviation: "Jaeger", description: { fa: "جمع‌آوری ترَیسینگ توزیع‌شده Jaeger", en: "Jaeger distributed tracing collector" }, category: { fa: "مانیتورینگ", en: "Monitoring" }, transport: "TCP" },
  { port: 16686, name: "Jaeger UI", abbreviation: "Jaeger-UI", description: { fa: "رابط وب Jaeger برای مشاهده ترَیس‌ها", en: "Jaeger web UI for viewing traces" }, category: { fa: "مانیتورینگ", en: "Monitoring" }, transport: "TCP" },

  // ═══════════════════════════════════════════
  // === بازی و چندرسانه‌ای / Gaming & Multimedia ===
  // ═══════════════════════════════════════════
  { port: 666, name: "Doom", abbreviation: "Doom", description: { fa: "بازی Doom، اولین شوتر آنلاین", en: "Doom, the first online first-person shooter" }, category: { fa: "بازی و چندرسانه‌ای", en: "Gaming & Multimedia" }, transport: "TCP/UDP" },
  { port: 1119, name: "Battle.net", abbreviation: "BNet", description: { fa: "پروتکل بازی و چت Blizzard", en: "Blizzard Battle.net chat and game protocol" }, category: { fa: "بازی و چندرسانه‌ای", en: "Gaming & Multimedia" }, transport: "TCP" },
  { port: 3074, name: "Xbox Live", abbreviation: "Xbox", description: { fa: "سرویس بازی آنلاین Xbox", en: "Xbox Live online gaming service" }, category: { fa: "بازی و چندرسانه‌ای", en: "Gaming & Multimedia" }, transport: "TCP/UDP" },
  { port: 7777, name: "Unreal Engine", abbreviation: "Unreal", description: { fa: "سرور بازی Unreal Engine پیش‌فرض", en: "Default Unreal Engine game server port" }, category: { fa: "بازی و چندرسانه‌ای", en: "Gaming & Multimedia" }, transport: "TCP/UDP" },
  { port: 19132, name: "Minecraft BE", abbreviation: "MC-BE", description: { fa: "ماینکرفت نسخه بدراک", en: "Minecraft Bedrock Edition" }, category: { fa: "بازی و چندرسانه‌ای", en: "Gaming & Multimedia" }, transport: "UDP" },
  { port: 25565, name: "Minecraft", abbreviation: "Minecraft", description: { fa: "سرور بازی ماینکرفت جاوا", en: "Minecraft Java Edition game server" }, category: { fa: "بازی و چندرسانه‌ای", en: "Gaming & Multimedia" }, transport: "TCP" },
  { port: 26000, name: "Quake", abbreviation: "Quake", description: { fa: "سرور بازی Quake", en: "Quake game server" }, category: { fa: "بازی و چندرسانه‌ای", en: "Gaming & Multimedia" }, transport: "TCP/UDP" },
  { port: 27005, name: "Steam Client", abbreviation: "Steam", description: { fa: "پورت کلاینت Steam", en: "Steam client port" }, category: { fa: "بازی و چندرسانه‌ای", en: "Gaming & Multimedia" }, transport: "UDP" },
  { port: 27015, name: "Source Engine", abbreviation: "Source", description: { fa: "بازی‌های Valve (CS, TF2, ...)", en: "Valve games (CS, TF2, ...)" }, category: { fa: "بازی و چندرسانه‌ای", en: "Gaming & Multimedia" }, transport: "TCP/UDP" },
  { port: 27036, name: "Steam Remote Play", abbreviation: "Steam-RP", description: { fa: "بازی از راه دور Steam", en: "Steam Remote Play" }, category: { fa: "بازی و چندرسانه‌ای", en: "Gaming & Multimedia" }, transport: "TCP/UDP" },

  // ═══════════════════════════════════════════
  // === وب‌سرور و API / Web Server & API ===
  // ═══════════════════════════════════════════
  { port: 4000, name: "Dev Server", abbreviation: "Dev", description: { fa: "پورت رایج سرور توسعه", en: "Common development server port" }, category: { fa: "وب‌سرور و API", en: "Web Server & API" }, transport: "TCP" },
  { port: 4200, name: "Angular Dev", abbreviation: "Angular", description: { fa: "سرور توسعه Angular CLI", en: "Angular CLI development server" }, category: { fa: "وب‌سرور و API", en: "Web Server & API" }, transport: "TCP" },
  { port: 5000, name: "Flask/Dev", abbreviation: "Flask", description: { fa: "سرور توسعه Flask و پورت رایج توسعه", en: "Flask development server and common dev port" }, category: { fa: "وب‌سرور و API", en: "Web Server & API" }, transport: "TCP" },
  { port: 5173, name: "Vite Dev", abbreviation: "Vite", description: { fa: "سرور توسعه Vite", en: "Vite development server" }, category: { fa: "وب‌سرور و API", en: "Web Server & API" }, transport: "TCP" },
  { port: 8081, name: "Nexus/Alt HTTP", abbreviation: "Nexus", description: { fa: "مخزن آرتیفکت Nexus یا HTTP جایگزین", en: "Nexus artifact repository or alternative HTTP" }, category: { fa: "وب‌سرور و API", en: "Web Server & API" }, transport: "TCP" },
  { port: 9000, name: "SonarQube", abbreviation: "SonarQube", description: { fa: "پلتفرم بررسی کیفیت کد", en: "Code quality inspection platform" }, category: { fa: "وب‌سرور و API", en: "Web Server & API" }, transport: "TCP" },
  { port: 9443, name: "WSO2", abbreviation: "WSO2", description: { fa: "پلتفرم یکپارچه‌سازی WSO2", en: "WSO2 integration platform" }, category: { fa: "وب‌سرور و API", en: "Web Server & API" }, transport: "TCP" },
  { port: 50051, name: "gRPC", abbreviation: "gRPC", description: { fa: "پروتکل RPC گوگل - پیش‌فرض", en: "Google Remote Procedure Call - default port" }, category: { fa: "وب‌سرور و API", en: "Web Server & API" }, transport: "TCP" },

  // ═══════════════════════════════════════════
  // === چاپ / Printing ===
  // ═══════════════════════════════════════════
  { port: 515, name: "LPD", abbreviation: "LPD", description: { fa: "دیمون پرینتر خطی", en: "Line Printer Daemon print service" }, category: { fa: "چاپ", en: "Printing" }, transport: "TCP" },
  { port: 631, name: "IPP", abbreviation: "IPP", description: { fa: "پروتکل چاپ اینترنتی (CUPS)", en: "Internet Printing Protocol (CUPS)" }, category: { fa: "چاپ", en: "Printing" }, transport: "TCP" },

  // ═══════════════════════════════════════════
  // === ذخیره‌سازی / Storage ===
  // ═══════════════════════════════════════════
  { port: 860, name: "iSCSI", abbreviation: "iSCSI", description: { fa: "پروتکل SCSI از طریق شبکه IP", en: "SCSI protocol over IP network" }, category: { fa: "ذخیره‌سازی", en: "Storage" }, transport: "TCP" },
  { port: 3260, name: "iSCSI Target", abbreviation: "iSCSI-T", description: { fa: "هدف iSCSI برای ذخیره‌سازی شبکه", en: "iSCSI target for network storage" }, category: { fa: "ذخیره‌سازی", en: "Storage" }, transport: "TCP" },
  { port: 8009, name: "AJP", abbreviation: "AJP", description: { fa: "پروتکل Apache JServ برای Tomcat", en: "Apache JServ Protocol for Tomcat" }, category: { fa: "ذخیره‌سازی", en: "Storage" }, transport: "TCP" },

  // ═══════════════════════════════════════════
  // === CI/CD و ابزارهای توسعه / CI-CD & Dev Tools ===
  // ═══════════════════════════════════════════
  { port: 8090, name: "Confluence", abbreviation: "Confluence", description: { fa: "پلتفرم مستندسازی Atlassian", en: "Atlassian documentation platform" }, category: { fa: "CI/CD و ابزارهای توسعه", en: "CI/CD & Dev Tools" }, transport: "TCP" },
  { port: 9418, name: "Git", abbreviation: "Git", description: { fa: "پروتکل Git برای اشتراک‌گذاری کد", en: "Git protocol for code sharing" }, category: { fa: "CI/CD و ابزارهای توسعه", en: "CI/CD & Dev Tools" }, transport: "TCP" },

  // ═══════════════════════════════════════════
  // === ارتباطات تیمی / Team Communication ===
  // ═══════════════════════════════════════════
  { port: 194, name: "IRC", abbreviation: "IRC", description: { fa: "چت رله اینترنتی - چت تیمی قدیمی", en: "Internet Relay Chat - legacy team chat" }, category: { fa: "ارتباطات تیمی", en: "Team Communication" }, transport: "TCP" },
  { port: 6667, name: "IRC Default", abbreviation: "IRC-D", description: { fa: "پورت پیش‌فرض IRC", en: "Default IRC port" }, category: { fa: "ارتباطات تیمی", en: "Team Communication" }, transport: "TCP" },
  { port: 6697, name: "IRC TLS", abbreviation: "IRC-TLS", description: { fa: "IRC با رمزنگاری TLS", en: "IRC with TLS encryption" }, category: { fa: "ارتباطات تیمی", en: "Team Communication" }, transport: "TCP" },
  { port: 5222, name: "XMPP Client", abbreviation: "XMPP", description: { fa: "پروتکل پیام‌رسانی برای کلاینت", en: "Extensible Messaging Protocol for clients" }, category: { fa: "ارتباطات تیمی", en: "Team Communication" }, transport: "TCP" },
  { port: 5269, name: "XMPP Server", abbreviation: "XMPP-S", description: { fa: "ارتباط سرور به سرور XMPP", en: "XMPP server-to-server communication" }, category: { fa: "ارتباطات تیمی", en: "Team Communication" }, transport: "TCP" },
  { port: 5280, name: "XMPP Web", abbreviation: "XMPP-W", description: { fa: "رابط وب XMPP/BOSH", en: "XMPP/BOSH web interface" }, category: { fa: "ارتباطات تیمی", en: "Team Communication" }, transport: "TCP" },

  // ═══════════════════════════════════════════
  // === مجازی‌سازی / Virtualization ===
  // ═══════════════════════════════════════════
  { port: 902, name: "VMware ESXi", abbreviation: "VMware", description: { fa: "سرویس احراز هویت VMware ESXi", en: "VMware ESXi authentication service" }, category: { fa: "مجازی‌سازی", en: "Virtualization" }, transport: "TCP" },
  { port: 903, name: "VMware UI", abbreviation: "VMware-UI", description: { fa: "رابط وب مدیریت VMware", en: "VMware management web UI" }, category: { fa: "مجازی‌سازی", en: "Virtualization" }, transport: "TCP" },
  { port: 5480, name: "VMware vCenter", abbreviation: "vCenter", description: { fa: "مدیریت مرکزی VMware vCenter", en: "VMware vCenter management" }, category: { fa: "مجازی‌سازی", en: "Virtualization" }, transport: "TCP" },

];

export const getFullName = (abbr: string): string => {
  const mapping: Record<string, string> = {
    HTTP: "Hypertext Transfer Protocol",
    HTTPS: "Hypertext Transfer Protocol Secure",
    "HTTP-Alt": "HTTP Alternate",
    "HTTP-Alt2": "HTTP Alternate 2",
    "HTTP-Alt3": "HTTP Alternate 3",
    "HTTPS-Alt": "HTTPS Alternate",
    FTP: "File Transfer Protocol",
    FTPS: "FTP Secure",
    TFTP: "Trivial File Transfer Protocol",
    SFTP: "SSH File Transfer Protocol",
    UUCP: "Unix-to-Unix Copy Protocol",
    SSH: "Secure Shell",
    "SSH-Alt": "Secure Shell Alternate",
    Telnet: "Teletype Network",
    "Telnet-TLS": "Telnet over TLS/SSL",
    SMTP: "Simple Mail Transfer Protocol",
    SMTPS: "SMTP Secure",
    "SMTP-Sub": "SMTP Submission",
    POP2: "Post Office Protocol version 2",
    POP3: "Post Office Protocol v3",
    POP3S: "POP3 Secure",
    IMAP: "Internet Message Access Protocol",
    IMAP3: "Internet Message Access Protocol v3",
    IMAPS: "IMAP Secure",
    ODMR: "On-Demand Mail Relay",
    DNS: "Domain Name System",
    DoT: "DNS over TLS",
    DHCP: "Dynamic Host Configuration Protocol",
    "DHCPv6": "Dynamic Host Configuration Protocol v6",
    "DHCPv6-S": "DHCPv6 Server",
    "DHCP-FO": "DHCP Failover Protocol",
    "DHCP-FO2": "DHCP Failover Protocol v2",
    NTP: "Network Time Protocol",
    PTP: "Precision Time Protocol",
    SNMP: "Simple Network Management Protocol",
    "SNMP-Trap": "SNMP Trap",
    LDAP: "Lightweight Directory Access Protocol",
    LDAPS: "LDAP Secure",
    MySQL: "MySQL Database System",
    PostgreSQL: "PostgreSQL Database System",
    MSSQL: "Microsoft SQL Server",
    "MSSQL-M": "Microsoft SQL Server Monitor",
    Oracle: "Oracle Database",
    Redis: "Remote Dictionary Server",
    "Redis-TLS": "Redis over TLS",
    MongoDB: "MongoDB NoSQL Database",
    "MongoDB-S": "MongoDB Shard Process",
    "MongoDB-C": "MongoDB Config Server",
    ES: "Elasticsearch",
    "ES-Cluster": "Elasticsearch Cluster Node",
    Cassandra: "Apache Cassandra",
    Memcached: "Memcached Caching System",
    CouchDB: "Apache CouchDB",
    Neo4j: "Neo4j Graph Database",
    RethinkDB: "RethinkDB Real-time Database",
    RDP: "Remote Desktop Protocol",
    VNC: "Virtual Network Computing",
    "VNC-Web": "VNC Web Interface",
    TeamViewer: "TeamViewer Remote Access",
    Rexec: "Remote Execution",
    Rlogin: "Remote Login",
    RSH: "Remote Shell",
    Kerberos: "Kerberos Authentication",
    "Kerb-Admin": "Kerberos Administration",
    Kpasswd: "Kerberos Password Change",
    IKE: "Internet Key Exchange",
    PPTP: "Point-to-Point Tunneling Protocol",
    L2TP: "Layer 2 Tunneling Protocol",
    "NAT-T": "NAT Traversal for IPSec",
    OpenVPN: "OpenVPN Protocol",
    WireGuard: "WireGuard VPN Protocol",
    RADIUS: "Remote Authentication Dial-In User Service",
    "RADIUS-Acc": "RADIUS Accounting",
    "TACACS+": "Terminal Access Controller Access-Control System Plus",
    TSP: "PKIX Time Stamp Protocol",
    SIP: "Session Initiation Protocol",
    SIPS: "SIP Secure",
    RTSP: "Real Time Streaming Protocol",
    RTMP: "Real Time Messaging Protocol",
    IAX2: "Inter-Asterisk eXchange Protocol v2",
    STUN: "Session Traversal Utilities for NAT",
    NetBIOS: "Network Basic Input/Output System",
    SMB: "Server Message Block",
    AFP: "Apple Filing Protocol",
    NFS: "Network File System",
    Rsync: "Remote Sync",
    SOCKS: "Socket Secure Proxy",
    Squid: "Squid Web Proxy",
    Privoxy: "Privacy Proxy",
    Tor: "The Onion Router",
    "Tor-Ctrl": "Tor Control Port",
    Docker: "Docker Container Engine",
    "Docker-TLS": "Docker with TLS",
    "Docker-Swarm": "Docker Swarm",
    "Docker-Alt": "Docker Legacy Alternate",
    K8s: "Kubernetes",
    "K8s-NP": "Kubernetes NodePort",
    Kubelet: "Kubernetes Kubelet",
    "Kubelet-R": "Kubernetes Kubelet Read-Only",
    etcd: "etcd Key-Value Store",
    "etcd-P": "etcd Peer Communication",
    Vault: "HashiCorp Vault",
    Consul: "HashiCorp Consul",
    "Consul-S": "HashiCorp Consul Server",
    "Consul-LAN": "HashiCorp Consul LAN Gossip",
    "Consul-WAN": "HashiCorp Consul WAN Gossip",
    "Consul-DNS": "HashiCorp Consul DNS",
    Prometheus: "Prometheus Monitoring",
    Alertmgr: "Prometheus Alertmanager",
    Grafana: "Grafana Dashboard",
    InfluxDB: "InfluxDB Time Series DB",
    Kibana: "Kibana Visualization",
    "Node-Exp": "Prometheus Node Exporter",
    "BB-Exp": "Prometheus Blackbox Exporter",
    StatsD: "StatsD Metrics Daemon",
    Logstash: "Logstash Log Collector",
    OTLP: "OpenTelemetry Protocol (gRPC)",
    "OTLP-H": "OpenTelemetry Protocol (HTTP)",
    Jaeger: "Jaeger Distributed Tracing Collector",
    "Jaeger-UI": "Jaeger Web UI",
    AMQP: "Advanced Message Queuing Protocol",
    AMQPS: "Advanced Message Queuing Protocol Secure",
    "AMQP-UI": "RabbitMQ Management UI",
    EPMD: "Erlang Port Mapper Daemon",
    Kafka: "Apache Kafka",
    MQTT: "Message Queuing Telemetry Transport",
    MQTTS: "MQTT Secure",
    ActiveMQ: "Apache ActiveMQ",
    STOMP: "Simple Text Oriented Messaging Protocol",
    "ActiveMQ-WS": "ActiveMQ WebSocket",
    Minecraft: "Minecraft Java Server",
    "MC-BE": "Minecraft Bedrock Edition",
    Source: "Valve Source Engine",
    Doom: "Doom Game Server",
    BNet: "Battle.net Game Protocol",
    Xbox: "Xbox Live",
    PSN: "PlayStation Network",
    Unreal: "Unreal Engine Server",
    Quake: "Quake Game Server",
    Steam: "Steam Client",
    "Steam-RP": "Steam Remote Play",
    Syslog: "System Logging Protocol",
    "Syslog-TLS": "Reliable Syslog Service",
    mDNS: "Multicast DNS",
    NETCONF: "Network Configuration Protocol",
    BGP: "Border Gateway Protocol",
    RIP: "Routing Information Protocol",
    RIPng: "Routing Information Protocol Next Generation",
    SLP: "Service Location Protocol",
    WINS: "Windows Internet Name Service",
    WHOIS: "WHOIS Protocol",
    RNDC: "Remote Name Daemon Control",
    ONC: "Open Network Computing RPC",
    RPC: "Remote Procedure Call",
    Ident: "Ident Protocol",
    NNTP: "Network News Transfer Protocol",
    NNTPS: "NNTP over SSL",
    IRC: "Internet Relay Chat",
    "IRC-D": "IRC Default",
    "IRC-TLS": "IRC over TLS",
    QOTD: "Quote of the Day",
    CHARGEN: "Character Generator Protocol",
    Discard: "Discard Protocol",
    Echo: "Echo Protocol",
    Daytime: "Daytime Protocol",
    Time: "Time Protocol",
    Finger: "Finger Protocol",
    Gopher: "Gopher Protocol",
    XDMCP: "X Display Manager Control Protocol",
    EPP: "Extensible Provisioning Protocol",
    IPMI: "Intelligent Platform Management Interface",
    LDP: "Label Distribution Protocol",
    OLSR: "Optimized Link State Routing",
    TDP: "Tag Distribution Protocol",
    iSCSI: "Internet Small Computer Systems Interface",
    "iSCSI-T": "iSCSI Target",
    AJP: "Apache JServ Protocol",
    FileMaker: "FileMaker Web Sharing",
    XMPP: "Extensible Messaging and Presence Protocol",
    "XMPP-S": "XMPP Server-to-Server",
    "XMPP-W": "XMPP Web Interface",
    IPP: "Internet Printing Protocol",
    LPD: "Line Printer Daemon",
    "RAW-Print": "Raw Printing Protocol",
    VMware: "VMware ESXi",
    "VMware-UI": "VMware Management UI",
    vCenter: "VMware vCenter",
    "QEMU-VNC": "QEMU Virtual Machine Console",
    Dev: "Development Server",
    Angular: "Angular CLI Dev Server",
    Flask: "Flask Development Server",
    Vite: "Vite Development Server",
    Jenkins: "Jenkins CI/CD",
    "Jenkins-TLS": "Jenkins over TLS",
    Confluence: "Atlassian Confluence",
    Git: "Git Protocol",
    SonarQube: "SonarQube Code Analysis",
    gRPC: "Google Remote Procedure Call",
    DHCP_FO: "DHCP Failover",
    WSO2: "WSO2 Integration Platform",
    Nexus: "Sonatype Nexus Repository",
    "4243": "Docker Legacy",
  };
  return mapping[abbr] || abbr;
};