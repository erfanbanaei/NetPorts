export interface Protocol {
  port: number;
  name: string;
  abbreviation: string;
  description: { fa: string; en: string };
  category: { fa: string; en: string };
  transport: "TCP" | "UDP" | "TCP/UDP";
  
  // 🆕 فیلدهای جدید
  rfc?: number[];                    // شماره RFC های مرتبط
  ianaStatus: "official" | "unofficial" | "reserved" | "deprecated";
  securityRisk: "low" | "medium" | "high" | "critical";
  commonUseCases: { fa: string[]; en: string[] };
  alternativePorts?: number[];
  introducedYear?: number;
  vendor?: string;                   // سازنده یا سازمان
  isDeprecated: boolean;
  references?: {
    rfc?: string[];
    wiki?: string;
    docs?: string;
  };
  codeExample?: {
    language: string;
    code: string;
  }[];
}

export const protocolsData: Protocol[] = [

  // ═══════════════════════════════════════════
  // === وب / Web ===
  // ═══════════════════════════════════════════
  {
    port: 80,
    name: "HTTP",
    abbreviation: "HTTP",
    description: {
      fa: "پروتکل اصلی وب بدون رمزنگاری",
      en: "Main web protocol without encryption"
    },
    category: { fa: "وب", en: "Web" },
    transport: "TCP",
    rfc: [2616, 7230, 7231, 7232, 7233, 7234, 7235],
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["وب‌سرورها", "API های عمومی", "ترافیک داخلی غیر حساس"],
      en: ["Web servers", "Public APIs", "Non-sensitive internal traffic"]
    },
    alternativePorts: [8000, 8008, 8080, 8888],
    introducedYear: 1991,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc2616"],
      wiki: "https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol",
      docs: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    },
    codeExample: [
      {
        language: "curl",
        code: `curl http://example.com`
      },
      {
        language: "python",
        code: `import requests
response = requests.get('http://example.com')
print(response.status_code)`
      },
      {
        language: "node",
        code: `const http = require('http');
http.get('http://example.com', (res) => {
  console.log('Status:', res.statusCode);
});`
      }
    ]
  },

  {
    port: 443,
    name: "HTTPS",
    abbreviation: "HTTPS",
    description: {
      fa: "پروتکل امن وب با SSL/TLS",
      en: "Secure web protocol with SSL/TLS"
    },
    category: { fa: "وب", en: "Web" },
    transport: "TCP",
    rfc: [2818, 5246, 8446],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["وب‌سایت‌های امن", "API های محافظت‌شده", "پرداخت آنلاین", "احراز هویت"],
      en: ["Secure websites", "Protected APIs", "Online payments", "Authentication"]
    },
    alternativePorts: [8443, 9443],
    introducedYear: 1994,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc2818"],
      wiki: "https://en.wikipedia.org/wiki/HTTPS",
      docs: "https://developer.mozilla.org/en-US/docs/Glossary/HTTPS"
    },
    codeExample: [
      {
        language: "curl",
        code: `curl https://example.com`
      },
      {
        language: "python",
        code: `import requests
response = requests.get('https://example.com', verify=True)
print(response.headers)`
      }
    ]
  },

  {
    port: 8080,
    name: "HTTP Alternate",
    abbreviation: "HTTP-Alt",
    description: {
      fa: "پورت جایگزین HTTP برای پراکسی و توسعه",
      en: "Alternative HTTP port for proxy and development"
    },
    category: { fa: "وب", en: "Web" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["سرورهای توسعه", "پراکسی HTTP", "Apache Tomcat", "Jenkins"],
      en: ["Development servers", "HTTP proxies", "Apache Tomcat", "Jenkins"]
    },
    alternativePorts: [8000, 8008, 8888],
    introducedYear: 1990,
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers"
    },
    codeExample: [
      {
        language: "python",
        code: `python -m http.server 8080`
      },
      {
        language: "node",
        code: `const express = require('express');
const app = express();
app.listen(8080, () => console.log('Server on 8080'));`
      }
    ]
  },

  {
    port: 8443,
    name: "HTTPS Alternate",
    abbreviation: "HTTPS-Alt",
    description: {
      fa: "پورت جایگزین HTTPS",
      en: "Alternative HTTPS port"
    },
    category: { fa: "وب", en: "Web" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["سرورهای وب امن جایگزین", "Tomcat SSL", "پنل‌های مدیریتی"],
      en: ["Alternative secure web servers", "Tomcat SSL", "Admin panels"]
    },
    introducedYear: 2000,
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === ایمیل / Email ===
  // ═══════════════════════════════════════════
  {
    port: 25,
    name: "SMTP",
    abbreviation: "SMTP",
    description: {
      fa: "ارسال ایمیل بین سرورها",
      en: "Email transfer between servers"
    },
    category: { fa: "ایمیل", en: "Email" },
    transport: "TCP",
    rfc: [5321, 5322],
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["ارسال ایمیل بین سرورها", "Mail Transfer Agent (MTA)"],
      en: ["Email transmission between servers", "Mail Transfer Agent (MTA)"]
    },
    alternativePorts: [587, 2525],
    introducedYear: 1982,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc5321"],
      wiki: "https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol"
    },
    codeExample: [
      {
        language: "python",
        code: `import smtplib
server = smtplib.SMTP('localhost', 25)
server.sendmail('from@example.com', 'to@example.com', 'Test')
server.quit()`
      },
      {
        language: "telnet",
        code: `telnet mail.example.com 25
HELO example.com
MAIL FROM:<sender@example.com>
RCPT TO:<recipient@example.com>
DATA
Subject: Test
Test message
.
QUIT`
      }
    ]
  },

  {
    port: 110,
    name: "POP3",
    abbreviation: "POP3",
    description: {
      fa: "دریافت ایمیل از سرور (حذف از سرور)",
      en: "Retrieve email from server (removed from server)"
    },
    category: { fa: "ایمیل", en: "Email" },
    transport: "TCP",
    rfc: [1939],
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["دانلود ایمیل‌ها", "کلاینت‌های ایمیل قدیمی"],
      en: ["Download emails", "Legacy email clients"]
    },
    alternativePorts: [995],
    introducedYear: 1984,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc1939"],
      wiki: "https://en.wikipedia.org/wiki/Post_Office_Protocol"
    },
    codeExample: [
      {
        language: "python",
        code: `import poplib
server = poplib.POP3('mail.example.com')
server.user('username')
server.pass_('password')
print(server.list())
server.quit()`
      }
    ]
  },

  {
    port: 143,
    name: "IMAP",
    abbreviation: "IMAP",
    description: {
      fa: "دسترسی و همگام‌سازی ایمیل‌ها",
      en: "Email access and synchronization"
    },
    category: { fa: "ایمیل", en: "Email" },
    transport: "TCP",
    rfc: [3501],
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["همگام‌سازی ایمیل بین دستگاه‌ها", "دسترسی به پوشه‌های سرور"],
      en: ["Email sync across devices", "Server folder access"]
    },
    alternativePorts: [993],
    introducedYear: 1986,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc3501"],
      wiki: "https://en.wikipedia.org/wiki/Internet_Message_Access_Protocol"
    },
    codeExample: [
      {
        language: "python",
        code: `import imaplib
mail = imaplib.IMAP4('mail.example.com')
mail.login('user', 'pass')
mail.select('inbox')
status, messages = mail.search(None, 'ALL')
print(messages)`
      }
    ]
  },

  {
    port: 465,
    name: "SMTPS",
    abbreviation: "SMTPS",
    description: {
      fa: "ارسال ایمیل امن با SSL",
      en: "Secure email sending with SSL"
    },
    category: { fa: "ایمیل", en: "Email" },
    transport: "TCP",
    rfc: [8314],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["ارسال ایمیل رمزنگاری‌شده", "کلاینت‌های ایمیل مدرن"],
      en: ["Encrypted email submission", "Modern email clients"]
    },
    introducedYear: 1997,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc8314"]
    },
    codeExample: [
      {
        language: "python",
        code: `import smtplib
server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
server.login('user@gmail.com', 'password')
server.sendmail('from@gmail.com', 'to@example.com', 'Hello')
server.quit()`
      }
    ]
  },

  {
    port: 587,
    name: "SMTP Submission",
    abbreviation: "SMTP-Sub",
    description: {
      fa: "ارسال ایمیل از کلاینت با احراز هویت",
      en: "Email submission from client with authentication"
    },
    category: { fa: "ایمیل", en: "Email" },
    transport: "TCP",
    rfc: [6409],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["ارسال ایمیل با STARTTLS", "کلاینت‌های ایمیل امروزی"],
      en: ["Email submission with STARTTLS", "Modern email clients"]
    },
    introducedYear: 1998,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc6409"],
      wiki: "https://en.wikipedia.org/wiki/Message_submission_agent"
    },
    codeExample: [
      {
        language: "python",
        code: `import smtplib
server = smtplib.SMTP('smtp.example.com', 587)
server.starttls()
server.login('user', 'pass')
server.sendmail('from@example.com', 'to@example.com', 'Message')
server.quit()`
      }
    ]
  },

  {
    port: 993,
    name: "IMAPS",
    abbreviation: "IMAPS",
    description: {
      fa: "دسترسی امن به ایمیل با SSL/TLS",
      en: "Secure email access with SSL/TLS"
    },
    category: { fa: "ایمیل", en: "Email" },
    transport: "TCP",
    rfc: [8314],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["دسترسی رمزنگاری‌شده به ایمیل", "کلاینت‌های موبایل و دسکتاپ"],
      en: ["Encrypted email access", "Mobile and desktop clients"]
    },
    introducedYear: 1996,
    vendor: "IETF",
    isDeprecated: false
  },

  {
    port: 995,
    name: "POP3S",
    abbreviation: "POP3S",
    description: {
      fa: "دریافت امن ایمیل با SSL/TLS",
      en: "Secure email retrieval with SSL/TLS"
    },
    category: { fa: "ایمیل", en: "Email" },
    transport: "TCP",
    rfc: [8314],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["دانلود امن ایمیل‌ها"],
      en: ["Secure email download"]
    },
    introducedYear: 1996,
    vendor: "IETF",
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === امنیت / Security ===
  // ═══════════════════════════════════════════
  {
    port: 22,
    name: "SSH",
    abbreviation: "SSH",
    description: {
      fa: "اتصال امن رمزنگاری‌شده به سرور",
      en: "Secure encrypted connection to server"
    },
    category: { fa: "امنیت", en: "Security" },
    transport: "TCP",
    rfc: [4251, 4252, 4253, 4254],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["اتصال امن به سرور", "انتقال فایل امن (SCP/SFTP)", "تونل‌زنی", "مدیریت سرور"],
      en: ["Secure server connection", "Secure file transfer (SCP/SFTP)", "Tunneling", "Server management"]
    },
    alternativePorts: [2222],
    introducedYear: 1995,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc4251"],
      wiki: "https://en.wikipedia.org/wiki/Secure_Shell",
      docs: "https://www.openssh.com/"
    },
    codeExample: [
      {
        language: "bash",
        code: `ssh user@example.com
ssh -p 2222 user@example.com
ssh -L 8080:localhost:80 user@example.com`
      },
      {
        language: "python",
        code: `import paramiko
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('example.com', username='user', password='pass')
stdin, stdout, stderr = ssh.exec_command('ls -l')
print(stdout.read().decode())`
      }
    ]
  },

  {
    port: 23,
    name: "Telnet",
    abbreviation: "Telnet",
    description: {
      fa: "دسترسی از راه دور بدون رمزنگاری",
      en: "Remote access without encryption"
    },
    category: { fa: "دسترسی از راه دور", en: "Remote Access" },
    transport: "TCP",
    rfc: [854],
    ianaStatus: "official",
    securityRisk: "critical",
    commonUseCases: {
      fa: ["تست اتصال به پورت‌ها", "دسترسی به سخت‌افزار شبکه قدیمی (منسوخ)"],
      en: ["Port connectivity testing", "Legacy network equipment access (deprecated)"]
    },
    introducedYear: 1969,
    vendor: "IETF",
    isDeprecated: true,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc854"],
      wiki: "https://en.wikipedia.org/wiki/Telnet"
    },
    codeExample: [
      {
        language: "bash",
        code: `telnet example.com 23
# برای تست پورت:
telnet example.com 80`
      }
    ]
  },

  {
    port: 88,
    name: "Kerberos",
    abbreviation: "Kerberos",
    description: {
      fa: "احراز هویت شبکه‌ای امن",
      en: "Secure network authentication"
    },
    category: { fa: "امنیت", en: "Security" },
    transport: "TCP/UDP",
    rfc: [4120],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["Active Directory", "احراز هویت SSO در سازمان‌ها"],
      en: ["Active Directory", "Enterprise SSO authentication"]
    },
    introducedYear: 1988,
    vendor: "MIT",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc4120"],
      wiki: "https://en.wikipedia.org/wiki/Kerberos_(protocol)",
      docs: "https://web.mit.edu/kerberos/"
    }
  },

  {
    port: 389,
    name: "LDAP",
    abbreviation: "LDAP",
    description: {
      fa: "دسترسی به سرویس دایرکتوری",
      en: "Directory service access protocol"
    },
    category: { fa: "دایرکتوری", en: "Directory" },
    transport: "TCP/UDP",
    rfc: [4510, 4511, 4512, 4513],
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["Active Directory", "مدیریت کاربران سازمانی", "احراز هویت متمرکز"],
      en: ["Active Directory", "Enterprise user management", "Centralized authentication"]
    },
    alternativePorts: [636],
    introducedYear: 1993,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc4510"],
      wiki: "https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol"
    },
    codeExample: [
      {
        language: "bash",
        code: `ldapsearch -x -H ldap://example.com -b "dc=example,dc=com"`
      },
      {
        language: "python",
        code: `import ldap
conn = ldap.initialize('ldap://example.com')
conn.simple_bind_s('cn=admin,dc=example,dc=com', 'password')
results = conn.search_s('dc=example,dc=com', ldap.SCOPE_SUBTREE)
print(results)`
      }
    ]
  },

  {
    port: 636,
    name: "LDAPS",
    abbreviation: "LDAPS",
    description: {
      fa: "LDAP امن با SSL/TLS",
      en: "Secure LDAP with SSL/TLS"
    },
    category: { fa: "دایرکتوری", en: "Directory" },
    transport: "TCP",
    rfc: [4513],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["Active Directory امن", "دسترسی رمزنگاری‌شده به دایرکتوری"],
      en: ["Secure Active Directory", "Encrypted directory access"]
    },
    introducedYear: 1997,
    vendor: "IETF",
    isDeprecated: false
  },

  {
    port: 500,
    name: "IKE/IPSec",
    abbreviation: "IKE",
    description: {
      fa: "تبادل کلید اینترنتی برای VPN",
      en: "Internet Key Exchange for VPN"
    },
    category: { fa: "امنیت", en: "Security" },
    transport: "UDP",
    rfc: [7296],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["IPSec VPN", "اتصال امن سایت به سایت"],
      en: ["IPSec VPN", "Site-to-site secure connections"]
    },
    introducedYear: 1998,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc7296"],
      wiki: "https://en.wikipedia.org/wiki/Internet_Key_Exchange"
    }
  },

  {
    port: 1194,
    name: "OpenVPN",
    abbreviation: "OpenVPN",
    description: {
      fa: "VPN متن‌باز و امن",
      en: "Open-source secure VPN"
    },
    category: { fa: "امنیت", en: "Security" },
    transport: "TCP/UDP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["VPN سازمانی", "دسترسی امن از راه دور", "تونل‌زنی ترافیک"],
      en: ["Enterprise VPN", "Secure remote access", "Traffic tunneling"]
    },
    introducedYear: 2001,
    vendor: "OpenVPN Inc.",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/OpenVPN",
      docs: "https://openvpn.net/community-resources/"
    },
    codeExample: [
      {
        language: "bash",
        code: `openvpn --config client.ovpn
# Server:
openvpn --config server.conf`
      }
    ]
  },

  {
    port: 1723,
    name: "PPTP",
    abbreviation: "PPTP",
    description: {
      fa: "پروتکل تونل‌زنی نقطه به نقطه",
      en: "Point-to-Point Tunneling Protocol"
    },
    category: { fa: "امنیت", en: "Security" },
    transport: "TCP",
    rfc: [2637],
    ianaStatus: "official",
    securityRisk: "critical",
    commonUseCases: {
      fa: ["VPN قدیمی ویندوز (منسوخ - ناامن)"],
      en: ["Legacy Windows VPN (deprecated - insecure)"]
    },
    introducedYear: 1996,
    vendor: "Microsoft",
    isDeprecated: true,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc2637"],
      wiki: "https://en.wikipedia.org/wiki/Point-to-Point_Tunneling_Protocol"
    }
  },

  {
    port: 51820,
    name: "WireGuard",
    abbreviation: "WireGuard",
    description: {
      fa: "VPN مدرن و سریع",
      en: "Modern fast VPN protocol"
    },
    category: { fa: "امنیت", en: "Security" },
    transport: "UDP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["VPN سبک و سریع", "اتصال موبایل", "شبکه‌های peer-to-peer"],
      en: ["Lightweight fast VPN", "Mobile connections", "Peer-to-peer networks"]
    },
    introducedYear: 2016,
    vendor: "Jason A. Donenfeld",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/WireGuard",
      docs: "https://www.wireguard.com/"
    },
    codeExample: [
      {
        language: "bash",
        code: `wg-quick up wg0
wg show`
      }
    ]
  },

  // ═══════════════════════════════════════════
  // === DNS و سرویس‌های شبکه / DNS & Network Services ===
  // ═══════════════════════════════════════════
  {
    port: 53,
    name: "DNS",
    abbreviation: "DNS",
    description: {
      fa: "تبدیل نام دامنه به آدرس IP",
      en: "Domain name to IP address resolution"
    },
    category: { fa: "سرویس‌های شبکه", en: "Network Services" },
    transport: "TCP/UDP",
    rfc: [1034, 1035],
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["رزولوشن دامنه", "سیستم نام‌گذاری اینترنت"],
      en: ["Domain resolution", "Internet naming system"]
    },
    alternativePorts: [853, 5353],
    introducedYear: 1983,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc1035"],
      wiki: "https://en.wikipedia.org/wiki/Domain_Name_System",
      docs: "https://www.isc.org/bind/"
    },
    codeExample: [
      {
        language: "bash",
        code: `dig example.com
nslookup example.com
host example.com`
      },
      {
        language: "python",
        code: `import socket
ip = socket.gethostbyname('example.com')
print(ip)`
      }
    ]
  },

  {
    port: 67,
    name: "DHCP Server",
    abbreviation: "DHCP",
    description: {
      fa: "تخصیص خودکار IP توسط سرور",
      en: "Automatic IP assignment by server"
    },
    category: { fa: "سرویس‌های شبکه", en: "Network Services" },
    transport: "UDP",
    rfc: [2131],
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["تخصیص خودکار IP در شبکه محلی", "پیکربندی خودکار کلاینت‌ها"],
      en: ["Automatic IP assignment in LAN", "Automatic client configuration"]
    },
    introducedYear: 1993,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc2131"],
      wiki: "https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol"
    }
  },

  {
    port: 68,
    name: "DHCP Client",
    abbreviation: "DHCP",
    description: {
      fa: "دریافت تنظیمات شبکه از سرور DHCP",
      en: "Receive network settings from DHCP server"
    },
    category: { fa: "سرویس‌های شبکه", en: "Network Services" },
    transport: "UDP",
    rfc: [2131],
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["دریافت IP از DHCP Server"],
      en: ["Receiving IP from DHCP Server"]
    },
    introducedYear: 1993,
    vendor: "IETF",
    isDeprecated: false
  },

  {
    port: 123,
    name: "NTP",
    abbreviation: "NTP",
    description: {
      fa: "همگام‌سازی ساعت سیستم‌ها در شبکه",
      en: "Network time synchronization"
    },
    category: { fa: "سرویس‌های شبکه", en: "Network Services" },
    transport: "UDP",
    rfc: [5905],
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["همگام‌سازی زمان سرورها", "تنظیم ساعت سیستم‌عامل"],
      en: ["Server time synchronization", "OS clock setting"]
    },
    introducedYear: 1985,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc5905"],
      wiki: "https://en.wikipedia.org/wiki/Network_Time_Protocol",
      docs: "https://www.ntp.org/"
    },
    codeExample: [
      {
        language: "bash",
        code: `ntpdate pool.ntp.org
ntpq -p`
      }
    ]
  },

  {
    port: 161,
    name: "SNMP",
    abbreviation: "SNMP",
    description: {
      fa: "مانیتورینگ و مدیریت تجهیزات شبکه",
      en: "Network device monitoring and management"
    },
    category: { fa: "مدیریت شبکه", en: "Network Management" },
    transport: "UDP",
    rfc: [1157, 3411, 3412, 3413, 3414, 3415, 3416, 3417, 3418],
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["مانیتورینگ روترها و سوییچ‌ها", "جمع‌آوری متریک شبکه"],
      en: ["Router and switch monitoring", "Network metrics collection"]
    },
    alternativePorts: [162],
    introducedYear: 1988,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc3411"],
      wiki: "https://en.wikipedia.org/wiki/Simple_Network_Management_Protocol"
    },
    codeExample: [
      {
        language: "bash",
        code: `snmpwalk -v2c -c public 192.168.1.1
snmpget -v2c -c public 192.168.1.1 1.3.6.1.2.1.1.1.0`
      }
    ]
  },

  {
    port: 162,
    name: "SNMP Trap",
    abbreviation: "SNMP-Trap",
    description: {
      fa: "دریافت هشدارهای SNMP",
      en: "Receive SNMP alert notifications"
    },
    category: { fa: "مدیریت شبکه", en: "Network Management" },
    transport: "UDP",
    rfc: [3416],
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["دریافت نوتیفیکیشن از تجهیزات شبکه"],
      en: ["Receive notifications from network devices"]
    },
    introducedYear: 1988,
    vendor: "IETF",
    isDeprecated: false
  },

  {
    port: 179,
    name: "BGP",
    abbreviation: "BGP",
    description: {
      fa: "پروتکل مسیریابی مرزی",
      en: "Border Gateway Protocol"
    },
    category: { fa: "سرویس‌های شبکه", en: "Network Services" },
    transport: "TCP",
    rfc: [4271],
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["مسیریابی بین AS ها", "اینترنت Backbone"],
      en: ["Inter-AS routing", "Internet backbone"]
    },
    introducedYear: 1994,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc4271"],
      wiki: "https://en.wikipedia.org/wiki/Border_Gateway_Protocol"
    }
  },

  {
    port: 853,
    name: "DNS over TLS",
    abbreviation: "DoT",
    description: {
      fa: "DNS رمزنگاری‌شده با TLS",
      en: "Encrypted DNS with TLS"
    },
    category: { fa: "سرویس‌های شبکه", en: "Network Services" },
    transport: "TCP",
    rfc: [7858],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["DNS امن و خصوصی", "جلوگیری از DNS Spoofing"],
      en: ["Secure and private DNS", "Prevent DNS spoofing"]
    },
    introducedYear: 2016,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc7858"],
      wiki: "https://en.wikipedia.org/wiki/DNS_over_TLS"
    },
    codeExample: [
      {
        language: "bash",
        code: `kdig -d @1.1.1.1 +tls example.com`
      }
    ]
  },

  {
    port: 5353,
    name: "mDNS",
    abbreviation: "mDNS",
    description: {
      fa: "DNS چندپخشی برای شبکه محلی",
      en: "Multicast DNS for local network"
    },
    category: { fa: "سرویس‌های شبکه", en: "Network Services" },
    transport: "UDP",
    rfc: [6762],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["کشف دستگاه‌های محلی (Bonjour, Avahi)", "پرینترهای شبکه"],
      en: ["Local device discovery (Bonjour, Avahi)", "Network printers"]
    },
    introducedYear: 2013,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc6762"],
      wiki: "https://en.wikipedia.org/wiki/Multicast_DNS"
    }
  },

  // ═══════════════════════════════════════════
  // === پایگاه داده / Database ===
  // ═══════════════════════════════════════════
  {
    port: 1433,
    name: "MS SQL Server",
    abbreviation: "MSSQL",
    description: {
      fa: "پایگاه داده مایکروسافت SQL Server",
      en: "Microsoft SQL Server database"
    },
    category: { fa: "پایگاه داده", en: "Database" },
    transport: "TCP",
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["پایگاه داده‌های ویندوزی", "برنامه‌های .NET"],
      en: ["Windows databases", ".NET applications"]
    },
    introducedYear: 1989,
    vendor: "Microsoft",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Microsoft_SQL_Server",
      docs: "https://docs.microsoft.com/en-us/sql/"
    },
    codeExample: [
      {
        language: "python",
        code: `import pyodbc
conn = pyodbc.connect('DRIVER={SQL Server};SERVER=localhost;DATABASE=mydb;UID=user;PWD=pass')
cursor = conn.cursor()
cursor.execute('SELECT * FROM users')
for row in cursor:
    print(row)`
      },
      {
        language: "csharp",
        code: `using (SqlConnection conn = new SqlConnection("Server=localhost;Database=mydb;User Id=sa;Password=pass;"))
{
    conn.Open();
    SqlCommand cmd = new SqlCommand("SELECT * FROM users", conn);
    SqlDataReader reader = cmd.ExecuteReader();
}`
      }
    ]
  },

  {
    port: 1521,
    name: "Oracle DB",
    abbreviation: "Oracle",
    description: {
      fa: "پایگاه داده اوراکل",
      en: "Oracle database system"
    },
    category: { fa: "پایگاه داده", en: "Database" },
    transport: "TCP",
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["پایگاه داده سازمانی", "سیستم‌های ERP و CRM"],
      en: ["Enterprise databases", "ERP and CRM systems"]
    },
    introducedYear: 1979,
    vendor: "Oracle Corporation",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Oracle_Database",
      docs: "https://docs.oracle.com/en/database/"
    }
  },

  {
    port: 3306,
    name: "MySQL",
    abbreviation: "MySQL",
    description: {
      fa: "پایگاه داده رابطه‌ای متن‌باز محبوب",
      en: "Popular open-source relational database"
    },
    category: { fa: "پایگاه داده", en: "Database" },
    transport: "TCP",
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["وب‌سایت‌ها", "WordPress", "برنامه‌های وب"],
      en: ["Websites", "WordPress", "Web applications"]
    },
    introducedYear: 1995,
    vendor: "Oracle (originally MySQL AB)",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/MySQL",
      docs: "https://dev.mysql.com/doc/"
    },
    codeExample: [
      {
        language: "bash",
        code: `mysql -h localhost -u root -p
mysql -h example.com -P 3306 -u user -p database`
      },
      {
        language: "python",
        code: `import mysql.connector
conn = mysql.connector.connect(host='localhost', user='root', password='pass', database='mydb')
cursor = conn.cursor()
cursor.execute('SELECT * FROM users')
for row in cursor:
    print(row)`
      },
      {
        language: "node",
        code: `const mysql = require('mysql');
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pass',
  database: 'mydb'
});
conn.query('SELECT * FROM users', (err, results) => {
  console.log(results);
});`
      }
    ]
  },

  {
    port: 5432,
    name: "PostgreSQL",
    abbreviation: "PostgreSQL",
    description: {
      fa: "پایگاه داده رابطه‌ای قدرتمند متن‌باز",
      en: "Powerful open-source relational database"
    },
    category: { fa: "پایگاه داده", en: "Database" },
    transport: "TCP",
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["برنامه‌های وب مدرن", "تحلیل داده", "GIS"],
      en: ["Modern web applications", "Data analytics", "GIS"]
    },
    introducedYear: 1996,
    vendor: "PostgreSQL Global Development Group",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/PostgreSQL",
      docs: "https://www.postgresql.org/docs/"
    },
    codeExample: [
      {
        language: "bash",
        code: `psql -h localhost -U postgres -d mydb`
      },
      {
        language: "python",
        code: `import psycopg2
conn = psycopg2.connect(host='localhost', database='mydb', user='postgres', password='pass')
cursor = conn.cursor()
cursor.execute('SELECT * FROM users')
print(cursor.fetchall())`
      }
    ]
  },

  {
    port: 6379,
    name: "Redis",
    abbreviation: "Redis",
    description: {
      fa: "ذخیره‌سازی داده در حافظه (کش)",
      en: "In-memory data store (cache)"
    },
    category: { fa: "پایگاه داده", en: "Database" },
    transport: "TCP",
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["کش برنامه", "صف پیام", "Session storage"],
      en: ["Application cache", "Message queue", "Session storage"]
    },
    introducedYear: 2009,
    vendor: "Redis Ltd.",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Redis",
      docs: "https://redis.io/documentation"
    },
    codeExample: [
      {
        language: "bash",
        code: `redis-cli
redis-cli -h localhost -p 6379
redis-cli SET mykey "Hello"
redis-cli GET mykey`
      },
      {
        language: "python",
        code: `import redis
r = redis.Redis(host='localhost', port=6379, db=0)
r.set('key', 'value')
print(r.get('key'))`
      },
      {
        language: "node",
        code: `const redis = require('redis');
const client = redis.createClient();
client.set('key', 'value');
client.get('key', (err, reply) => {
  console.log(reply);
});`
      }
    ]
  },

  {
    port: 9200,
    name: "Elasticsearch",
    abbreviation: "ES",
    description: {
      fa: "موتور جستجو و تحلیل داده",
      en: "Search and analytics engine"
    },
    category: { fa: "پایگاه داده", en: "Database" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "high",
    commonUseCases: {
      fa: ["جستجوی متن کامل", "لاگ تحلیل (ELK Stack)", "مانیتورینگ"],
      en: ["Full-text search", "Log analytics (ELK Stack)", "Monitoring"]
    },
    introducedYear: 2010,
    vendor: "Elastic NV",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Elasticsearch",
      docs: "https://www.elastic.co/guide/en/elasticsearch/"
    },
    codeExample: [
      {
        language: "bash",
        code: `curl -X GET "localhost:9200/"
curl -X POST "localhost:9200/myindex/_doc/1" -H 'Content-Type: application/json' -d'
{
  "user": "john",
  "message": "Hello"
}'`
      },
      {
        language: "python",
        code: `from elasticsearch import Elasticsearch
es = Elasticsearch(['http://localhost:9200'])
es.index(index='myindex', id=1, body={'user': 'john', 'message': 'Hello'})
res = es.search(index='myindex', body={'query': {'match_all': {}}})`
      }
    ]
  },

  {
    port: 27017,
    name: "MongoDB",
    abbreviation: "MongoDB",
    description: {
      fa: "پایگاه داده NoSQL سندگرا",
      en: "Document-oriented NoSQL database"
    },
    category: { fa: "پایگاه داده", en: "Database" },
    transport: "TCP",
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["برنامه‌های Node.js", "داده‌های JSON", "اپلیکیشن‌های مدرن"],
      en: ["Node.js applications", "JSON data", "Modern applications"]
    },
    introducedYear: 2009,
    vendor: "MongoDB Inc.",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/MongoDB",
      docs: "https://www.mongodb.com/docs/"
    },
    codeExample: [
      {
        language: "bash",
        code: `mongosh mongodb://localhost:27017
mongosh --host localhost --port 27017`
      },
      {
        language: "python",
        code: `from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client['mydb']
collection = db['users']
collection.insert_one({'name': 'John', 'age': 30})
for doc in collection.find():
    print(doc)`
      },
      {
        language: "node",
        code: `const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');
await client.connect();
const db = client.db('mydb');
const collection = db.collection('users');
await collection.insertOne({ name: 'John', age: 30 });`
      }
    ]
  },

  // ═══════════════════════════════════════════
  // === فایل / File Transfer ===
  // ═══════════════════════════════════════════
  {
    port: 20,
    name: "FTP Data",
    abbreviation: "FTP-Data",
    description: {
      fa: "انتقال داده FTP (حالت فعال)",
      en: "FTP data transfer (active mode)"
    },
    category: { fa: "انتقال فایل", en: "File Transfer" },
    transport: "TCP",
    rfc: [959],
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["انتقال فایل در حالت فعال FTP"],
      en: ["File transfer in FTP active mode"]
    },
    introducedYear: 1985,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc959"]
    }
  },

  {
    port: 21,
    name: "FTP Control",
    abbreviation: "FTP",
    description: {
      fa: "کنترل و احراز هویت FTP",
      en: "FTP control and authentication"
    },
    category: { fa: "انتقال فایل", en: "File Transfer" },
    transport: "TCP",
    rfc: [959],
    ianaStatus: "official",
    securityRisk: "critical",
    commonUseCases: {
      fa: ["انتقال فایل ناامن", "سرورهای قدیمی"],
      en: ["Insecure file transfer", "Legacy servers"]
    },
    alternativePorts: [2121],
    introducedYear: 1985,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc959"],
      wiki: "https://en.wikipedia.org/wiki/File_Transfer_Protocol"
    },
    codeExample: [
      {
        language: "bash",
        code: `ftp ftp.example.com
# یا با curl:
curl -u user:pass ftp://ftp.example.com/file.txt`
      },
      {
        language: "python",
        code: `from ftplib import FTP
ftp = FTP('ftp.example.com')
ftp.login('user', 'pass')
ftp.retrlines('LIST')
ftp.quit()`
      }
    ]
  },

  {
    port: 69,
    name: "TFTP",
    abbreviation: "TFTP",
    description: {
      fa: "پروتکل ساده انتقال فایل",
      en: "Trivial File Transfer Protocol"
    },
    category: { fa: "انتقال فایل", en: "File Transfer" },
    transport: "UDP",
    rfc: [1350],
    ianaStatus: "official",
    securityRisk: "critical",
    commonUseCases: {
      fa: ["بوت شبکه (PXE)", "بارگذاری فریمور روترها", "فایل‌های کوچک"],
      en: ["Network boot (PXE)", "Router firmware upload", "Small files"]
    },
    introducedYear: 1981,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc1350"],
      wiki: "https://en.wikipedia.org/wiki/Trivial_File_Transfer_Protocol"
    }
  },

  {
    port: 115,
    name: "SFTP (Simple FTP)",
    abbreviation: "SFTP",
    description: {
      fa: "پروتکل ساده انتقال فایل (نه SSH SFTP)",
      en: "Simple File Transfer Protocol (not SSH SFTP)"
    },
    category: { fa: "انتقال فایل", en: "File Transfer" },
    transport: "TCP",
    rfc: [913],
    ianaStatus: "official",
    securityRisk: "critical",
    commonUseCases: {
      fa: ["پروتکل قدیمی - منسوخ شده"],
      en: ["Legacy protocol - deprecated"]
    },
    introducedYear: 1984,
    vendor: "IETF",
    isDeprecated: true,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc913"]
    }
  },

  {
    port: 989,
    name: "FTPS Data",
    abbreviation: "FTPS-Data",
    description: {
      fa: "انتقال داده FTP امن",
      en: "Secure FTP data transfer"
    },
    category: { fa: "انتقال فایل", en: "File Transfer" },
    transport: "TCP",
    rfc: [4217],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["انتقال امن فایل"],
      en: ["Secure file transfer"]
    },
    introducedYear: 2005,
    vendor: "IETF",
    isDeprecated: false
  },

  {
    port: 990,
    name: "FTPS Control",
    abbreviation: "FTPS",
    description: {
      fa: "FTP امن با SSL/TLS",
      en: "Secure FTP with SSL/TLS"
    },
    category: { fa: "انتقال فایل", en: "File Transfer" },
    transport: "TCP",
    rfc: [4217],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["انتقال فایل رمزنگاری‌شده", "جایگزین امن FTP"],
      en: ["Encrypted file transfer", "Secure FTP alternative"]
    },
    introducedYear: 2005,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc4217"],
      wiki: "https://en.wikipedia.org/wiki/FTPS"
    }
  },

  {
    port: 3260,
    name: "iSCSI",
    abbreviation: "iSCSI",
    description: {
      fa: "پروتکل ذخیره‌سازی بلوکی روی IP",
      en: "Internet SCSI block storage protocol"
    },
    category: { fa: "ذخیره‌سازی", en: "Storage" },
    transport: "TCP",
    rfc: [7143],
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["SAN شبکه", "ذخیره‌سازی مجازی", "VMware"],
      en: ["Network SAN", "Virtual storage", "VMware"]
    },
    introducedYear: 2003,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc7143"],
      wiki: "https://en.wikipedia.org/wiki/ISCSI"
    }
  },

  // ═══════════════════════════════════════════
  // === پیام‌رسانی / Messaging ===
  // ═══════════════════════════════════════════
  {
    port: 1883,
    name: "MQTT",
    abbreviation: "MQTT",
    description: {
      fa: "پروتکل سبک پیام‌رسانی IoT",
      en: "Lightweight IoT messaging protocol"
    },
    category: { fa: "پیام‌رسانی", en: "Messaging" },
    transport: "TCP",
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["اینترنت اشیا", "سنسورها", "خانه هوشمند"],
      en: ["Internet of Things", "Sensors", "Smart home"]
    },
    alternativePorts: [8883],
    introducedYear: 1999,
    vendor: "OASIS",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/MQTT",
      docs: "https://mqtt.org/"
    },
    codeExample: [
      {
        language: "python",
        code: `import paho.mqtt.client as mqtt
client = mqtt.Client()
client.connect("broker.example.com", 1883)
client.publish("home/temperature", "22.5")
client.subscribe("home/humidity")
client.loop_forever()`
      }
    ]
  },

  {
    port: 5672,
    name: "AMQP",
    abbreviation: "AMQP",
    description: {
      fa: "پروتکل صف پیام پیشرفته",
      en: "Advanced Message Queuing Protocol"
    },
    category: { fa: "پیام‌رسانی", en: "Messaging" },
    transport: "TCP",
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["RabbitMQ", "صف پیام سازمانی", "سیستم‌های توزیع‌شده"],
      en: ["RabbitMQ", "Enterprise message queue", "Distributed systems"]
    },
    alternativePorts: [5671],
    introducedYear: 2003,
    vendor: "OASIS",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Advanced_Message_Queuing_Protocol",
      docs: "https://www.amqp.org/"
    },
    codeExample: [
      {
        language: "python",
        code: `import pika
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue='hello')
channel.basic_publish(exchange='', routing_key='hello', body='Hello World!')
connection.close()`
      }
    ]
  },

  {
    port: 9092,
    name: "Apache Kafka",
    abbreviation: "Kafka",
    description: {
      fa: "پلتفرم استریم پردازش توزیع‌شده",
      en: "Distributed streaming platform"
    },
    category: { fa: "پیام‌رسانی", en: "Messaging" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["استریم داده", "Event sourcing", "لاگ تجمیع"],
      en: ["Data streaming", "Event sourcing", "Log aggregation"]
    },
    introducedYear: 2011,
    vendor: "Apache Software Foundation",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Apache_Kafka",
      docs: "https://kafka.apache.org/documentation/"
    },
    codeExample: [
      {
        language: "python",
        code: `from kafka import KafkaProducer, KafkaConsumer
producer = KafkaProducer(bootstrap_servers='localhost:9092')
producer.send('my-topic', b'Hello Kafka')
consumer = KafkaConsumer('my-topic', bootstrap_servers='localhost:9092')
for message in consumer:
    print(message.value)`
      }
    ]
  },

  {
    port: 15672,
    name: "RabbitMQ Management",
    abbreviation: "RabbitMQ-Mgmt",
    description: {
      fa: "رابط مدیریت وب RabbitMQ",
      en: "RabbitMQ web management interface"
    },
    category: { fa: "پیام‌رسانی", en: "Messaging" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["پنل مدیریت RabbitMQ", "مانیتورینگ صف‌ها"],
      en: ["RabbitMQ admin panel", "Queue monitoring"]
    },
    introducedYear: 2007,
    vendor: "VMware (Pivotal)",
    isDeprecated: false,
    references: {
      docs: "https://www.rabbitmq.com/management.html"
    }
  },

  // ═══════════════════════════════════════════
  // === وب‌سرویس و API / Web Services & API ===
  // ═══════════════════════════════════════════
  {
    port: 3000,
    name: "Node.js Dev Server",
    abbreviation: "Node-Dev",
    description: {
      fa: "سرور توسعه پیش‌فرض Node.js",
      en: "Default Node.js development server"
    },
    category: { fa: "توسعه", en: "Development" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["React Dev", "Next.js", "Express.js"],
      en: ["React Dev", "Next.js", "Express.js"]
    },
    introducedYear: 2009,
    vendor: "Node.js Foundation",
    isDeprecated: false,
    codeExample: [
      {
        language: "node",
        code: `const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello'));
app.listen(3000, () => console.log('Server on port 3000'));`
      }
    ]
  },

  {
    port: 4200,
    name: "Angular Dev Server",
    abbreviation: "Angular",
    description: {
      fa: "سرور توسعه Angular CLI",
      en: "Angular CLI development server"
    },
    category: { fa: "توسعه", en: "Development" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["توسعه Angular"],
      en: ["Angular development"]
    },
    introducedYear: 2016,
    vendor: "Google",
    isDeprecated: false
  },

  {
    port: 5000,
    name: "Flask/Python Dev",
    abbreviation: "Flask",
    description: {
      fa: "سرور توسعه Flask",
      en: "Flask development server"
    },
    category: { fa: "توسعه", en: "Development" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["Flask", "Python web apps"],
      en: ["Flask", "Python web apps"]
    },
    introducedYear: 2010,
    vendor: "Pallets",
    isDeprecated: false,
    codeExample: [
      {
        language: "python",
        code: `from flask import Flask
app = Flask(__name__)
@app.route('/')
def hello():
    return 'Hello World!'
if __name__ == '__main__':
    app.run(port=5000)`
      }
    ]
  },

  {
    port: 5001,
    name: "Synology DSM",
    abbreviation: "DSM-HTTP",
    description: {
      fa: "پنل مدیریت وب Synology",
      en: "Synology DiskStation Manager web panel"
    },
    category: { fa: "مدیریت", en: "Management" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["مدیریت NAS سینولوژی"],
      en: ["Synology NAS management"]
    },
    vendor: "Synology",
    isDeprecated: false
  },

  {
    port: 8000,
    name: "HTTP Alternate 2",
    abbreviation: "HTTP-Alt2",
    description: {
      fa: "پورت جایگزین دیگر برای HTTP",
      en: "Another alternative HTTP port"
    },
    category: { fa: "وب", en: "Web" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["Django Dev", "Python SimpleHTTPServer"],
      en: ["Django Dev", "Python SimpleHTTPServer"]
    },
    isDeprecated: false,
    codeExample: [
      {
        language: "python",
        code: `# Python 3
python -m http.server 8000
# Python 2
python -m SimpleHTTPServer 8000`
      }
    ]
  },

  {
    port: 8888,
    name: "Jupyter Notebook",
    abbreviation: "Jupyter",
    description: {
      fa: "سرور نوت‌بوک جوپیتر",
      en: "Jupyter Notebook server"
    },
    category: { fa: "توسعه", en: "Development" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["علم داده", "یادگیری ماشین", "پایتون نوت‌بوک"],
      en: ["Data science", "Machine learning", "Python notebooks"]
    },
    introducedYear: 2015,
    vendor: "Project Jupyter",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Project_Jupyter",
      docs: "https://jupyter.org/"
    }
  },

  {
    port: 9000,
    name: "SonarQube",
    abbreviation: "SonarQube",
    description: {
      fa: "پلتفرم تحلیل کیفیت کد",
      en: "Code quality analysis platform"
    },
    category: { fa: "توسعه", en: "Development" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["تحلیل کد", "CI/CD"],
      en: ["Code analysis", "CI/CD"]
    },
    vendor: "SonarSource",
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === مانیتورینگ و لاگ / Monitoring & Logging ===
  // ═══════════════════════════════════════════
  {
    port: 514,
    name: "Syslog",
    abbreviation: "Syslog",
    description: {
      fa: "پروتکل استاندارد لاگ سیستم",
      en: "Standard system logging protocol"
    },
    category: { fa: "لاگ", en: "Logging" },
    transport: "UDP",
    rfc: [5424],
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["جمع‌آوری لاگ", "مانیتورینگ سرور", "تجهیزات شبکه"],
      en: ["Log collection", "Server monitoring", "Network devices"]
    },
    introducedYear: 1980,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc5424"],
      wiki: "https://en.wikipedia.org/wiki/Syslog"
    }
  },

  {
    port: 2003,
    name: "Graphite",
    abbreviation: "Graphite",
    description: {
      fa: "سرویس ذخیره متریک",
      en: "Metrics storage service"
    },
    category: { fa: "مانیتورینگ", en: "Monitoring" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["ذخیره متریک‌های سری زمانی"],
      en: ["Time-series metrics storage"]
    },
    vendor: "Graphite Project",
    isDeprecated: false,
    references: {
      docs: "https://graphite.readthedocs.io/"
    }
  },

  {
    port: 3100,
    name: "Grafana Loki",
    abbreviation: "Loki",
    description: {
      fa: "سیستم جمع‌آوری لاگ",
      en: "Log aggregation system"
    },
    category: { fa: "لاگ", en: "Logging" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["جمع‌آوری لاگ", "Grafana Stack"],
      en: ["Log aggregation", "Grafana Stack"]
    },
    introducedYear: 2018,
    vendor: "Grafana Labs",
    isDeprecated: false,
    references: {
      docs: "https://grafana.com/docs/loki/"
    }
  },

  {
    port: 5044,
    name: "Logstash",
    abbreviation: "Logstash",
    description: {
      fa: "ورودی Beats به Logstash",
      en: "Beats input to Logstash"
    },
    category: { fa: "لاگ", en: "Logging" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["ELK Stack", "جمع‌آوری لاگ"],
      en: ["ELK Stack", "Log collection"]
    },
    introducedYear: 2013,
    vendor: "Elastic NV",
    isDeprecated: false
  },

  {
    port: 5601,
    name: "Kibana",
    abbreviation: "Kibana",
    description: {
      fa: "رابط کاربری وب Elasticsearch",
      en: "Elasticsearch web UI"
    },
    category: { fa: "مانیتورینگ", en: "Monitoring" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["تجسم داده", "داشبورد لاگ"],
      en: ["Data visualization", "Log dashboard"]
    },
    introducedYear: 2013,
    vendor: "Elastic NV",
    isDeprecated: false,
    references: {
      docs: "https://www.elastic.co/kibana"
    }
  },

  {
    port: 9090,
    name: "Prometheus",
    abbreviation: "Prometheus",
    description: {
      fa: "سیستم مانیتورینگ و هشدار",
      en: "Monitoring and alerting system"
    },
    category: { fa: "مانیتورینگ", en: "Monitoring" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["مانیتورینگ کانتینر", "Kubernetes", "متریک‌های سری زمانی"],
      en: ["Container monitoring", "Kubernetes", "Time-series metrics"]
    },
    introducedYear: 2012,
    vendor: "CNCF",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Prometheus_(software)",
      docs: "https://prometheus.io/docs/"
    },
    codeExample: [
      {
        language: "yaml",
        code: `# prometheus.yml
scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']`
      }
    ]
  },

  {
    port: 9093,
    name: "Alertmanager",
    abbreviation: "Alertmanager",
    description: {
      fa: "مدیریت هشدارهای Prometheus",
      en: "Prometheus alert management"
    },
    category: { fa: "مانیتورینگ", en: "Monitoring" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["مدیریت هشدار", "نوتیفیکیشن"],
      en: ["Alert management", "Notifications"]
    },
    vendor: "CNCF",
    isDeprecated: false
  },

  {
    port: 9100,
    name: "Node Exporter",
    abbreviation: "Node-Exporter",
    description: {
      fa: "متریک‌های سخت‌افزار و OS",
      en: "Hardware and OS metrics exporter"
    },
    category: { fa: "مانیتورینگ", en: "Monitoring" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["مانیتورینگ سرور لینوکس"],
      en: ["Linux server monitoring"]
    },
    vendor: "Prometheus",
    isDeprecated: false
  },

  {
    port: 9091,
    name: "Prometheus Pushgateway",
    abbreviation: "Pushgateway",
    description: {
      fa: "دریافت متریک‌های Push",
      en: "Receive push metrics"
    },
    category: { fa: "مانیتورینگ", en: "Monitoring" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["متریک‌های Batch Job"],
      en: ["Batch job metrics"]
    },
    vendor: "Prometheus",
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === کانتینر و Orchestration / Container & Orchestration ===
  // ═══════════════════════════════════════════
  {
    port: 2375,
    name: "Docker (HTTP)",
    abbreviation: "Docker-HTTP",
    description: {
      fa: "Docker API بدون رمزنگاری",
      en: "Docker API without encryption"
    },
    category: { fa: "کانتینر", en: "Container" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "critical",
    commonUseCases: {
      fa: ["Docker Remote API (ناامن)"],
      en: ["Docker Remote API (insecure)"]
    },
    introducedYear: 2013,
    vendor: "Docker Inc.",
    isDeprecated: false,
    references: {
      docs: "https://docs.docker.com/engine/api/"
    },
    codeExample: [
      {
        language: "bash",
        code: `curl http://localhost:2375/v1.41/containers/json
docker -H tcp://localhost:2375 ps`
      }
    ]
  },

  {
    port: 2376,
    name: "Docker (TLS)",
    abbreviation: "Docker-TLS",
    description: {
      fa: "Docker API امن با TLS",
      en: "Secure Docker API with TLS"
    },
    category: { fa: "کانتینر", en: "Container" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["Docker Remote API امن"],
      en: ["Secure Docker Remote API"]
    },
    introducedYear: 2014,
    vendor: "Docker Inc.",
    isDeprecated: false
  },

  {
    port: 2377,
    name: "Docker Swarm",
    abbreviation: "Swarm",
    description: {
      fa: "مدیریت کلاستر Docker Swarm",
      en: "Docker Swarm cluster management"
    },
    category: { fa: "کانتینر", en: "Container" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["Orchestration داکر"],
      en: ["Docker orchestration"]
    },
    vendor: "Docker Inc.",
    isDeprecated: false
  },

  {
    port: 6443,
    name: "Kubernetes API",
    abbreviation: "K8s-API",
    description: {
      fa: "API سرور Kubernetes",
      en: "Kubernetes API server"
    },
    category: { fa: "کانتینر", en: "Container" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["مدیریت Kubernetes", "kubectl"],
      en: ["Kubernetes management", "kubectl"]
    },
    introducedYear: 2014,
    vendor: "CNCF",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Kubernetes",
      docs: "https://kubernetes.io/docs/"
    },
    codeExample: [
      {
        language: "bash",
        code: `kubectl cluster-info
kubectl get pods --all-namespaces
curl https://kubernetes:6443/api/v1/pods`
      }
    ]
  },

  {
    port: 10250,
    name: "Kubelet API",
    abbreviation: "Kubelet",
    description: {
      fa: "API نود Kubernetes",
      en: "Kubernetes node API"
    },
    category: { fa: "کانتینر", en: "Container" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["ارتباط با نودهای K8s"],
      en: ["Communication with K8s nodes"]
    },
    vendor: "CNCF",
    isDeprecated: false
  },

  {
    port: 10256,
    name: "kube-proxy",
    abbreviation: "kube-proxy",
    description: {
      fa: "هلث چک kube-proxy",
      en: "kube-proxy health check"
    },
    category: { fa: "کانتینر", en: "Container" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["Kubernetes Networking"],
      en: ["Kubernetes Networking"]
    },
    vendor: "CNCF",
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === بازی / Gaming ===
  // ═══════════════════════════════════════════
  {
    port: 25565,
    name: "Minecraft",
    abbreviation: "Minecraft",
    description: {
      fa: "سرور بازی ماینکرفت",
      en: "Minecraft game server"
    },
    category: { fa: "بازی", en: "Gaming" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["سرور ماینکرفت"],
      en: ["Minecraft server"]
    },
    introducedYear: 2009,
    vendor: "Mojang",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Minecraft"
    }
  },

  {
    port: 27015,
    name: "Steam/Source Engine",
    abbreviation: "Steam",
    description: {
      fa: "سرورهای بازی Source Engine",
      en: "Source Engine game servers"
    },
    category: { fa: "بازی", en: "Gaming" },
    transport: "TCP/UDP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["CS:GO", "Team Fortress 2", "Left 4 Dead"],
      en: ["CS:GO", "Team Fortress 2", "Left 4 Dead"]
    },
    vendor: "Valve Corporation",
    isDeprecated: false
  },

  {
    port: 3074,
    name: "Xbox Live",
    abbreviation: "Xbox",
    description: {
      fa: "سرویس بازی آنلاین Xbox",
      en: "Xbox online gaming service"
    },
    category: { fa: "بازی", en: "Gaming" },
    transport: "TCP/UDP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["Xbox Live multiplayer"],
      en: ["Xbox Live multiplayer"]
    },
    vendor: "Microsoft",
    isDeprecated: false
  },

  {
    port: 5222,
    name: "XMPP Client",
    abbreviation: "XMPP",
    description: {
      fa: "پروتکل پیام‌رسانی فوری",
      en: "Instant messaging protocol"
    },
    category: { fa: "پیام‌رسانی", en: "Messaging" },
    transport: "TCP",
    rfc: [6120, 6121, 6122],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["Jabber", "Google Talk (قدیمی)", "چت سرور"],
      en: ["Jabber", "Google Talk (legacy)", "Chat server"]
    },
    introducedYear: 1999,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc6120"],
      wiki: "https://en.wikipedia.org/wiki/XMPP"
    }
  },

  {
    port: 5269,
    name: "XMPP Server",
    abbreviation: "XMPP-S2S",
    description: {
      fa: "ارتباط بین سرورهای XMPP",
      en: "XMPP server-to-server communication"
    },
    category: { fa: "پیام‌رسانی", en: "Messaging" },
    transport: "TCP",
    rfc: [6120],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["فدراسیون XMPP"],
      en: ["XMPP federation"]
    },
    vendor: "IETF",
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === پراکسی و CDN / Proxy & CDN ===
  // ═══════════════════════════════════════════
  {
    port: 3128,
    name: "Squid Proxy",
    abbreviation: "Squid",
    description: {
      fa: "پراکسی کش وب",
      en: "Web caching proxy"
    },
    category: { fa: "پراکسی", en: "Proxy" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["پراکسی HTTP", "کش محتوا", "فیلترینگ وب"],
      en: ["HTTP proxy", "Content caching", "Web filtering"]
    },
    introducedYear: 1996,
    vendor: "Squid Project",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Squid_(software)",
      docs: "http://www.squid-cache.org/"
    }
  },

  {
    port: 8118,
    name: "Privoxy",
    abbreviation: "Privoxy",
    description: {
      fa: "پراکسی فیلترینگ وب",
      en: "Web filtering proxy"
    },
    category: { fa: "پراکسی", en: "Proxy" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["حریم خصوصی وب", "فیلتر تبلیغات"],
      en: ["Web privacy", "Ad filtering"]
    },
    vendor: "Privoxy Project",
    isDeprecated: false
  },

  {
    port: 1080,
    name: "SOCKS Proxy",
    abbreviation: "SOCKS",
    description: {
      fa: "پراکسی SOCKS",
      en: "SOCKS proxy protocol"
    },
    category: { fa: "پراکسی", en: "Proxy" },
    transport: "TCP",
    rfc: [1928],
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["تونل ترافیک", "دور زدن فیلترینگ"],
      en: ["Traffic tunneling", "Bypass filtering"]
    },
    introducedYear: 1996,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc1928"],
      wiki: "https://en.wikipedia.org/wiki/SOCKS"
    }
  },

  // ═══════════════════════════════════════════
  // === مدیا استریمینگ / Media Streaming ===
  // ═══════════════════════════════════════════
  {
    port: 554,
    name: "RTSP",
    abbreviation: "RTSP",
    description: {
      fa: "پروتکل استریم زنده رسانه",
      en: "Real-time streaming protocol"
    },
    category: { fa: "استریمینگ", en: "Streaming" },
    transport: "TCP/UDP",
    rfc: [2326, 7826],
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["دوربین‌های IP", "استریم ویدیو", "VLC"],
      en: ["IP cameras", "Video streaming", "VLC"]
    },
    introducedYear: 1998,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc7826"],
      wiki: "https://en.wikipedia.org/wiki/Real_Time_Streaming_Protocol"
    }
  },

  {
    port: 1935,
    name: "RTMP",
    abbreviation: "RTMP",
    description: {
      fa: "پروتکل پیام‌رسانی زمان واقعی Adobe",
      en: "Adobe Real-Time Messaging Protocol"
    },
    category: { fa: "استریمینگ", en: "Streaming" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["استریم زنده", "Twitch", "YouTube Live (قدیمی)"],
      en: ["Live streaming", "Twitch", "YouTube Live (legacy)"]
    },
    introducedYear: 2002,
    vendor: "Adobe",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Real-Time_Messaging_Protocol"
    }
  },

  {
    port: 8554,
    name: "RTSP Alternate",
    abbreviation: "RTSP-Alt",
    description: {
      fa: "پورت جایگزین RTSP",
      en: "Alternative RTSP port"
    },
    category: { fa: "استریمینگ", en: "Streaming" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["دوربین‌های مداربسته"],
      en: ["CCTV cameras"]
    },
    isDeprecated: false
  },

  {
    port: 32400,
    name: "Plex Media Server",
    abbreviation: "Plex",
    description: {
      fa: "سرور مدیا Plex",
      en: "Plex media server"
    },
    category: { fa: "استریمینگ", en: "Streaming" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["استریم فیلم و سریال شخصی"],
      en: ["Personal movie and TV streaming"]
    },
    introducedYear: 2009,
    vendor: "Plex Inc.",
    isDeprecated: false,
    references: {
      docs: "https://www.plex.tv/"
    }
  },

  // ═══════════════════════════════════════════
  // === چاپ / Printing ===
  // ═══════════════════════════════════════════
  {
    port: 631,
    name: "IPP/CUPS",
    abbreviation: "IPP",
    description: {
      fa: "پروتکل چاپ اینترنتی",
      en: "Internet Printing Protocol"
    },
    category: { fa: "چاپ", en: "Printing" },
    transport: "TCP",
    rfc: [8010, 8011],
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["چاپگرهای شبکه", "CUPS در لینوکس"],
      en: ["Network printers", "CUPS on Linux"]
    },
    introducedYear: 1999,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc8010"],
      wiki: "https://en.wikipedia.org/wiki/Internet_Printing_Protocol"
    }
  },

  {
    port: 515,
    name: "LPD/LPR",
    abbreviation: "LPD",
    description: {
      fa: "دیمون چاپ خطی (قدیمی)",
      en: "Line Printer Daemon (legacy)"
    },
    category: { fa: "چاپ", en: "Printing" },
    transport: "TCP",
    rfc: [1179],
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["پرینترهای قدیمی یونیکس"],
      en: ["Legacy Unix printers"]
    },
    introducedYear: 1990,
    vendor: "IETF",
    isDeprecated: true,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc1179"]
    }
  },

  {
    port: 9100,
    name: "Raw Printing (HP JetDirect)",
    abbreviation: "RAW",
    description: {
      fa: "چاپ مستقیم بدون پردازش",
      en: "Direct raw printing"
    },
    category: { fa: "چاپ", en: "Printing" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["چاپگرهای HP", "چاپ شبکه"],
      en: ["HP printers", "Network printing"]
    },
    vendor: "HP",
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === دسکتاپ از راه دور / Remote Desktop ===
  // ═══════════════════════════════════════════
  {
    port: 3389,
    name: "RDP",
    abbreviation: "RDP",
    description: {
      fa: "پروتکل دسکتاپ از راه دور مایکروسافت",
      en: "Microsoft Remote Desktop Protocol"
    },
    category: { fa: "دسترسی از راه دور", en: "Remote Access" },
    transport: "TCP",
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["دسکتاپ ریموت ویندوز", "مدیریت سرور"],
      en: ["Windows remote desktop", "Server management"]
    },
    introducedYear: 1996,
    vendor: "Microsoft",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Remote_Desktop_Protocol",
      docs: "https://docs.microsoft.com/en-us/windows-server/remote/remote-desktop-services/"
    },
    codeExample: [
      {
        language: "bash",
        code: `# از لینوکس:
rdesktop 192.168.1.100:3389
# یا با xfreerdp:
xfreerdp /v:192.168.1.100 /u:username`
      }
    ]
  },

  {
    port: 5900,
    name: "VNC",
    abbreviation: "VNC",
    description: {
      fa: "محاسبات شبکه‌ای مجازی",
      en: "Virtual Network Computing"
    },
    category: { fa: "دسترسی از راه دور", en: "Remote Access" },
    transport: "TCP",
    rfc: [6143],
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["دسکتاپ ریموت چند پلتفرمی", "پشتیبانی از راه دور"],
      en: ["Cross-platform remote desktop", "Remote support"]
    },
    introducedYear: 1998,
    vendor: "RealVNC",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc6143"],
      wiki: "https://en.wikipedia.org/wiki/Virtual_Network_Computing"
    },
    codeExample: [
      {
        language: "bash",
        code: `vncviewer 192.168.1.100:5900
# یا:
vncviewer 192.168.1.100:0`
      }
    ]
  },

  {
    port: 5901,
    name: "VNC Display 1",
    abbreviation: "VNC-1",
    description: {
      fa: "VNC برای نمایشگر شماره 1",
      en: "VNC for display number 1"
    },
    category: { fa: "دسترسی از راه دور", en: "Remote Access" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "high",
    commonUseCases: {
      fa: ["چند دسکتاپ VNC همزمان"],
      en: ["Multiple concurrent VNC desktops"]
    },
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === متفرقه / Miscellaneous ===
  // ═══════════════════════════════════════════
  {
    port: 135,
    name: "MS RPC",
    abbreviation: "MS-RPC",
    description: {
      fa: "RPC Endpoint Mapper مایکروسافت",
      en: "Microsoft RPC Endpoint Mapper"
    },
    category: { fa: "سیستم", en: "System" },
    transport: "TCP/UDP",
    ianaStatus: "official",
    securityRisk: "critical",
    commonUseCases: {
      fa: ["سرویس‌های داخلی ویندوز", "DCOM"],
      en: ["Windows internal services", "DCOM"]
    },
    introducedYear: 1990,
    vendor: "Microsoft",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Microsoft_RPC"
    }
  },

  {
    port: 139,
    name: "NetBIOS Session",
    abbreviation: "NetBIOS",
    description: {
      fa: "سرویس نشست NetBIOS",
      en: "NetBIOS Session Service"
    },
    category: { fa: "اشتراک فایل", en: "File Sharing" },
    transport: "TCP",
    rfc: [1001, 1002],
    ianaStatus: "official",
    securityRisk: "critical",
    commonUseCases: {
      fa: ["اشتراک فایل ویندوز قدیمی"],
      en: ["Legacy Windows file sharing"]
    },
    introducedYear: 1987,
    vendor: "IBM/Microsoft",
    isDeprecated: true,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc1001"],
      wiki: "https://en.wikipedia.org/wiki/NetBIOS"
    }
  },

  {
    port: 445,
    name: "SMB/CIFS",
    abbreviation: "SMB",
    description: {
      fa: "اشتراک فایل و پرینتر ویندوز",
      en: "Windows file and printer sharing"
    },
    category: { fa: "اشتراک فایل", en: "File Sharing" },
    transport: "TCP",
    ianaStatus: "official",
    securityRisk: "critical",
    commonUseCases: {
      fa: ["Network Share ویندوز", "Samba", "NAS"],
      en: ["Windows Network Share", "Samba", "NAS"]
    },
    introducedYear: 1996,
    vendor: "Microsoft",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Server_Message_Block"
    },
    codeExample: [
      {
        language: "bash",
        code: `# Windows:
net use Z: \\\\server\\share
# Linux:
smbclient //server/share -U username
mount -t cifs //server/share /mnt -o username=user`
      }
    ]
  },

  {
    port: 137,
    name: "NetBIOS Name",
    abbreviation: "NetBIOS-NS",
    description: {
      fa: "سرویس نام NetBIOS",
      en: "NetBIOS Name Service"
    },
    category: { fa: "اشتراک فایل", en: "File Sharing" },
    transport: "UDP",
    rfc: [1001],
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["تبدیل نام NetBIOS به IP"],
      en: ["NetBIOS name to IP resolution"]
    },
    introducedYear: 1987,
    vendor: "IBM/Microsoft",
    isDeprecated: true
  },

  {
    port: 138,
    name: "NetBIOS Datagram",
    abbreviation: "NetBIOS-DGM",
    description: {
      fa: "سرویس دیتاگرام NetBIOS",
      en: "NetBIOS Datagram Service"
    },
    category: { fa: "اشتراک فایل", en: "File Sharing" },
    transport: "UDP",
    rfc: [1001],
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["Browser service ویندوز"],
      en: ["Windows browser service"]
    },
    introducedYear: 1987,
    vendor: "IBM/Microsoft",
    isDeprecated: true
  },

  {
    port: 2049,
    name: "NFS",
    abbreviation: "NFS",
    description: {
      fa: "سیستم فایل شبکه",
      en: "Network File System"
    },
    category: { fa: "اشتراک فایل", en: "File Sharing" },
    transport: "TCP/UDP",
    rfc: [5531, 5532],
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["اشتراک فایل یونیکس/لینوکس"],
      en: ["Unix/Linux file sharing"]
    },
    introducedYear: 1984,
    vendor: "Sun Microsystems",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc5531"],
      wiki: "https://en.wikipedia.org/wiki/Network_File_System"
    },
    codeExample: [
      {
        language: "bash",
        code: `# Mount NFS share:
mount -t nfs server:/export/path /mnt
# در /etc/fstab:
server:/export/path /mnt nfs defaults 0 0`
      }
    ]
  },

  {
    port: 111,
    name: "RPC Portmapper",
    abbreviation: "Portmap",
    description: {
      fa: "نگاشت پورت RPC",
      en: "RPC port mapping"
    },
    category: { fa: "سیستم", en: "System" },
    transport: "TCP/UDP",
    rfc: [5531],
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["NFS", "NIS", "سرویس‌های RPC"],
      en: ["NFS", "NIS", "RPC services"]
    },
    introducedYear: 1995,
    vendor: "Sun Microsystems",
    isDeprecated: false
  },

  {
    port: 873,
    name: "rsync",
    abbreviation: "rsync",
    description: {
      fa: "همگام‌سازی فایل از راه دور",
      en: "Remote file synchronization"
    },
    category: { fa: "انتقال فایل", en: "File Transfer" },
    transport: "TCP",
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["بکآپ", "همگام‌سازی فایل", "آینه‌سازی"],
      en: ["Backup", "File sync", "Mirroring"]
    },
    introducedYear: 1996,
    vendor: "rsync.samba.org",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Rsync",
      docs: "https://rsync.samba.org/"
    },
    codeExample: [
      {
        language: "bash",
        code: `rsync -avz /source/ user@server:/destination/
rsync -avz --delete /source/ server::module/
rsync rsync://server/module/path`
      }
    ]
  },

  {
    port: 7,
    name: "Echo",
    abbreviation: "Echo",
    description: {
      fa: "سرویس بازگشت پیام (تست)",
      en: "Message echo service (testing)"
    },
    category: { fa: "تست", en: "Testing" },
    transport: "TCP/UDP",
    rfc: [862],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["تست اتصال شبکه"],
      en: ["Network connectivity testing"]
    },
    introducedYear: 1983,
    vendor: "IETF",
    isDeprecated: true,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc862"]
    }
  },

  {
    port: 9,
    name: "Discard",
    abbreviation: "Discard",
    description: {
      fa: "سرویس دور انداختن داده (تست)",
      en: "Data discard service (testing)"
    },
    category: { fa: "تست", en: "Testing" },
    transport: "TCP/UDP",
    rfc: [863],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["تست شبکه"],
      en: ["Network testing"]
    },
    introducedYear: 1983,
    vendor: "IETF",
    isDeprecated: true
  },

  {
    port: 19,
    name: "Chargen",
    abbreviation: "Chargen",
    description: {
      fa: "تولید کاراکتر (تست)",
      en: "Character generator (testing)"
    },
    category: { fa: "تست", en: "Testing" },
    transport: "TCP/UDP",
    rfc: [864],
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["تست پهنای باند"],
      en: ["Bandwidth testing"]
    },
    introducedYear: 1983,
    vendor: "IETF",
    isDeprecated: true
  },

  {
    port: 37,
    name: "Time Protocol",
    abbreviation: "Time",
    description: {
      fa: "پروتکل زمان شبکه ساده",
      en: "Simple network time protocol"
    },
    category: { fa: "سرویس‌های شبکه", en: "Network Services" },
    transport: "TCP/UDP",
    rfc: [868],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["همگام‌سازی ساعت ساده (منسوخ)"],
      en: ["Simple clock sync (deprecated)"]
    },
    introducedYear: 1983,
    vendor: "IETF",
    isDeprecated: true
  },

  {
    port: 43,
    name: "WHOIS",
    abbreviation: "WHOIS",
    description: {
      fa: "پرس‌وجوی اطلاعات دامنه",
      en: "Domain information query"
    },
    category: { fa: "سرویس‌های شبکه", en: "Network Services" },
    transport: "TCP",
    rfc: [3912],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["جستجوی اطلاعات دامنه", "مالکیت IP"],
      en: ["Domain information lookup", "IP ownership"]
    },
    introducedYear: 1982,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc3912"],
      wiki: "https://en.wikipedia.org/wiki/WHOIS"
    },
    codeExample: [
      {
        language: "bash",
        code: `whois example.com
whois 8.8.8.8`
      }
    ]
  },

  {
    port: 79,
    name: "Finger",
    abbreviation: "Finger",
    description: {
      fa: "پروتکل اطلاعات کاربر",
      en: "User information protocol"
    },
    category: { fa: "سرویس‌های شبکه", en: "Network Services" },
    transport: "TCP",
    rfc: [1288],
    ianaStatus: "official",
    securityRisk: "critical",
    commonUseCases: {
      fa: ["پروتکل قدیمی - منسوخ شده (خطر امنیتی)"],
      en: ["Legacy protocol - deprecated (security risk)"]
    },
    introducedYear: 1977,
    vendor: "IETF",
    isDeprecated: true,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc1288"]
    }
  },

  {
    port: 513,
    name: "rlogin",
    abbreviation: "rlogin",
    description: {
      fa: "ورود از راه دور (ناامن)",
      en: "Remote login (insecure)"
    },
    category: { fa: "دسترسی از راه دور", en: "Remote Access" },
    transport: "TCP",
    rfc: [1282],
    ianaStatus: "official",
    securityRisk: "critical",
    commonUseCases: {
      fa: ["پروتکل منسوخ - از SSH استفاده کنید"],
      en: ["Deprecated protocol - use SSH instead"]
    },
    introducedYear: 1983,
    vendor: "BSD",
    isDeprecated: true
  },

  {
    port: 512,
    name: "rexec",
    abbreviation: "rexec",
    description: {
      fa: "اجرای دستور از راه دور (ناامن)",
      en: "Remote execution (insecure)"
    },
    category: { fa: "دسترسی از راه دور", en: "Remote Access" },
    transport: "TCP",
    ianaStatus: "official",
    securityRisk: "critical",
    commonUseCases: {
      fa: ["پروتکل منسوخ - ناامن"],
      en: ["Deprecated protocol - insecure"]
    },
    introducedYear: 1983,
    vendor: "BSD",
    isDeprecated: true
  },

  {
    port: 1900,
    name: "UPnP/SSDP",
    abbreviation: "UPnP",
    description: {
      fa: "کشف خودکار دستگاه‌ها",
      en: "Automatic device discovery"
    },
    category: { fa: "سرویس‌های شبکه", en: "Network Services" },
    transport: "UDP",
    ianaStatus: "unofficial",
    securityRisk: "high",
    commonUseCases: {
      fa: ["روترها", "دستگاه‌های IoT", "DLNA"],
      en: ["Routers", "IoT devices", "DLNA"]
    },
    introducedYear: 1999,
    vendor: "UPnP Forum",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Universal_Plug_and_Play"
    }
  },

  {
    port: 5060,
    name: "SIP",
    abbreviation: "SIP",
    description: {
      fa: "پروتکل شروع نشست (VoIP)",
      en: "Session Initiation Protocol (VoIP)"
    },
    category: { fa: "VoIP", en: "VoIP" },
    transport: "TCP/UDP",
    rfc: [3261],
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["تلفن اینترنتی", "ویدیو کنفرانس"],
      en: ["Internet telephony", "Video conferencing"]
    },
    alternativePorts: [5061],
    introducedYear: 1999,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc3261"],
      wiki: "https://en.wikipedia.org/wiki/Session_Initiation_Protocol"
    }
  },

  {
    port: 5061,
    name: "SIP-TLS",
    abbreviation: "SIPS",
    description: {
      fa: "SIP امن با TLS",
      en: "Secure SIP with TLS"
    },
    category: { fa: "VoIP", en: "VoIP" },
    transport: "TCP",
    rfc: [3261],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["VoIP رمزنگاری‌شده"],
      en: ["Encrypted VoIP"]
    },
    vendor: "IETF",
    isDeprecated: false
  },

  {
    port: 1812,
    name: "RADIUS Auth",
    abbreviation: "RADIUS",
    description: {
      fa: "احراز هویت RADIUS",
      en: "RADIUS authentication"
    },
    category: { fa: "امنیت", en: "Security" },
    transport: "UDP",
    rfc: [2865],
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["احراز هویت WiFi", "VPN", "سرویس‌های شبکه"],
      en: ["WiFi authentication", "VPN", "Network services"]
    },
    introducedYear: 1997,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc2865"],
      wiki: "https://en.wikipedia.org/wiki/RADIUS"
    }
  },

  {
    port: 1813,
    name: "RADIUS Accounting",
    abbreviation: "RADIUS-Acct",
    description: {
      fa: "حسابداری RADIUS",
      en: "RADIUS accounting"
    },
    category: { fa: "امنیت", en: "Security" },
    transport: "UDP",
    rfc: [2866],
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["پیگیری استفاده شبکه"],
      en: ["Network usage tracking"]
    },
    vendor: "IETF",
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === CI/CD و DevOps / CI/CD & DevOps ===
  // ═══════════════════════════════════════════
  {
    port: 8081,
    name: "Jenkins (Alternate)",
    abbreviation: "Jenkins-Alt",
    description: {
      fa: "سرور اتوماسیون Jenkins",
      en: "Jenkins automation server"
    },
    category: { fa: "CI/CD", en: "CI/CD" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["CI/CD Pipeline", "اتوماسیون Build"],
      en: ["CI/CD Pipeline", "Build automation"]
    },
    alternativePorts: [8080],
    introducedYear: 2011,
    vendor: "Jenkins",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Jenkins_(software)",
      docs: "https://www.jenkins.io/doc/"
    }
  },

  {
    port: 8200,
    name: "HashiCorp Vault",
    abbreviation: "Vault",
    description: {
      fa: "مدیریت رمزها و اسرار",
      en: "Secrets and credentials management"
    },
    category: { fa: "امنیت", en: "Security" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["مدیریت API Keys", "رمزنگاری", "PKI"],
      en: ["API Keys management", "Encryption", "PKI"]
    },
    introducedYear: 2015,
    vendor: "HashiCorp",
    isDeprecated: false,
    references: {
      docs: "https://www.vaultproject.io/"
    },
    codeExample: [
      {
        language: "bash",
        code: `vault server -dev
vault kv put secret/myapp password=supersecret
vault kv get secret/myapp`
      }
    ]
  },

  {
    port: 8300,
    name: "HashiCorp Consul Server",
    abbreviation: "Consul",
    description: {
      fa: "سرویس کشف و پیکربندی",
      en: "Service discovery and configuration"
    },
    category: { fa: "سرویس‌های شبکه", en: "Network Services" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["Service Discovery", "Health Checking", "KV Store"],
      en: ["Service Discovery", "Health Checking", "KV Store"]
    },
    introducedYear: 2014,
    vendor: "HashiCorp",
    isDeprecated: false,
    references: {
      docs: "https://www.consul.io/"
    }
  },

  {
    port: 8500,
    name: "Consul HTTP API",
    abbreviation: "Consul-API",
    description: {
      fa: "رابط HTTP Consul",
      en: "Consul HTTP interface"
    },
    category: { fa: "سرویس‌های شبکه", en: "Network Services" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["رابط وب Consul", "API کلاینت"],
      en: ["Consul web UI", "Client API"]
    },
    vendor: "HashiCorp",
    isDeprecated: false
  },

  {
    port: 4646,
    name: "HashiCorp Nomad",
    abbreviation: "Nomad",
    description: {
      fa: "مدیریت Workload و Orchestration",
      en: "Workload orchestration"
    },
    category: { fa: "کانتینر", en: "Container" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["مدیریت کانتینر و VM"],
      en: ["Container and VM management"]
    },
    introducedYear: 2015,
    vendor: "HashiCorp",
    isDeprecated: false,
    references: {
      docs: "https://www.nomadproject.io/"
    }
  },

  {
    port: 50000,
    name: "Jenkins Agent",
    abbreviation: "Jenkins-Agent",
    description: {
      fa: "ارتباط با Jenkins Agents",
      en: "Jenkins agent communication"
    },
    category: { fa: "CI/CD", en: "CI/CD" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["اجرای Job های توزیع‌شده"],
      en: ["Distributed job execution"]
    },
    vendor: "Jenkins",
    isDeprecated: false
  },

  {
    port: 9999,
    name: "GitLab Pages",
    abbreviation: "GitLab-Pages",
    description: {
      fa: "سرور صفحات استاتیک GitLab",
      en: "GitLab static pages server"
    },
    category: { fa: "توسعه", en: "Development" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["هاست وب‌سایت استاتیک"],
      en: ["Static website hosting"]
    },
    vendor: "GitLab",
    isDeprecated: false
  },

  {
    port: 4040,
    name: "Apache Spark UI",
    abbreviation: "Spark-UI",
    description: {
      fa: "رابط وب Apache Spark",
      en: "Apache Spark web UI"
    },
    category: { fa: "پردازش داده", en: "Data Processing" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["مانیتور Spark Jobs"],
      en: ["Monitor Spark jobs"]
    },
    introducedYear: 2014,
    vendor: "Apache Software Foundation",
    isDeprecated: false
  },

  {
    port: 7077,
    name: "Apache Spark Master",
    abbreviation: "Spark-Master",
    description: {
      fa: "نود مستر Apache Spark",
      en: "Apache Spark master node"
    },
    category: { fa: "پردازش داده", en: "Data Processing" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["کلاستر Spark"],
      en: ["Spark cluster"]
    },
    vendor: "Apache Software Foundation",
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === پایگاه داده (ادامه) / Database (Continued) ===
  // ═══════════════════════════════════════════
  {
    port: 5984,
    name: "CouchDB",
    abbreviation: "CouchDB",
    description: {
      fa: "پایگاه داده NoSQL سندگرا",
      en: "Document-oriented NoSQL database"
    },
    category: { fa: "پایگاه داده", en: "Database" },
    transport: "TCP",
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["اپلیکیشن‌های موبایل", "همگام‌سازی آفلاین"],
      en: ["Mobile apps", "Offline sync"]
    },
    introducedYear: 2005,
    vendor: "Apache Software Foundation",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Apache_CouchDB",
      docs: "https://couchdb.apache.org/"
    },
    codeExample: [
      {
        language: "bash",
        code: `curl -X GET http://localhost:5984/
curl -X PUT http://localhost:5984/mydb
curl -X POST http://localhost:5984/mydb -d '{"name":"John"}' -H "Content-Type: application/json"`
      },
      {
        language: "python",
        code: `import couchdb
server = couchdb.Server('http://localhost:5984/')
db = server.create('mydb')
doc = {'name': 'John', 'age': 30}
db.save(doc)`
      }
    ]
  },

  {
    port: 7000,
    name: "Apache Cassandra",
    abbreviation: "Cassandra",
    description: {
      fa: "پایگاه داده توزیع‌شده NoSQL",
      en: "Distributed NoSQL database"
    },
    category: { fa: "پایگاه داده", en: "Database" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["داده‌های Big Data", "سیستم‌های مقیاس‌پذیر"],
      en: ["Big Data", "Scalable systems"]
    },
    introducedYear: 2008,
    vendor: "Apache Software Foundation",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Apache_Cassandra",
      docs: "https://cassandra.apache.org/"
    }
  },

  {
    port: 7474,
    name: "Neo4j Browser",
    abbreviation: "Neo4j",
    description: {
      fa: "پایگاه داده گراف",
      en: "Graph database"
    },
    category: { fa: "پایگاه داده", en: "Database" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["گراف‌های اجتماعی", "سیستم توصیه", "شبکه‌های پیچیده"],
      en: ["Social graphs", "Recommendation systems", "Complex networks"]
    },
    introducedYear: 2007,
    vendor: "Neo4j Inc.",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Neo4j",
      docs: "https://neo4j.com/docs/"
    },
    codeExample: [
      {
        language: "cypher",
        code: `// در Neo4j Browser:
CREATE (p:Person {name: 'John'})
MATCH (p:Person) WHERE p.name = 'John' RETURN p`
      }
    ]
  },

  {
    port: 7687,
    name: "Neo4j Bolt",
    abbreviation: "Neo4j-Bolt",
    description: {
      fa: "پروتکل باینری Neo4j",
      en: "Neo4j binary protocol"
    },
    category: { fa: "پایگاه داده", en: "Database" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["اتصال به Neo4j از اپلیکیشن"],
      en: ["Application connection to Neo4j"]
    },
    vendor: "Neo4j Inc.",
    isDeprecated: false
  },

  {
    port: 8086,
    name: "InfluxDB",
    abbreviation: "InfluxDB",
    description: {
      fa: "پایگاه داده سری زمانی",
      en: "Time-series database"
    },
    category: { fa: "پایگاه داده", en: "Database" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["متریک‌های IoT", "مانیتورینگ", "داده‌های سنسور"],
      en: ["IoT metrics", "Monitoring", "Sensor data"]
    },
    introducedYear: 2013,
    vendor: "InfluxData",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/InfluxDB",
      docs: "https://docs.influxdata.com/"
    },
    codeExample: [
      {
        language: "bash",
        code: `curl -i -XPOST 'http://localhost:8086/write?db=mydb' --data-binary 'temperature,location=room1 value=23.5'
curl -G 'http://localhost:8086/query?db=mydb' --data-urlencode 'q=SELECT * FROM temperature'`
      }
    ]
  },

  {
    port: 8529,
    name: "ArangoDB",
    abbreviation: "ArangoDB",
    description: {
      fa: "پایگاه داده چندمدلی",
      en: "Multi-model database"
    },
    category: { fa: "پایگاه داده", en: "Database" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["ترکیب Document/Graph/Key-Value"],
      en: ["Combined Document/Graph/Key-Value"]
    },
    introducedYear: 2011,
    vendor: "ArangoDB Inc.",
    isDeprecated: false,
    references: {
      docs: "https://www.arangodb.com/docs/"
    }
  },

  {
    port: 9042,
    name: "Cassandra CQL",
    abbreviation: "CQL",
    description: {
      fa: "پروتکل کلاینت Cassandra",
      en: "Cassandra client protocol"
    },
    category: { fa: "پایگاه داده", en: "Database" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["اتصال به Cassandra"],
      en: ["Connect to Cassandra"]
    },
    vendor: "Apache Software Foundation",
    isDeprecated: false,
    codeExample: [
      {
        language: "bash",
        code: `cqlsh localhost 9042`
      },
      {
        language: "python",
        code: `from cassandra.cluster import Cluster
cluster = Cluster(['localhost'], port=9042)
session = cluster.connect()
session.execute("CREATE KEYSPACE IF NOT EXISTS mykeyspace WITH replication = {'class':'SimpleStrategy', 'replication_factor':1}")`
      }
    ]
  },

  {
    port: 28015,
    name: "RethinkDB Client",
    abbreviation: "RethinkDB",
    description: {
      fa: "پایگاه داده Real-time",
      en: "Real-time database"
    },
    category: { fa: "پایگاه داده", en: "Database" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["اپلیکیشن‌های Real-time", "Collaborative apps"],
      en: ["Real-time apps", "Collaborative apps"]
    },
    introducedYear: 2009,
    vendor: "RethinkDB (archived)",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/RethinkDB",
      docs: "https://rethinkdb.com/"
    }
  },

  {
    port: 29015,
    name: "RethinkDB Web UI",
    abbreviation: "RethinkDB-UI",
    description: {
      fa: "رابط وب RethinkDB",
      en: "RethinkDB web interface"
    },
    category: { fa: "پایگاه داده", en: "Database" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["مدیریت RethinkDB"],
      en: ["RethinkDB management"]
    },
    vendor: "RethinkDB",
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === Message Brokers (ادامه) / Message Brokers ===
  // ═══════════════════════════════════════════
  {
    port: 4222,
    name: "NATS",
    abbreviation: "NATS",
    description: {
      fa: "سیستم پیام‌رسانی سبک",
      en: "Lightweight messaging system"
    },
    category: { fa: "پیام‌رسانی", en: "Messaging" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["Microservices", "IoT", "Cloud Native"],
      en: ["Microservices", "IoT", "Cloud Native"]
    },
    introducedYear: 2011,
    vendor: "CNCF",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/NATS_Messaging",
      docs: "https://docs.nats.io/"
    },
    codeExample: [
      {
        language: "bash",
        code: `nats-server
nats pub subject "Hello NATS"
nats sub subject`
      }
    ]
  },

  {
    port: 6222,
    name: "NATS Cluster",
    abbreviation: "NATS-Cluster",
    description: {
      fa: "ارتباط بین کلاستر NATS",
      en: "NATS cluster communication"
    },
    category: { fa: "پیام‌رسانی", en: "Messaging" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["کلاسترینگ NATS"],
      en: ["NATS clustering"]
    },
    vendor: "CNCF",
    isDeprecated: false
  },

  {
    port: 8222,
    name: "NATS Monitoring",
    abbreviation: "NATS-Mon",
    description: {
      fa: "مانیتورینگ NATS",
      en: "NATS monitoring"
    },
    category: { fa: "پیام‌رسانی", en: "Messaging" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["متریک‌های NATS"],
      en: ["NATS metrics"]
    },
    vendor: "CNCF",
    isDeprecated: false
  },

  {
    port: 4369,
    name: "Erlang Port Mapper",
    abbreviation: "EPMD",
    description: {
      fa: "نگاشت پورت Erlang",
      en: "Erlang port mapping"
    },
    category: { fa: "سیستم", en: "System" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["RabbitMQ", "CouchDB", "اپلیکیشن‌های Erlang"],
      en: ["RabbitMQ", "CouchDB", "Erlang applications"]
    },
    introducedYear: 1998,
    vendor: "Ericsson",
    isDeprecated: false
  },

  {
    port: 25672,
    name: "RabbitMQ Clustering",
    abbreviation: "RabbitMQ-Cluster",
    description: {
      fa: "ارتباط بین نودهای RabbitMQ",
      en: "RabbitMQ inter-node communication"
    },
    category: { fa: "پیام‌رسانی", en: "Messaging" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["کلاستر RabbitMQ"],
      en: ["RabbitMQ cluster"]
    },
    vendor: "VMware",
    isDeprecated: false
  },

  {
    port: 61613,
    name: "STOMP",
    abbreviation: "STOMP",
    description: {
      fa: "پروتکل پیام‌رسانی ساده متن",
      en: "Simple Text Oriented Messaging Protocol"
    },
    category: { fa: "پیام‌رسانی", en: "Messaging" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["WebSocket messaging", "ActiveMQ"],
      en: ["WebSocket messaging", "ActiveMQ"]
    },
    introducedYear: 2005,
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Streaming_Text_Oriented_Messaging_Protocol"
    }
  },

  {
    port: 61616,
    name: "ActiveMQ",
    abbreviation: "ActiveMQ",
    description: {
      fa: "Message Broker جاوا",
      en: "Java message broker"
    },
    category: { fa: "پیام‌رسانی", en: "Messaging" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["JMS", "اپلیکیشن‌های جاوا"],
      en: ["JMS", "Java applications"]
    },
    introducedYear: 2004,
    vendor: "Apache Software Foundation",
    isDeprecated: false,
    references: {
      docs: "https://activemq.apache.org/"
    }
  },

  // ═══════════════════════════════════════════
  // === وب فریمورک‌ها / Web Frameworks ===
  // ═══════════════════════════════════════════
  {
    port: 3001,
    name: "React/Vite Dev (Alt)",
    abbreviation: "Vite",
    description: {
      fa: "سرور توسعه Vite",
      en: "Vite development server"
    },
    category: { fa: "توسعه", en: "Development" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["React", "Vue", "Svelte"],
      en: ["React", "Vue", "Svelte"]
    },
    introducedYear: 2020,
    vendor: "Evan You",
    isDeprecated: false
  },

  {
    port: 4000,
    name: "Phoenix/Elixir",
    abbreviation: "Phoenix",
    description: {
      fa: "فریمورک Phoenix",
      en: "Phoenix framework"
    },
    category: { fa: "توسعه", en: "Development" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["اپلیکیشن‌های Elixir Real-time"],
      en: ["Elixir real-time applications"]
    },
    introducedYear: 2014,
    vendor: "Phoenix Framework",
    isDeprecated: false
  },

  {
    port: 5173,
    name: "Vite Default",
    abbreviation: "Vite-Default",
    description: {
      fa: "پورت پیش‌فرض Vite",
      en: "Vite default port"
    },
    category: { fa: "توسعه", en: "Development" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["توسعه فرانت‌اند مدرن"],
      en: ["Modern frontend development"]
    },
    introducedYear: 2020,
    isDeprecated: false
  },

  {
    port: 8081,
    name: "Webpack Dev Server",
    abbreviation: "Webpack",
    description: {
      fa: "سرور توسعه Webpack",
      en: "Webpack development server"
    },
    category: { fa: "توسعه", en: "Development" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["بیلد فرانت‌اند"],
      en: ["Frontend build"]
    },
    introducedYear: 2012,
    vendor: "Webpack",
    isDeprecated: false
  },

  {
    port: 9009,
    name: "SonarQube Scanner",
    abbreviation: "Sonar-Scanner",
    description: {
      fa: "اسکنر کد SonarQube",
      en: "SonarQube code scanner"
    },
    category: { fa: "توسعه", en: "Development" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["تحلیل کیفیت کد"],
      en: ["Code quality analysis"]
    },
    vendor: "SonarSource",
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === کنترل نسخه / Version Control ===
  // ═══════════════════════════════════════════
  {
    port: 9418,
    name: "Git Protocol",
    abbreviation: "Git",
    description: {
      fa: "پروتکل Git (غیر رمزنگاری‌شده)",
      en: "Git protocol (unencrypted)"
    },
    category: { fa: "کنترل نسخه", en: "Version Control" },
    transport: "TCP",
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["Clone مخازن عمومی"],
      en: ["Clone public repositories"]
    },
    introducedYear: 2005,
    vendor: "Linus Torvalds",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Git"
    },
    codeExample: [
      {
        language: "bash",
        code: `git clone git://github.com/user/repo.git`
      }
    ]
  },

  {
    port: 3690,
    name: "SVN",
    abbreviation: "SVN",
    description: {
      fa: "Apache Subversion",
      en: "Apache Subversion"
    },
    category: { fa: "کنترل نسخه", en: "Version Control" },
    transport: "TCP",
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["مخازن SVN", "سیستم‌های قدیمی"],
      en: ["SVN repositories", "Legacy systems"]
    },
    introducedYear: 2000,
    vendor: "Apache Software Foundation",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Apache_Subversion",
      docs: "https://subversion.apache.org/"
    },
    codeExample: [
      {
        language: "bash",
        code: `svn checkout svn://server/repo
svn commit -m "message"`
      }
    ]
  },

  // ═══════════════════════════════════════════
  // === Blockchain & Cryptocurrency ===
  // ═══════════════════════════════════════════
  {
    port: 8545,
    name: "Ethereum JSON-RPC",
    abbreviation: "Ethereum",
    description: {
      fa: "رابط JSON-RPC اتریوم",
      en: "Ethereum JSON-RPC interface"
    },
    category: { fa: "بلاک‌چین", en: "Blockchain" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "high",
    commonUseCases: {
      fa: ["نود اتریوم", "Web3", "DApps"],
      en: ["Ethereum node", "Web3", "DApps"]
    },
    introducedYear: 2015,
    vendor: "Ethereum Foundation",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Ethereum",
      docs: "https://ethereum.org/en/developers/docs/"
    },
    codeExample: [
      {
        language: "bash",
        code: `geth --http --http.port 8545
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' http://localhost:8545`
      }
    ]
  },

  {
    port: 8546,
    name: "Ethereum WebSocket",
    abbreviation: "Ethereum-WS",
    description: {
      fa: "WebSocket اتریوم",
      en: "Ethereum WebSocket"
    },
    category: { fa: "بلاک‌چین", en: "Blockchain" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["اتصال Real-time به بلاک‌چین"],
      en: ["Real-time blockchain connection"]
    },
    vendor: "Ethereum Foundation",
    isDeprecated: false
  },

  {
    port: 8333,
    name: "Bitcoin",
    abbreviation: "Bitcoin",
    description: {
      fa: "نود شبکه بیت‌کوین",
      en: "Bitcoin network node"
    },
    category: { fa: "بلاک‌چین", en: "Blockchain" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["نود بیت‌کوین", "ماینینگ"],
      en: ["Bitcoin node", "Mining"]
    },
    introducedYear: 2009,
    vendor: "Satoshi Nakamoto",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Bitcoin"
    }
  },

  {
    port: 18333,
    name: "Bitcoin Testnet",
    abbreviation: "Bitcoin-Test",
    description: {
      fa: "شبکه تست بیت‌کوین",
      en: "Bitcoin test network"
    },
    category: { fa: "بلاک‌چین", en: "Blockchain" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["توسعه و تست بیت‌کوین"],
      en: ["Bitcoin development and testing"]
    },
    vendor: "Bitcoin",
    isDeprecated: false
  },

  {
    port: 30303,
    name: "Ethereum P2P",
    abbreviation: "Eth-P2P",
    description: {
      fa: "شبکه همتا به همتای اتریوم",
      en: "Ethereum peer-to-peer network"
    },
    category: { fa: "بلاک‌چین", en: "Blockchain" },
    transport: "TCP/UDP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["همگام‌سازی نود اتریوم"],
      en: ["Ethereum node sync"]
    },
    vendor: "Ethereum Foundation",
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === IoT & Smart Home ===
  // ═══════════════════════════════════════════
  {
    port: 1883,
    name: "MQTT (duplicate entry - check earlier)",
    abbreviation: "MQTT",
    description: {
      fa: "پروتکل MQTT",
      en: "MQTT protocol"
    },
    category: { fa: "IoT", en: "IoT" },
    transport: "TCP",
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["سنسورها", "دستگاه‌های هوشمند"],
      en: ["Sensors", "Smart devices"]
    },
    isDeprecated: false
  },

  {
    port: 8883,
    name: "MQTT over TLS",
    abbreviation: "MQTTS",
    description: {
      fa: "MQTT امن با TLS",
      en: "Secure MQTT with TLS"
    },
    category: { fa: "IoT", en: "IoT" },
    transport: "TCP",
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["IoT امن"],
      en: ["Secure IoT"]
    },
    introducedYear: 2013,
    vendor: "OASIS",
    isDeprecated: false
  },

  {
    port: 5683,
    name: "CoAP",
    abbreviation: "CoAP",
    description: {
      fa: "پروتکل محدود اپلیکیشن",
      en: "Constrained Application Protocol"
    },
    category: { fa: "IoT", en: "IoT" },
    transport: "UDP",
    rfc: [7252],
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["دستگاه‌های کم‌مصرف", "M2M"],
      en: ["Low-power devices", "M2M"]
    },
    introducedYear: 2014,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc7252"],
      wiki: "https://en.wikipedia.org/wiki/Constrained_Application_Protocol"
    }
  },

  {
    port: 5684,
    name: "CoAP over DTLS",
    abbreviation: "CoAPS",
    description: {
      fa: "CoAP امن",
      en: "Secure CoAP"
    },
    category: { fa: "IoT", en: "IoT" },
    transport: "UDP",
    rfc: [7252],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["IoT امن"],
      en: ["Secure IoT"]
    },
    vendor: "IETF",
    isDeprecated: false
  },

  {
    port: 8883,
    name: "Home Assistant",
    abbreviation: "HA",
    description: {
      fa: "پلتفرم خانه هوشمند",
      en: "Smart home platform"
    },
    category: { fa: "خانه هوشمند", en: "Smart Home" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["اتوماسیون خانگی"],
      en: ["Home automation"]
    },
    introducedYear: 2013,
    isDeprecated: false
  },

  {
    port: 8123,
    name: "Home Assistant UI",
    abbreviation: "HA-UI",
    description: {
      fa: "رابط وب Home Assistant",
      en: "Home Assistant web interface"
    },
    category: { fa: "خانه هوشمند", en: "Smart Home" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["کنترل خانه هوشمند"],
      en: ["Smart home control"]
    },
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === Search & Analytics ===
  // ═══════════════════════════════════════════
  {
    port: 9300,
    name: "Elasticsearch Transport",
    abbreviation: "ES-Transport",
    description: {
      fa: "ارتباط داخلی Elasticsearch",
      en: "Elasticsearch internal communication"
    },
    category: { fa: "پایگاه داده", en: "Database" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "high",
    commonUseCases: {
      fa: ["کلاستر Elasticsearch"],
      en: ["Elasticsearch cluster"]
    },
    vendor: "Elastic NV",
    isDeprecated: false
  },

  {
    port: 8983,
    name: "Apache Solr",
    abbreviation: "Solr",
    description: {
      fa: "موتور جستجوی سازمانی",
      en: "Enterprise search engine"
    },
    category: { fa: "جستجو", en: "Search" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["جستجوی متن کامل", "فهرست‌سازی"],
      en: ["Full-text search", "Indexing"]
    },
    introducedYear: 2004,
    vendor: "Apache Software Foundation",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Apache_Solr",
      docs: "https://solr.apache.org/"
    }
  },

  {
    port: 9400,
    name: "Meilisearch",
    abbreviation: "Meilisearch",
    description: {
      fa: "موتور جستجوی سریع",
      en: "Fast search engine"
    },
    category: { fa: "جستجو", en: "Search" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["جستجوی instant", "autocomplete"],
      en: ["Instant search", "autocomplete"]
    },
    introducedYear: 2018,
    vendor: "Meilisearch",
    isDeprecated: false,
    references: {
      docs: "https://www.meilisearch.com/"
    }
  },

  // ═══════════════════════════════════════════
  // === CDN & Caching ===
  // ═══════════════════════════════════════════
  {
    port: 11211,
    name: "Memcached",
    abbreviation: "Memcached",
    description: {
      fa: "سیستم کش توزیع‌شده",
      en: "Distributed caching system"
    },
    category: { fa: "کش", en: "Cache" },
    transport: "TCP/UDP",
    ianaStatus: "official",
    securityRisk: "critical",
    commonUseCases: {
      fa: ["کش دیتابیس", "سشن", "افزایش سرعت"],
      en: ["Database cache", "Sessions", "Performance boost"]
    },
    introducedYear: 2003,
    vendor: "Danga Interactive",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Memcached",
      docs: "https://memcached.org/"
    },
    codeExample: [
      {
        language: "bash",
        code: `telnet localhost 11211
set mykey 0 3600 5
hello
get mykey`
      },
      {
        language: "python",
        code: `import memcache
mc = memcache.Client(['127.0.0.1:11211'])
mc.set("key", "value")
print(mc.get("key"))`
      }
    ]
  },

  {
    port: 6831,
    name: "Jaeger Agent",
    abbreviation: "Jaeger",
    description: {
      fa: "Distributed Tracing",
      en: "Distributed tracing"
    },
    category: { fa: "مانیتورینگ", en: "Monitoring" },
    transport: "UDP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["ردیابی درخواست‌ها در Microservices"],
      en: ["Request tracing in microservices"]
    },
    introducedYear: 2015,
    vendor: "Uber/CNCF",
    isDeprecated: false,
    references: {
      docs: "https://www.jaegertracing.io/"
    }
  },

  {
    port: 14268,
    name: "Jaeger Collector",
    abbreviation: "Jaeger-Collector",
    description: {
      fa: "جمع‌آوری Trace های Jaeger",
      en: "Jaeger trace collection"
    },
    category: { fa: "مانیتورینگ", en: "Monitoring" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["جمع‌آوری و ذخیره trace"],
      en: ["Trace collection and storage"]
    },
    vendor: "CNCF",
    isDeprecated: false
  },

  {
    port: 16686,
    name: "Jaeger UI",
    abbreviation: "Jaeger-UI",
    description: {
      fa: "رابط وب Jaeger",
      en: "Jaeger web interface"
    },
    category: { fa: "مانیتورینگ", en: "Monitoring" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["مشاهده trace ها"],
      en: ["View traces"]
    },
    vendor: "CNCF",
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === Tunneling & Proxy (ادامه) ===
  // ═══════════════════════════════════════════
  {
    port: 9050,
    name: "Tor SOCKS",
    abbreviation: "Tor",
    description: {
      fa: "پراکسی SOCKS شبکه Tor",
      en: "Tor network SOCKS proxy"
    },
    category: { fa: "پراکسی", en: "Proxy" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["ناشناس‌سازی ترافیک", "دور زدن سانسور"],
      en: ["Traffic anonymization", "Bypass censorship"]
    },
    introducedYear: 2002,
    vendor: "The Tor Project",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Tor_(network)",
      docs: "https://www.torproject.org/"
    }
  },

  {
    port: 9051,
    name: "Tor Control",
    abbreviation: "Tor-Control",
    description: {
      fa: "کنترل Tor از طریق API",
      en: "Tor control via API"
    },
    category: { fa: "پراکسی", en: "Proxy" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["مدیریت Tor"],
      en: ["Tor management"]
    },
    vendor: "The Tor Project",
    isDeprecated: false
  },

  {
    port: 7890,
    name: "Clash Proxy",
    abbreviation: "Clash",
    description: {
      fa: "کلاینت پراکسی Clash",
      en: "Clash proxy client"
    },
    category: { fa: "پراکسی", en: "Proxy" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["پراکسی قابل تنظیم"],
      en: ["Configurable proxy"]
    },
    isDeprecated: false
  },

  {
    port: 10809,
    name: "V2Ray SOCKS",
    abbreviation: "V2Ray",
    description: {
      fa: "پلتفرم پراکسی V2Ray",
      en: "V2Ray proxy platform"
    },
    category: { fa: "پراکسی", en: "Proxy" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["تونل‌زنی پیشرفته"],
      en: ["Advanced tunneling"]
    },
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === Backup & Storage ===
  // ═══════════════════════════════════════════
  {
    port: 9000,
    name: "MinIO",
    abbreviation: "MinIO",
    description: {
      fa: "ذخیره‌سازی شی سازگار با S3",
      en: "S3-compatible object storage"
    },
    category: { fa: "ذخیره‌سازی", en: "Storage" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["ذخیره فایل", "بکآپ", "Cloud Storage"],
      en: ["File storage", "Backup", "Cloud storage"]
    },
    introducedYear: 2015,
    vendor: "MinIO Inc.",
    isDeprecated: false,
    references: {
      docs: "https://min.io/docs/"
    },
    codeExample: [
      {
        language: "bash",
        code: `minio server /data --address ":9000"
mc alias set myminio http://localhost:9000 minioadmin minioadmin
mc mb myminio/mybucket`
      }
    ]
  },

  {
    port: 9001,
    name: "MinIO Console",
    abbreviation: "MinIO-Console",
    description: {
      fa: "رابط وب MinIO",
      en: "MinIO web console"
    },
    category: { fa: "ذخیره‌سازی", en: "Storage" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["مدیریت MinIO"],
      en: ["MinIO management"]
    },
    vendor: "MinIO Inc.",
    isDeprecated: false
  },

  {
    port: 10000,
    name: "Webmin",
    abbreviation: "Webmin",
    description: {
      fa: "پنل مدیریت وب لینوکس",
      en: "Linux web admin panel"
    },
    category: { fa: "مدیریت", en: "Management" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "high",
    commonUseCases: {
      fa: ["مدیریت سرور لینوکس"],
      en: ["Linux server management"]
    },
    introducedYear: 1997,
    vendor: "Webmin",
    isDeprecated: false,
    references: {
      docs: "https://www.webmin.com/"
    }
  },

  {
    port: 10000,
    name: "BackupPC",
    abbreviation: "BackupPC",
    description: {
      fa: "سیستم بکآپ سازمانی",
      en: "Enterprise backup system"
    },
    category: { fa: "بکآپ", en: "Backup" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["بکآپ سرور"],
      en: ["Server backup"]
    },
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === Telephony & Communications ===
  // ═══════════════════════════════════════════
  {
    port: 5038,
    name: "Asterisk AMI",
    abbreviation: "AMI",
    description: {
      fa: "Asterisk Manager Interface",
      en: "Asterisk Manager Interface"
    },
    category: { fa: "VoIP", en: "VoIP" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "high",
    commonUseCases: {
      fa: ["مدیریت Asterisk PBX"],
      en: ["Asterisk PBX management"]
    },
    introducedYear: 1999,
    vendor: "Digium/Sangoma",
    isDeprecated: false,
    references: {
      docs: "https://www.asterisk.org/"
    }
  },

  {
    port: 5222,
    name: "XMPP Client (duplicate - check earlier)",
    abbreviation: "XMPP",
    description: {
      fa: "پروتکل Jabber/XMPP",
      en: "Jabber/XMPP protocol"
    },
    category: { fa: "پیام‌رسانی", en: "Messaging" },
    transport: "TCP",
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["چت سرور"],
      en: ["Chat server"]
    },
    isDeprecated: false
  },

  {
    port: 3478,
    name: "STUN/TURN",
    abbreviation: "STUN",
    description: {
      fa: "NAT Traversal برای WebRTC",
      en: "NAT traversal for WebRTC"
    },
    category: { fa: "VoIP", en: "VoIP" },
    transport: "TCP/UDP",
    rfc: [5389, 5766],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["WebRTC", "تماس ویدیویی"],
      en: ["WebRTC", "Video calls"]
    },
    introducedYear: 2008,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc5389"],
      wiki: "https://en.wikipedia.org/wiki/STUN"
    }
  },

  {
    port: 3479,
    name: "TURN over TLS",
    abbreviation: "TURNS",
    description: {
      fa: "TURN امن",
      en: "Secure TURN"
    },
    category: { fa: "VoIP", en: "VoIP" },
    transport: "TCP",
    rfc: [5766],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["WebRTC امن"],
      en: ["Secure WebRTC"]
    },
    vendor: "IETF",
    isDeprecated: false
  },

  {
    port: 19302,
    name: "Google STUN",
    abbreviation: "Google-STUN",
    description: {
      fa: "سرور STUN گوگل",
      en: "Google STUN server"
    },
    category: { fa: "VoIP", en: "VoIP" },
    transport: "UDP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["WebRTC عمومی"],
      en: ["Public WebRTC"]
    },
    vendor: "Google",
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === Audio/Video Streaming / استریم صوت و تصویر ===
  // ═══════════════════════════════════════════
  {
    port: 1935,
    name: "RTMP",
    abbreviation: "RTMP",
    description: {
      fa: "پروتکل پیام‌رسانی زمان واقعی Adobe",
      en: "Real-Time Messaging Protocol"
    },
    category: { fa: "استریمینگ", en: "Streaming" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["استریم زنده", "Twitch", "YouTube Live", "OBS"],
      en: ["Live streaming", "Twitch", "YouTube Live", "OBS"]
    },
    introducedYear: 2002,
    vendor: "Adobe (now open)",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Real-Time_Messaging_Protocol",
      docs: "https://github.com/ossrs/srs"
    },
    codeExample: [
      {
        language: "bash",
        code: `# استریم با FFmpeg:
ffmpeg -re -i input.mp4 -c copy -f flv rtmp://server/live/stream

# استریم با OBS:
# Server: rtmp://server/live
# Stream Key: mystream`
      }
    ]
  },

  {
    port: 1936,
    name: "RTMPS",
    abbreviation: "RTMPS",
    description: {
      fa: "RTMP امن با SSL/TLS",
      en: "Secure RTMP with SSL/TLS"
    },
    category: { fa: "استریمینگ", en: "Streaming" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["استریم رمزنگاری‌شده"],
      en: ["Encrypted streaming"]
    },
    vendor: "Adobe",
    isDeprecated: false
  },

  {
    port: 554,
    name: "RTSP",
    abbreviation: "RTSP",
    description: {
      fa: "پروتکل استریم زمان واقعی",
      en: "Real-Time Streaming Protocol"
    },
    category: { fa: "استریمینگ", en: "Streaming" },
    transport: "TCP/UDP",
    rfc: [2326, 7826],
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["دوربین IP", "VLC", "استریم ویدیو"],
      en: ["IP cameras", "VLC", "Video streaming"]
    },
    introducedYear: 1998,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc7826"],
      wiki: "https://en.wikipedia.org/wiki/Real_Time_Streaming_Protocol"
    },
    codeExample: [
      {
        language: "bash",
        code: `# پخش با VLC:
vlc rtsp://camera-ip:554/stream

# پخش با FFmpeg:
ffplay rtsp://camera-ip:554/stream`
      }
    ]
  },

  {
    port: 8554,
    name: "RTSP Alternate",
    abbreviation: "RTSP-Alt",
    description: {
      fa: "پورت جایگزین RTSP",
      en: "Alternative RTSP port"
    },
    category: { fa: "استریمینگ", en: "Streaming" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["دوربین‌های مداربسته"],
      en: ["CCTV cameras"]
    },
    isDeprecated: false
  },

  {
    port: 6001,
    name: "X11 Display 1",
    abbreviation: "X11",
    description: {
      fa: "سیستم پنجره X11",
      en: "X Window System"
    },
    category: { fa: "دسکتاپ از راه دور", en: "Remote Desktop" },
    transport: "TCP",
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["دسکتاپ گرافیکی لینوکس از راه دور"],
      en: ["Remote Linux graphical desktop"]
    },
    introducedYear: 1984,
    vendor: "MIT",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/X_Window_System"
    },
    codeExample: [
      {
        language: "bash",
        code: `# اتصال به X11 از راه دور:
ssh -X user@server
export DISPLAY=server:1
xeyes  # تست`
      }
    ]
  },

  {
    port: 5900,
    name: "VNC (RFB Protocol)",
    abbreviation: "VNC",
    description: {
      fa: "پروتکل Remote Frame Buffer",
      en: "Remote Frame Buffer Protocol"
    },
    category: { fa: "دسکتاپ از راه دور", en: "Remote Desktop" },
    transport: "TCP",
    rfc: [6143],
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["کنترل دسکتاپ از راه دور"],
      en: ["Remote desktop control"]
    },
    introducedYear: 1998,
    vendor: "RealVNC",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc6143"],
      wiki: "https://en.wikipedia.org/wiki/Virtual_Network_Computing"
    }
  },

  {
    port: 32400,
    name: "Plex Media Server",
    abbreviation: "Plex",
    description: {
      fa: "سرور رسانه Plex",
      en: "Plex media server"
    },
    category: { fa: "استریمینگ", en: "Streaming" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["استریم فیلم و سریال شخصی", "کتابخانه رسانه"],
      en: ["Personal movie/TV streaming", "Media library"]
    },
    introducedYear: 2009,
    vendor: "Plex Inc.",
    isDeprecated: false,
    references: {
      docs: "https://www.plex.tv/",
      wiki: "https://en.wikipedia.org/wiki/Plex_(software)"
    }
  },

  {
    port: 8096,
    name: "Jellyfin",
    abbreviation: "Jellyfin",
    description: {
      fa: "سرور رسانه متن‌باز",
      en: "Open-source media server"
    },
    category: { fa: "استریمینگ", en: "Streaming" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["جایگزین متن‌باز Plex"],
      en: ["Open-source Plex alternative"]
    },
    introducedYear: 2018,
    vendor: "Jellyfin",
    isDeprecated: false,
    references: {
      docs: "https://jellyfin.org/"
    }
  },

  {
    port: 8920,
    name: "Emby",
    abbreviation: "Emby",
    description: {
      fa: "سرور رسانه Emby",
      en: "Emby media server"
    },
    category: { fa: "استریمینگ", en: "Streaming" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["استریم رسانه شخصی"],
      en: ["Personal media streaming"]
    },
    introducedYear: 2013,
    vendor: "Emby LLC",
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === Gaming Servers / سرورهای بازی ===
  // ═══════════════════════════════════════════
  {
    port: 25565,
    name: "Minecraft Java Edition",
    abbreviation: "Minecraft",
    description: {
      fa: "سرور بازی Minecraft",
      en: "Minecraft game server"
    },
    category: { fa: "بازی", en: "Gaming" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["سرور ماینکرفت"],
      en: ["Minecraft server"]
    },
    introducedYear: 2009,
    vendor: "Mojang Studios",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Minecraft"
    },
    codeExample: [
      {
        language: "bash",
        code: `# راه‌اندازی سرور:
java -Xmx1024M -Xms1024M -jar minecraft_server.jar nogui

# اتصال از کلاینت:
# Add Server: server-ip:25565`
      }
    ]
  },

  {
    port: 19132,
    name: "Minecraft Bedrock",
    abbreviation: "Minecraft-BE",
    description: {
      fa: "سرور Minecraft Bedrock Edition",
      en: "Minecraft Bedrock Edition server"
    },
    category: { fa: "بازی", en: "Gaming" },
    transport: "UDP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["ماینکرفت موبایل و کنسول"],
      en: ["Minecraft mobile and console"]
    },
    vendor: "Mojang Studios",
    isDeprecated: false
  },

  {
    port: 27015,
    name: "Source Engine Games",
    abbreviation: "Source",
    description: {
      fa: "بازی‌های موتور Source",
      en: "Source Engine games"
    },
    category: { fa: "بازی", en: "Gaming" },
    transport: "TCP/UDP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["CS:GO", "Team Fortress 2", "Left 4 Dead", "Garry's Mod"],
      en: ["CS:GO", "Team Fortress 2", "Left 4 Dead", "Garry's Mod"]
    },
    introducedYear: 2004,
    vendor: "Valve Corporation",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Source_(game_engine)"
    }
  },

  {
    port: 27016,
    name: "Source RCON",
    abbreviation: "Source-RCON",
    description: {
      fa: "کنترل از راه دور سرور Source",
      en: "Source Remote Console"
    },
    category: { fa: "بازی", en: "Gaming" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["مدیریت سرور بازی"],
      en: ["Game server management"]
    },
    vendor: "Valve",
    isDeprecated: false
  },

  {
    port: 7777,
    name: "Terraria",
    abbreviation: "Terraria",
    description: {
      fa: "سرور بازی Terraria",
      en: "Terraria game server"
    },
    category: { fa: "بازی", en: "Gaming" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["سرور Terraria"],
      en: ["Terraria server"]
    },
    introducedYear: 2011,
    vendor: "Re-Logic",
    isDeprecated: false
  },

  {
    port: 7778,
    name: "Unturned",
    abbreviation: "Unturned",
    description: {
      fa: "سرور بازی Unturned",
      en: "Unturned game server"
    },
    category: { fa: "بازی", en: "Gaming" },
    transport: "UDP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["سرور Unturned"],
      en: ["Unturned server"]
    },
    isDeprecated: false
  },

  {
    port: 27960,
    name: "Quake 3 / ioquake3",
    abbreviation: "Quake3",
    description: {
      fa: "سرور Quake 3 Arena",
      en: "Quake 3 Arena server"
    },
    category: { fa: "بازی", en: "Gaming" },
    transport: "UDP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["بازی‌های مبتنی بر موتور id Tech 3"],
      en: ["id Tech 3 engine based games"]
    },
    introducedYear: 1999,
    vendor: "id Software",
    isDeprecated: false
  },

  {
    port: 10011,
    name: "TeamSpeak 3 ServerQuery",
    abbreviation: "TS3-Query",
    description: {
      fa: "رابط مدیریت TeamSpeak 3",
      en: "TeamSpeak 3 management interface"
    },
    category: { fa: "VoIP", en: "VoIP" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["مدیریت سرور TeamSpeak"],
      en: ["TeamSpeak server management"]
    },
    introducedYear: 2008,
    vendor: "TeamSpeak Systems",
    isDeprecated: false
  },

  {
    port: 9987,
    name: "TeamSpeak 3 Voice",
    abbreviation: "TS3",
    description: {
      fa: "سرور صوتی TeamSpeak 3",
      en: "TeamSpeak 3 voice server"
    },
    category: { fa: "VoIP", en: "VoIP" },
    transport: "UDP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["چت صوتی گیمرها"],
      en: ["Gaming voice chat"]
    },
    introducedYear: 2008,
    vendor: "TeamSpeak Systems",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/TeamSpeak",
      docs: "https://www.teamspeak.com/"
    }
  },

  {
    port: 64738,
    name: "Mumble",
    abbreviation: "Mumble",
    description: {
      fa: "سرور صوتی متن‌باز Mumble",
      en: "Open-source voice server"
    },
    category: { fa: "VoIP", en: "VoIP" },
    transport: "TCP/UDP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["چت صوتی با تاخیر کم"],
      en: ["Low-latency voice chat"]
    },
    introducedYear: 2005,
    vendor: "Mumble",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Mumble_(software)",
      docs: "https://www.mumble.info/"
    }
  },

  // ═══════════════════════════════════════════
  // === Network Infrastructure / زیرساخت شبکه ===
  // ═══════════════════════════════════════════
  {
    port: 179,
    name: "BGP",
    abbreviation: "BGP",
    description: {
      fa: "پروتکل مسیریابی مرزی",
      en: "Border Gateway Protocol"
    },
    category: { fa: "مسیریابی", en: "Routing" },
    transport: "TCP",
    rfc: [4271],
    ianaStatus: "official",
    securityRisk: "critical",
    commonUseCases: {
      fa: ["مسیریابی اینترنت", "ISP", "Autonomous Systems"],
      en: ["Internet routing", "ISP", "Autonomous Systems"]
    },
    introducedYear: 1994,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc4271"],
      wiki: "https://en.wikipedia.org/wiki/Border_Gateway_Protocol"
    },
    codeExample: [
      {
        language: "cisco",
        code: `router bgp 65000
 neighbor 192.168.1.1 remote-as 65001
 network 10.0.0.0 mask 255.255.255.0`
      }
    ]
  },

  {
    port: 646,
    name: "LDP",
    abbreviation: "LDP",
    description: {
      fa: "پروتکل توزیع برچسب",
      en: "Label Distribution Protocol"
    },
    category: { fa: "مسیریابی", en: "Routing" },
    transport: "TCP/UDP",
    rfc: [5036],
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["MPLS", "شبکه‌های سرویس‌دهنده"],
      en: ["MPLS", "Service provider networks"]
    },
    introducedYear: 2007,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc5036"]
    }
  },

  {
    port: 520,
    name: "RIP",
    abbreviation: "RIP",
    description: {
      fa: "پروتکل اطلاعات مسیریابی",
      en: "Routing Information Protocol"
    },
    category: { fa: "مسیریابی", en: "Routing" },
    transport: "UDP",
    rfc: [2453],
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["مسیریابی شبکه‌های کوچک (قدیمی)"],
      en: ["Small network routing (legacy)"]
    },
    introducedYear: 1988,
    vendor: "IETF",
    isDeprecated: true,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc2453"],
      wiki: "https://en.wikipedia.org/wiki/Routing_Information_Protocol"
    }
  },

  {
    port: 521,
    name: "RIPng",
    abbreviation: "RIPng",
    description: {
      fa: "RIP برای IPv6",
      en: "RIP next generation for IPv6"
    },
    category: { fa: "مسیریابی", en: "Routing" },
    transport: "UDP",
    rfc: [2080],
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["مسیریابی IPv6"],
      en: ["IPv6 routing"]
    },
    introducedYear: 1997,
    vendor: "IETF",
    isDeprecated: false
  },

  {
    port: 1701,
    name: "L2TP",
    abbreviation: "L2TP",
    description: {
      fa: "پروتکل تونل‌زنی لایه 2",
      en: "Layer 2 Tunneling Protocol"
    },
    category: { fa: "VPN", en: "VPN" },
    transport: "UDP",
    rfc: [2661],
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["VPN (معمولاً با IPSec)"],
      en: ["VPN (usually with IPSec)"]
    },
    introducedYear: 1999,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc2661"],
      wiki: "https://en.wikipedia.org/wiki/Layer_2_Tunneling_Protocol"
    }
  },

  {
    port: 500,
    name: "IKE/ISAKMP",
    abbreviation: "IKE",
    description: {
      fa: "تبادل کلید اینترنتی",
      en: "Internet Key Exchange"
    },
    category: { fa: "VPN", en: "VPN" },
    transport: "UDP",
    rfc: [7296],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["IPSec VPN", "اتصالات امن سایت به سایت"],
      en: ["IPSec VPN", "Secure site-to-site connections"]
    },
    introducedYear: 1998,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc7296"],
      wiki: "https://en.wikipedia.org/wiki/Internet_Key_Exchange"
    }
  },

  {
    port: 4500,
    name: "IPSec NAT-T",
    abbreviation: "NAT-T",
    description: {
      fa: "IPSec NAT Traversal",
      en: "IPSec NAT traversal"
    },
    category: { fa: "VPN", en: "VPN" },
    transport: "UDP",
    rfc: [3948],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["IPSec VPN پشت NAT"],
      en: ["IPSec VPN behind NAT"]
    },
    vendor: "IETF",
    isDeprecated: false
  },

  {
    port: 8472,
    name: "VXLAN",
    abbreviation: "VXLAN",
    description: {
      fa: "شبکه محلی مجازی توسعه‌یافته",
      en: "Virtual Extensible LAN"
    },
    category: { fa: "شبکه", en: "Network" },
    transport: "UDP",
    rfc: [7348],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["شبکه‌های ابری", "SDN", "کانتینرها"],
      en: ["Cloud networks", "SDN", "Containers"]
    },
    introducedYear: 2014,
    vendor: "IETF",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc7348"],
      wiki: "https://en.wikipedia.org/wiki/Virtual_Extensible_LAN"
    }
  },

  {
    port: 4789,
    name: "VXLAN (Official)",
    abbreviation: "VXLAN",
    description: {
      fa: "پورت رسمی VXLAN",
      en: "Official VXLAN port"
    },
    category: { fa: "شبکه", en: "Network" },
    transport: "UDP",
    rfc: [7348],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["Overlay Networks"],
      en: ["Overlay Networks"]
    },
    vendor: "IETF",
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === Automation & Configuration / اتوماسیون ===
  // ═══════════════════════════════════════════
  {
    port: 8086,
    name: "InfluxDB",
    abbreviation: "InfluxDB",
    description: {
      fa: "پایگاه داده سری زمانی",
      en: "Time-series database"
    },
    category: { fa: "پایگاه داده", en: "Database" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["متریک‌های IoT", "مانیتورینگ"],
      en: ["IoT metrics", "Monitoring"]
    },
    introducedYear: 2013,
    vendor: "InfluxData",
    isDeprecated: false
  },

  {
    port: 8125,
    name: "StatsD",
    abbreviation: "StatsD",
    description: {
      fa: "دیمون آمار شبکه",
      en: "Network daemon for stats"
    },
    category: { fa: "مانیتورینگ", en: "Monitoring" },
    transport: "UDP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["جمع‌آوری متریک", "آمارگیری اپلیکیشن"],
      en: ["Metrics collection", "Application statistics"]
    },
    introducedYear: 2010,
    vendor: "Etsy",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/StatsD",
      docs: "https://github.com/statsd/statsd"
    },
    codeExample: [
      {
        language: "python",
        code: `from statsd import StatsClient
statsd = StatsClient('localhost', 8125)
statsd.incr('page.views')
statsd.timing('database.query', 150)`
      }
    ]
  },

  {
    port: 2003,
    name: "Graphite",
    abbreviation: "Graphite",
    description: {
      fa: "جمع‌آوری و ذخیره متریک",
      en: "Metrics collection and storage"
    },
    category: { fa: "مانیتورینگ", en: "Monitoring" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["ذخیره داده‌های سری زمانی"],
      en: ["Time-series data storage"]
    },
    introducedYear: 2008,
    vendor: "Graphite Project",
    isDeprecated: false,
    references: {
      docs: "https://graphiteapp.org/"
    }
  },

  {
    port: 2004,
    name: "Graphite Pickle",
    abbreviation: "Graphite-Pickle",
    description: {
      fa: "Graphite با فرمت Pickle",
      en: "Graphite with Pickle format"
    },
    category: { fa: "مانیتورینگ", en: "Monitoring" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["انتقال سریع‌تر داده به Graphite"],
      en: ["Faster data transfer to Graphite"]
    },
    vendor: "Graphite Project",
    isDeprecated: false
  },

  {
    port: 8125,
    name: "Telegraf",
    abbreviation: "Telegraf",
    description: {
      fa: "Agent جمع‌آوری متریک",
      en: "Metrics collection agent"
    },
    category: { fa: "مانیتورینگ", en: "Monitoring" },
    transport: "UDP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["TICK Stack", "جمع‌آوری متریک سیستم"],
      en: ["TICK Stack", "System metrics collection"]
    },
    vendor: "InfluxData",
    isDeprecated: false
  },

  {
    port: 8428,
    name: "VictoriaMetrics",
    abbreviation: "VM",
    description: {
      fa: "پایگاه داده سری زمانی سریع",
      en: "Fast time-series database"
    },
    category: { fa: "مانیتورینگ", en: "Monitoring" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["جایگزین Prometheus"],
      en: ["Prometheus alternative"]
    },
    introducedYear: 2018,
    vendor: "VictoriaMetrics",
    isDeprecated: false,
    references: {
      docs: "https://victoriametrics.com/"
    }
  },

  // ═══════════════════════════════════════════
  // === Collaboration Tools / ابزارهای همکاری ===
  // ═══════════════════════════════════════════
  {
    port: 3478,
    name: "TURN/STUN",
    abbreviation: "TURN",
    description: {
      fa: "NAT Traversal برای WebRTC",
      en: "NAT traversal for WebRTC"
    },
    category: { fa: "ویدیو کنفرانس", en: "Video Conference" },
    transport: "TCP/UDP",
    rfc: [5766, 5389],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["WebRTC", "تماس ویدیویی", "Jitsi"],
      en: ["WebRTC", "Video calls", "Jitsi"]
    },
    introducedYear: 2008,
    vendor: "IETF",
    isDeprecated: false
  },

  {
    port: 5349,
    name: "TURNS (TURN over TLS)",
    abbreviation: "TURNS",
    description: {
      fa: "TURN امن با TLS",
      en: "Secure TURN with TLS"
    },
    category: { fa: "ویدیو کنفرانس", en: "Video Conference" },
    transport: "TCP",
    rfc: [5766],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["WebRTC امن"],
      en: ["Secure WebRTC"]
    },
    vendor: "IETF",
    isDeprecated: false
  },

  {
    port: 10000,
    name: "Jitsi Videobridge",
    abbreviation: "Jitsi",
    description: {
      fa: "سرور ویدیو کنفرانس Jitsi",
      en: "Jitsi video conference server"
    },
    category: { fa: "ویدیو کنفرانس", en: "Video Conference" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["کنفرانس ویدیویی متن‌باز"],
      en: ["Open-source video conferencing"]
    },
    introducedYear: 2013,
    vendor: "Jitsi",
    isDeprecated: false,
    references: {
      docs: "https://jitsi.org/"
    }
  },

  {
    port: 5222,
    name: "XMPP (Jabber)",
    abbreviation: "XMPP",
    description: {
      fa: "پروتکل پیام‌رسانی قابل توسعه",
      en: "Extensible Messaging and Presence Protocol"
    },
    category: { fa: "پیام‌رسانی", en: "Messaging" },
    transport: "TCP",
    rfc: [6120],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["چت سازمانی", "Jabber", "Google Talk قدیمی"],
      en: ["Enterprise chat", "Jabber", "Old Google Talk"]
    },
    introducedYear: 1999,
    vendor: "IETF/XMPP Standards Foundation",
    isDeprecated: false,
    references: {
      rfc: ["https://tools.ietf.org/html/rfc6120"],
      wiki: "https://en.wikipedia.org/wiki/XMPP"
    }
  },

  {
    port: 5269,
    name: "XMPP Server-to-Server",
    abbreviation: "XMPP-S2S",
    description: {
      fa: "ارتباط بین سرورهای XMPP",
      en: "XMPP server-to-server communication"
    },
    category: { fa: "پیام‌رسانی", en: "Messaging" },
    transport: "TCP",
    rfc: [6120],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["فدراسیون XMPP"],
      en: ["XMPP federation"]
    },
    vendor: "IETF",
    isDeprecated: false
  },

  {
    port: 9000,
    name: "Portainer",
    abbreviation: "Portainer",
    description: {
      fa: "مدیریت Docker/Kubernetes",
      en: "Docker/Kubernetes management"
    },
    category: { fa: "کانتینر", en: "Container" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["رابط گرافیکی Docker"],
      en: ["Docker GUI"]
    },
    introducedYear: 2016,
    vendor: "Portainer",
    isDeprecated: false,
    references: {
      docs: "https://www.portainer.io/"
    }
  },

  {
    port: 9443,
    name: "Portainer HTTPS",
    abbreviation: "Portainer-SSL",
    description: {
      fa: "Portainer امن",
      en: "Secure Portainer"
    },
    category: { fa: "کانتینر", en: "Container" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["مدیریت امن کانتینر"],
      en: ["Secure container management"]
    },
    vendor: "Portainer",
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === API Gateways & Service Mesh ===
  // ═══════════════════════════════════════════
  {
    port: 8001,
    name: "Kong Admin API",
    abbreviation: "Kong-Admin",
    description: {
      fa: "رابط مدیریت Kong Gateway",
      en: "Kong Gateway admin interface"
    },
    category: { fa: "API Gateway", en: "API Gateway" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "high",
    commonUseCases: {
      fa: ["مدیریت API Gateway"],
      en: ["API Gateway management"]
    },
    introducedYear: 2015,
    vendor: "Kong Inc.",
    isDeprecated: false,
    references: {
      docs: "https://docs.konghq.com/"
    }
  },

  {
    port: 8000,
    name: "Kong Proxy",
    abbreviation: "Kong",
    description: {
      fa: "پراکسی Kong API Gateway",
      en: "Kong API Gateway proxy"
    },
    category: { fa: "API Gateway", en: "API Gateway" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["API Gateway", "Microservices"],
      en: ["API Gateway", "Microservices"]
    },
    vendor: "Kong Inc.",
    isDeprecated: false
  },

  {
    port: 15000,
    name: "Envoy Admin",
    abbreviation: "Envoy-Admin",
    description: {
      fa: "رابط مدیریت Envoy Proxy",
      en: "Envoy Proxy admin interface"
    },
    category: { fa: "Service Mesh", en: "Service Mesh" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["Service Mesh", "Istio"],
      en: ["Service Mesh", "Istio"]
    },
    introducedYear: 2016,
    vendor: "CNCF/Lyft",
    isDeprecated: false,
    references: {
      docs: "https://www.envoyproxy.io/"
    }
  },

  {
    port: 15001,
    name: "Envoy Outbound",
    abbreviation: "Envoy-Out",
    description: {
      fa: "ترافیک خروجی Envoy",
      en: "Envoy outbound traffic"
    },
    category: { fa: "Service Mesh", en: "Service Mesh" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["Istio Sidecar"],
      en: ["Istio sidecar"]
    },
    vendor: "CNCF",
    isDeprecated: false
  },

  {
    port: 15006,
    name: "Envoy Inbound",
    abbreviation: "Envoy-In",
    description: {
      fa: "ترافیک ورودی Envoy",
      en: "Envoy inbound traffic"
    },
    category: { fa: "Service Mesh", en: "Service Mesh" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["Istio Service Mesh"],
      en: ["Istio service mesh"]
    },
    vendor: "CNCF",
    isDeprecated: false
  },

  {
    port: 15020,
    name: "Istio Pilot",
    abbreviation: "Istio-Pilot",
    description: {
      fa: "سرویس کشف Istio",
      en: "Istio service discovery"
    },
    category: { fa: "Service Mesh", en: "Service Mesh" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["Kubernetes Service Mesh"],
      en: ["Kubernetes service mesh"]
    },
    vendor: "CNCF/Google",
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === Certificate & PKI / گواهی‌نامه ===
  // ═══════════════════════════════════════════
  {
    port: 8200,
    name: "HashiCorp Vault",
    abbreviation: "Vault",
    description: {
      fa: "مدیریت اسرار و PKI",
      en: "Secrets and PKI management"
    },
    category: { fa: "امنیت", en: "Security" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["مدیریت رمز", "گواهی‌نامه", "رمزنگاری"],
      en: ["Secrets management", "Certificates", "Encryption"]
    },
    vendor: "HashiCorp",
    isDeprecated: false
  },

  {
    port: 80,
    name: "HTTP-01 ACME Challenge",
    abbreviation: "ACME",
    description: {
      fa: "چالش Let's Encrypt",
      en: "Let's Encrypt challenge"
    },
    category: { fa: "گواهی‌نامه", en: "Certificate" },
    transport: "TCP",
    rfc: [8555],
    ianaStatus: "official",
    securityRisk: "low",
    commonUseCases: {
      fa: ["صدور گواهی SSL رایگان"],
      en: ["Free SSL certificate issuance"]
    },
    vendor: "IETF/Let's Encrypt",
    isDeprecated: false
  },

  {
    port: 8443,
    name: "HTTPS Alternate",
    abbreviation: "HTTPS-Alt",
    description: {
      fa: "پورت جایگزین HTTPS",
      en: "Alternative HTTPS port"
    },
    category: { fa: "وب", en: "Web" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["Tomcat SSL", "پنل‌های مدیریت"],
      en: ["Tomcat SSL", "Admin panels"]
    },
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === Industrial & IoT ===
  // ═══════════════════════════════════════════
  {
    port: 502,
    name: "Modbus",
    abbreviation: "Modbus",
    description: {
      fa: "پروتکل صنعتی Modbus",
      en: "Industrial Modbus protocol"
    },
    category: { fa: "صنعتی", en: "Industrial" },
    transport: "TCP",
    ianaStatus: "official",
    securityRisk: "critical",
    commonUseCases: {
      fa: ["PLC", "SCADA", "اتوماسیون صنعتی"],
      en: ["PLC", "SCADA", "Industrial automation"]
    },
    introducedYear: 1979,
    vendor: "Modicon",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Modbus"
    },
    codeExample: [
      {
        language: "python",
        code: `from pymodbus.client import ModbusTcpClient
client = ModbusTcpClient('192.168.1.100', port=502)
result = client.read_holding_registers(0, 10)
print(result.registers)`
      }
    ]
  },

  {
    port: 20000,
    name: "DNP3",
    abbreviation: "DNP3",
    description: {
      fa: "پروتکل شبکه توزیع‌شده",
      en: "Distributed Network Protocol"
    },
    category: { fa: "صنعتی", en: "Industrial" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "critical",
    commonUseCases: {
      fa: ["SCADA", "شبکه برق", "زیرساخت حیاتی"],
      en: ["SCADA", "Power grid", "Critical infrastructure"]
    },
    introducedYear: 1993,
    isDeprecated: false
  },

  {
    port: 44818,
    name: "EtherNet/IP",
    abbreviation: "EIP",
    description: {
      fa: "پروتکل صنعتی اترنت",
      en: "Industrial Ethernet protocol"
    },
    category: { fa: "صنعتی", en: "Industrial" },
    transport: "TCP/UDP",
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["Allen-Bradley PLC", "اتوماسیون کارخانه"],
      en: ["Allen-Bradley PLC", "Factory automation"]
    },
    introducedYear: 2000,
    vendor: "ODVA",
    isDeprecated: false
  },

  {
    port: 102,
    name: "S7comm (Siemens)",
    abbreviation: "S7",
    description: {
      fa: "پروتکل PLC زیمنس",
      en: "Siemens PLC protocol"
    },
    category: { fa: "صنعتی", en: "Industrial" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "critical",
    commonUseCases: {
      fa: ["Siemens S7 PLC"],
      en: ["Siemens S7 PLC"]
    },
    vendor: "Siemens",
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === Load Balancers & Reverse Proxy / لودبالانسر ===
  // ═══════════════════════════════════════════
  {
    port: 8080,
    name: "HAProxy Stats",
    abbreviation: "HAProxy",
    description: {
      fa: "صفحه آمار HAProxy",
      en: "HAProxy statistics page"
    },
    category: { fa: "لودبالانسر", en: "Load Balancer" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["مانیتورینگ لودبالانسر", "آمار ترافیک"],
      en: ["Load balancer monitoring", "Traffic statistics"]
    },
    introducedYear: 2000,
    vendor: "HAProxy Technologies",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/HAProxy",
      docs: "http://www.haproxy.org/"
    },
    codeExample: [
      {
        language: "haproxy",
        code: `# haproxy.cfg
frontend stats
    bind *:8080
    stats enable
    stats uri /stats
    stats refresh 30s
    stats auth admin:password`
      }
    ]
  },

  {
    port: 1936,
    name: "HAProxy Stats SSL",
    abbreviation: "HAProxy-SSL",
    description: {
      fa: "HAProxy Stats با SSL",
      en: "HAProxy stats with SSL"
    },
    category: { fa: "لودبالانسر", en: "Load Balancer" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["مانیتورینگ امن"],
      en: ["Secure monitoring"]
    },
    vendor: "HAProxy",
    isDeprecated: false
  },

  {
    port: 8404,
    name: "HAProxy Prometheus",
    abbreviation: "HAProxy-Prom",
    description: {
      fa: "متریک‌های Prometheus از HAProxy",
      en: "HAProxy Prometheus metrics"
    },
    category: { fa: "لودبالانسر", en: "Load Balancer" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["مانیتورینگ با Prometheus"],
      en: ["Prometheus monitoring"]
    },
    vendor: "HAProxy",
    isDeprecated: false
  },

  {
    port: 80,
    name: "Nginx",
    abbreviation: "Nginx",
    description: {
      fa: "وب‌سرور و ریورس پراکسی Nginx",
      en: "Nginx web server and reverse proxy"
    },
    category: { fa: "وب‌سرور", en: "Web Server" },
    transport: "TCP",
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["وب‌سرور", "ریورس پراکسی", "لودبالانسر"],
      en: ["Web server", "Reverse proxy", "Load balancer"]
    },
    introducedYear: 2004,
    vendor: "Nginx Inc.",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Nginx",
      docs: "https://nginx.org/en/docs/"
    }
  },

  {
    port: 8081,
    name: "Nginx Alternate",
    abbreviation: "Nginx-Alt",
    description: {
      fa: "پورت جایگزین Nginx",
      en: "Alternative Nginx port"
    },
    category: { fa: "وب‌سرور", en: "Web Server" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["پراکسی ثانویه"],
      en: ["Secondary proxy"]
    },
    vendor: "Nginx",
    isDeprecated: false
  },

  {
    port: 8888,
    name: "Caddy",
    abbreviation: "Caddy",
    description: {
      fa: "وب‌سرور Caddy با HTTPS خودکار",
      en: "Caddy web server with automatic HTTPS"
    },
    category: { fa: "وب‌سرور", en: "Web Server" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["وب‌سرور مدرن", "Let's Encrypt خودکار"],
      en: ["Modern web server", "Automatic Let's Encrypt"]
    },
    introducedYear: 2015,
    vendor: "Caddy",
    isDeprecated: false,
    references: {
      docs: "https://caddyserver.com/"
    },
    codeExample: [
      {
        language: "caddyfile",
        code: `example.com {
    reverse_proxy localhost:3000
    encode gzip
    tls admin@example.com
}`
      }
    ]
  },

  {
    port: 2019,
    name: "Caddy Admin API",
    abbreviation: "Caddy-Admin",
    description: {
      fa: "رابط مدیریت Caddy",
      en: "Caddy admin interface"
    },
    category: { fa: "وب‌سرور", en: "Web Server" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "high",
    commonUseCases: {
      fa: ["مدیریت پویا Caddy"],
      en: ["Dynamic Caddy management"]
    },
    vendor: "Caddy",
    isDeprecated: false
  },

  {
    port: 1080,
    name: "Traefik Dashboard",
    abbreviation: "Traefik",
    description: {
      fa: "داشبورد Traefik",
      en: "Traefik dashboard"
    },
    category: { fa: "لودبالانسر", en: "Load Balancer" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["ریورس پراکسی Kubernetes/Docker"],
      en: ["Kubernetes/Docker reverse proxy"]
    },
    introducedYear: 2015,
    vendor: "Traefik Labs",
    isDeprecated: false,
    references: {
      docs: "https://doc.traefik.io/traefik/"
    }
  },

  {
    port: 8080,
    name: "Traefik HTTP",
    abbreviation: "Traefik-HTTP",
    description: {
      fa: "ورودی HTTP Traefik",
      en: "Traefik HTTP entrypoint"
    },
    category: { fa: "لودبالانسر", en: "Load Balancer" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["پراکسی خودکار کانتینر"],
      en: ["Automatic container proxy"]
    },
    vendor: "Traefik Labs",
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === Content Delivery & Caching / CDN و کش ===
  // ═══════════════════════════════════════════
  {
    port: 8080,
    name: "Varnish Cache",
    abbreviation: "Varnish",
    description: {
      fa: "کش HTTP سریع",
      en: "Fast HTTP cache"
    },
    category: { fa: "کش", en: "Cache" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["تسریع وب‌سایت", "کش محتوا"],
      en: ["Website acceleration", "Content caching"]
    },
    introducedYear: 2006,
    vendor: "Varnish Software",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Varnish_(software)",
      docs: "https://varnish-cache.org/"
    },
    codeExample: [
      {
        language: "vcl",
        code: `vcl 4.1;

backend default {
    .host = "127.0.0.1";
    .port = "8080";
}

sub vcl_recv {
    if (req.url ~ "\\.(jpg|png|css|js)$") {
        return (hash);
    }
}`
      }
    ]
  },

  {
    port: 6081,
    name: "Varnish Admin",
    abbreviation: "Varnish-Admin",
    description: {
      fa: "رابط مدیریت Varnish",
      en: "Varnish management interface"
    },
    category: { fa: "کش", en: "Cache" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "high",
    commonUseCases: {
      fa: ["مدیریت Varnish Cache"],
      en: ["Varnish Cache management"]
    },
    vendor: "Varnish Software",
    isDeprecated: false
  },

  {
    port: 11211,
    name: "Memcached",
    abbreviation: "Memcached",
    description: {
      fa: "سیستم کش توزیع‌شده در حافظه",
      en: "Distributed memory caching system"
    },
    category: { fa: "کش", en: "Cache" },
    transport: "TCP/UDP",
    ianaStatus: "official",
    securityRisk: "critical",
    commonUseCases: {
      fa: ["کش دیتابیس", "کش Session", "کاهش بار DB"],
      en: ["Database cache", "Session cache", "Reduce DB load"]
    },
    introducedYear: 2003,
    vendor: "Danga Interactive",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Memcached",
      docs: "https://memcached.org/"
    },
    codeExample: [
      {
        language: "bash",
        code: `# اتصال:
telnet localhost 11211

# ذخیره:
set mykey 0 3600 5
hello

# دریافت:
get mykey`
      },
      {
        language: "python",
        code: `import memcache
mc = memcache.Client(['127.0.0.1:11211'])
mc.set("user:1001", {"name": "John", "age": 30})
print(mc.get("user:1001"))`
      }
    ]
  },

  {
    port: 6379,
    name: "Redis",
    abbreviation: "Redis",
    description: {
      fa: "دیتابیس در حافظه و کش",
      en: "In-memory database and cache"
    },
    category: { fa: "کش", en: "Cache" },
    transport: "TCP",
    ianaStatus: "official",
    securityRisk: "high",
    commonUseCases: {
      fa: ["کش", "Session Store", "صف پیام", "Pub/Sub"],
      en: ["Cache", "Session store", "Message queue", "Pub/Sub"]
    },
    introducedYear: 2009,
    vendor: "Redis Ltd.",
    isDeprecated: false
  },

  {
    port: 8091,
    name: "Couchbase Server",
    abbreviation: "Couchbase",
    description: {
      fa: "دیتابیس NoSQL با کش داخلی",
      en: "NoSQL database with built-in cache"
    },
    category: { fa: "کش", en: "Cache" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["کش توزیع‌شده", "دیتابیس JSON"],
      en: ["Distributed cache", "JSON database"]
    },
    vendor: "Couchbase",
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === Testing & Development Tools / ابزار تست ===
  // ═══════════════════════════════════════════
  {
    port: 4444,
    name: "Selenium Grid Hub",
    abbreviation: "Selenium",
    description: {
      fa: "هاب تست خودکار مرورگر",
      en: "Browser automation test hub"
    },
    category: { fa: "تست", en: "Testing" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["تست اتوماتیک وب", "CI/CD"],
      en: ["Automated web testing", "CI/CD"]
    },
    introducedYear: 2004,
    vendor: "Selenium",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Selenium_(software)",
      docs: "https://www.selenium.dev/"
    },
    codeExample: [
      {
        language: "python",
        code: `from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

driver = webdriver.Remote(
    command_executor='http://localhost:4444/wd/hub',
    desired_capabilities=DesiredCapabilities.CHROME
)
driver.get('http://example.com')
print(driver.title)
driver.quit()`
      }
    ]
  },

  {
    port: 9515,
    name: "ChromeDriver",
    abbreviation: "ChromeDriver",
    description: {
      fa: "درایور Selenium برای Chrome",
      en: "Selenium driver for Chrome"
    },
    category: { fa: "تست", en: "Testing" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["تست اتوماتیک Chrome"],
      en: ["Chrome automated testing"]
    },
    vendor: "Google",
    isDeprecated: false
  },

  {
    port: 4723,
    name: "Appium",
    abbreviation: "Appium",
    description: {
      fa: "تست اتوماتیک موبایل",
      en: "Mobile app automation"
    },
    category: { fa: "تست", en: "Testing" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["تست اپلیکیشن iOS/Android"],
      en: ["iOS/Android app testing"]
    },
    introducedYear: 2012,
    vendor: "Appium",
    isDeprecated: false,
    references: {
      docs: "https://appium.io/"
    }
  },

  {
    port: 8000,
    name: "Locust",
    abbreviation: "Locust",
    description: {
      fa: "ابزار تست بار",
      en: "Load testing tool"
    },
    category: { fa: "تست", en: "Testing" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["تست بار", "تست استرس"],
      en: ["Load testing", "Stress testing"]
    },
    introducedYear: 2011,
    vendor: "Locust",
    isDeprecated: false,
    references: {
      docs: "https://locust.io/"
    },
    codeExample: [
      {
        language: "python",
        code: `from locust import HttpUser, task, between

class WebUser(HttpUser):
    wait_time = between(1, 3)
    
    @task
    def load_page(self):
        self.client.get("/")
    
    @task(3)
    def load_api(self):
        self.client.get("/api/users")`
      }
    ]
  },

  {
    port: 8089,
    name: "Locust Web UI",
    abbreviation: "Locust-UI",
    description: {
      fa: "رابط وب Locust",
      en: "Locust web interface"
    },
    category: { fa: "تست", en: "Testing" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["مانیتور تست بار"],
      en: ["Load test monitoring"]
    },
    vendor: "Locust",
    isDeprecated: false
  },

  {
    port: 9876,
    name: "Karma Test Runner",
    abbreviation: "Karma",
    description: {
      fa: "اجرا کننده تست JavaScript",
      en: "JavaScript test runner"
    },
    category: { fa: "تست", en: "Testing" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["تست یونیت JavaScript", "Angular Testing"],
      en: ["JavaScript unit testing", "Angular testing"]
    },
    introducedYear: 2012,
    vendor: "Google",
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === Observability & APM / مشاهده‌پذیری ===
  // ═══════════════════════════════════════════
  {
    port: 9411,
    name: "Zipkin",
    abbreviation: "Zipkin",
    description: {
      fa: "سیستم Distributed Tracing",
      en: "Distributed tracing system"
    },
    category: { fa: "مانیتورینگ", en: "Monitoring" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["ردیابی Microservices", "تحلیل latency"],
      en: ["Microservices tracing", "Latency analysis"]
    },
    introducedYear: 2012,
    vendor: "Twitter (now Apache)",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Zipkin",
      docs: "https://zipkin.io/"
    },
    codeExample: [
      {
        language: "java",
        code: `// Spring Boot
@Bean
public Sender sender() {
    return OkHttpSender.create("http://localhost:9411/api/v2/spans");
}`
      }
    ]
  },

  {
    port: 14250,
    name: "Jaeger gRPC",
    abbreviation: "Jaeger-gRPC",
    description: {
      fa: "Jaeger با پروتکل gRPC",
      en: "Jaeger with gRPC protocol"
    },
    category: { fa: "مانیتورینگ", en: "Monitoring" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["جمع‌آوری trace با gRPC"],
      en: ["Trace collection via gRPC"]
    },
    vendor: "CNCF",
    isDeprecated: false
  },

  {
    port: 8200,
    name: "SkyWalking OAP",
    abbreviation: "SkyWalking",
    description: {
      fa: "پلتفرم APM و Observability",
      en: "APM and observability platform"
    },
    category: { fa: "مانیتورینگ", en: "Monitoring" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["مانیتورینگ میکروسرویس", "تحلیل عملکرد"],
      en: ["Microservice monitoring", "Performance analysis"]
    },
    introducedYear: 2015,
    vendor: "Apache SkyWalking",
    isDeprecated: false,
    references: {
      docs: "https://skywalking.apache.org/"
    }
  },

  {
    port: 8080,
    name: "SkyWalking UI",
    abbreviation: "SkyWalking-UI",
    description: {
      fa: "رابط وب SkyWalking",
      en: "SkyWalking web interface"
    },
    category: { fa: "مانیتورینگ", en: "Monitoring" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["داشبورد APM"],
      en: ["APM dashboard"]
    },
    vendor: "Apache",
    isDeprecated: false
  },

  {
    port: 8126,
    name: "Datadog Agent",
    abbreviation: "Datadog",
    description: {
      fa: "Agent مانیتورینگ Datadog",
      en: "Datadog monitoring agent"
    },
    category: { fa: "مانیتورینگ", en: "Monitoring" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["جمع‌آوری متریک", "APM"],
      en: ["Metrics collection", "APM"]
    },
    vendor: "Datadog",
    isDeprecated: false,
    references: {
      docs: "https://docs.datadoghq.com/"
    }
  },

  {
    port: 8126,
    name: "New Relic Agent",
    abbreviation: "NewRelic",
    description: {
      fa: "Agent مانیتورینگ New Relic",
      en: "New Relic monitoring agent"
    },
    category: { fa: "مانیتورینگ", en: "Monitoring" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["مانیتورینگ اپلیکیشن"],
      en: ["Application monitoring"]
    },
    vendor: "New Relic",
    isDeprecated: false
  },

  {
    port: 9090,
    name: "Cockpit",
    abbreviation: "Cockpit",
    description: {
      fa: "پنل مدیریت سرور لینوکس",
      en: "Linux server management panel"
    },
    category: { fa: "مدیریت", en: "Management" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "high",
    commonUseCases: {
      fa: ["مدیریت سرور RHEL/CentOS"],
      en: ["RHEL/CentOS server management"]
    },
    introducedYear: 2013,
    vendor: "Red Hat",
    isDeprecated: false,
    references: {
      docs: "https://cockpit-project.org/"
    }
  },

  // ═══════════════════════════════════════════
  // === Infrastructure as Code / IaC ===
  // ═══════════════════════════════════════════
  {
    port: 8200,
    name: "Terraform Cloud Agent",
    abbreviation: "TF-Agent",
    description: {
      fa: "Agent Terraform Cloud",
      en: "Terraform Cloud agent"
    },
    category: { fa: "IaC", en: "IaC" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["اجرای Terraform در محیط خصوصی"],
      en: ["Terraform execution in private environment"]
    },
    vendor: "HashiCorp",
    isDeprecated: false
  },

  {
    port: 8080,
    name: "Ansible Tower/AWX",
    abbreviation: "Ansible-Tower",
    description: {
      fa: "رابط وب Ansible",
      en: "Ansible web interface"
    },
    category: { fa: "IaC", en: "IaC" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["اتوماسیون IT", "مدیریت پیکربندی"],
      en: ["IT automation", "Configuration management"]
    },
    introducedYear: 2013,
    vendor: "Red Hat",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Ansible_(software)",
      docs: "https://docs.ansible.com/"
    },
    codeExample: [
      {
        language: "yaml",
        code: `# playbook.yml
- hosts: webservers
  tasks:
    - name: Install nginx
      apt:
        name: nginx
        state: present
    - name: Start nginx
      service:
        name: nginx
        state: started`
      }
    ]
  },

  {
    port: 4505,
    name: "SaltStack Publisher",
    abbreviation: "Salt-Pub",
    description: {
      fa: "پورت ناشر SaltStack",
      en: "SaltStack publisher port"
    },
    category: { fa: "IaC", en: "IaC" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "high",
    commonUseCases: {
      fa: ["مدیریت پیکربندی", "اتوماسیون"],
      en: ["Configuration management", "Automation"]
    },
    introducedYear: 2011,
    vendor: "SaltStack (VMware)",
    isDeprecated: false,
    references: {
      docs: "https://docs.saltproject.io/"
    }
  },

  {
    port: 4506,
    name: "SaltStack Return",
    abbreviation: "Salt-Ret",
    description: {
      fa: "پورت بازگشت SaltStack",
      en: "SaltStack return port"
    },
    category: { fa: "IaC", en: "IaC" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "high",
    commonUseCases: {
      fa: ["ارتباط Minion با Master"],
      en: ["Minion to Master communication"]
    },
    vendor: "SaltStack",
    isDeprecated: false
  },

  {
    port: 8140,
    name: "Puppet Master",
    abbreviation: "Puppet",
    description: {
      fa: "سرور Puppet Master",
      en: "Puppet Master server"
    },
    category: { fa: "IaC", en: "IaC" },
    transport: "TCP",
    ianaStatus: "official",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["مدیریت پیکربندی سرورها"],
      en: ["Server configuration management"]
    },
    introducedYear: 2005,
    vendor: "Puppet",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/Puppet_(software)",
      docs: "https://puppet.com/docs/"
    }
  },

  {
    port: 8088,
    name: "Puppet Dashboard",
    abbreviation: "Puppet-DB",
    description: {
      fa: "داشبورد Puppet",
      en: "Puppet dashboard"
    },
    category: { fa: "IaC", en: "IaC" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["مانیتورینگ Puppet"],
      en: ["Puppet monitoring"]
    },
    vendor: "Puppet",
    isDeprecated: false
  },

  {
    port: 4567,
    name: "Sinatra",
    abbreviation: "Sinatra",
    description: {
      fa: "فریمورک وب Ruby",
      en: "Ruby web framework"
    },
    category: { fa: "توسعه", en: "Development" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["اپلیکیشن Ruby ساده"],
      en: ["Simple Ruby applications"]
    },
    introducedYear: 2007,
    vendor: "Sinatra",
    isDeprecated: false,
    codeExample: [
      {
        language: "ruby",
        code: `require 'sinatra'

get '/' do
  'Hello World!'
end

get '/users/:id' do
  "User #{params['id']}"
end`
      }
    ]
  },

  // ═══════════════════════════════════════════
  // === Mobile & App Development / توسعه موبایل ===
  // ═══════════════════════════════════════════
  {
    port: 5037,
    name: "Android ADB",
    abbreviation: "ADB",
    description: {
      fa: "Android Debug Bridge",
      en: "Android Debug Bridge"
    },
    category: { fa: "توسعه موبایل", en: "Mobile Development" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "high",
    commonUseCases: {
      fa: ["دیباگ اندروید", "نصب APK"],
      en: ["Android debugging", "APK installation"]
    },
    introducedYear: 2008,
    vendor: "Google",
    isDeprecated: false,
    references: {
      docs: "https://developer.android.com/studio/command-line/adb"
    },
    codeExample: [
      {
        language: "bash",
        code: `# اتصال به دستگاه:
adb devices

# نصب اپلیکیشن:
adb install app.apk

# مشاهده لاگ:
adb logcat

# اتصال به شل:
adb shell`
      }
    ]
  },

  {
    port: 5555,
    name: "ADB Wireless",
    abbreviation: "ADB-Wireless",
    description: {
      fa: "ADB بی‌سیم",
      en: "Wireless ADB"
    },
    category: { fa: "توسعه موبایل", en: "Mobile Development" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "critical",
    commonUseCases: {
      fa: ["دیباگ اندروید از طریق WiFi"],
      en: ["Android debugging over WiFi"]
    },
    vendor: "Google",
    isDeprecated: false,
    codeExample: [
      {
        language: "bash",
        code: `# فعال‌سازی ADB بی‌سیم:
adb tcpip 5555
adb connect 192.168.1.100:5555

# غیرفعال‌سازی:
adb usb`
      }
    ]
  },

  {
    port: 8081,
    name: "React Native Metro",
    abbreviation: "Metro",
    description: {
      fa: "بیلدر React Native",
      en: "React Native bundler"
    },
    category: { fa: "توسعه موبایل", en: "Mobile Development" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["توسعه React Native"],
      en: ["React Native development"]
    },
    introducedYear: 2015,
    vendor: "Meta (Facebook)",
    isDeprecated: false
  },

  {
    port: 19000,
    name: "Expo Dev Tools",
    abbreviation: "Expo",
    description: {
      fa: "ابزار توسعه Expo",
      en: "Expo development tools"
    },
    category: { fa: "توسعه موبایل", en: "Mobile Development" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["توسعه سریع React Native"],
      en: ["Fast React Native development"]
    },
    introducedYear: 2016,
    vendor: "Expo",
    isDeprecated: false,
    references: {
      docs: "https://docs.expo.dev/"
    }
  },

  {
    port: 19001,
    name: "Expo Packager",
    abbreviation: "Expo-Pack",
    description: {
      fa: "بسته‌بند Expo",
      en: "Expo packager"
    },
    category: { fa: "توسعه موبایل", en: "Mobile Development" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["بسته‌بندی اپلیکیشن"],
      en: ["App bundling"]
    },
    vendor: "Expo",
    isDeprecated: false
  },

  {
    port: 8100,
    name: "Ionic Dev Server",
    abbreviation: "Ionic",
    description: {
      fa: "سرور توسعه Ionic",
      en: "Ionic development server"
    },
    category: { fa: "توسعه موبایل", en: "Mobile Development" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["اپلیکیشن Hybrid"],
      en: ["Hybrid applications"]
    },
    introducedYear: 2013,
    vendor: "Ionic",
    isDeprecated: false
  },

  {
    port: 35729,
    name: "LiveReload",
    abbreviation: "LiveReload",
    description: {
      fa: "رفرش خودکار مرورگر",
      en: "Automatic browser refresh"
    },
    category: { fa: "توسعه", en: "Development" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["Hot Reload در توسعه"],
      en: ["Hot reload in development"]
    },
    introducedYear: 2010,
    vendor: "LiveReload",
    isDeprecated: false
  },

  // ═══════════════════════════════════════════
  // === Collaboration & Communication / همکاری ===
  // ═══════════════════════════════════════════
  {
    port: 3000,
    name: "Mattermost",
    abbreviation: "Mattermost",
    description: {
      fa: "پلتفرم چت تیمی متن‌باز",
      en: "Open-source team chat"
    },
    category: { fa: "همکاری", en: "Collaboration" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["چت سازمانی", "جایگزین Slack"],
      en: ["Enterprise chat", "Slack alternative"]
    },
    introducedYear: 2015,
    vendor: "Mattermost",
    isDeprecated: false,
    references: {
      docs: "https://docs.mattermost.com/"
    }
  },

  {
    port: 8065,
    name: "Mattermost (Alt)",
    abbreviation: "Mattermost-Alt",
    description: {
      fa: "پورت جایگزین Mattermost",
      en: "Alternative Mattermost port"
    },
    category: { fa: "همکاری", en: "Collaboration" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["چت تیمی"],
      en: ["Team chat"]
    },
    vendor: "Mattermost",
    isDeprecated: false
  },

  {
    port: 9000,
    name: "Rocket.Chat",
    abbreviation: "Rocket.Chat",
    description: {
      fa: "پلتفرم چت و ویدیو کنفرانس",
      en: "Chat and video conference platform"
    },
    category: { fa: "همکاری", en: "Collaboration" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "low",
    commonUseCases: {
      fa: ["چت تیمی متن‌باز"],
      en: ["Open-source team chat"]
    },
    introducedYear: 2015,
    vendor: "Rocket.Chat",
    isDeprecated: false,
    references: {
      docs: "https://docs.rocket.chat/"
    }
  },

  {
    port: 8080,
    name: "Nextcloud",
    abbreviation: "Nextcloud",
    description: {
      fa: "فضای ابری شخصی",
      en: "Personal cloud storage"
    },
    category: { fa: "همکاری", en: "Collaboration" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["فایل شیرینگ", "همکاری تیمی", "جایگزین Dropbox"],
      en: ["File sharing", "Team collaboration", "Dropbox alternative"]
    },
    introducedYear: 2016,
    vendor: "Nextcloud",
    isDeprecated: false,
    references: {
      docs: "https://docs.nextcloud.com/"
    }
  },

  {
    port: 8080,
    name: "Confluence",
    abbreviation: "Confluence",
    description: {
      fa: "ویکی سازمانی",
      en: "Enterprise wiki"
    },
    category: { fa: "همکاری", en: "Collaboration" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["مستندات تیمی", "دانش سازمانی"],
      en: ["Team documentation", "Knowledge base"]
    },
    introducedYear: 2004,
    vendor: "Atlassian",
    isDeprecated: false
  },

  {
    port: 8080,
    name: "JIRA",
    abbreviation: "JIRA",
    description: {
      fa: "مدیریت پروژه و issue tracking",
      en: "Project management and issue tracking"
    },
    category: { fa: "همکاری", en: "Collaboration" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["مدیریت Agile", "ردیابی باگ"],
      en: ["Agile management", "Bug tracking"]
    },
    introducedYear: 2002,
    vendor: "Atlassian",
    isDeprecated: false,
    references: {
      docs: "https://confluence.atlassian.com/jira"
    }
  },

  {
    port: 10080,
    name: "GitLab",
    abbreviation: "GitLab",
    description: {
      fa: "پلتفرم DevOps کامل",
      en: "Complete DevOps platform"
    },
    category: { fa: "توسعه", en: "Development" },
    transport: "TCP",
    ianaStatus: "unofficial",
    securityRisk: "medium",
    commonUseCases: {
      fa: ["Git Repository", "CI/CD", "Issue Tracking"],
      en: ["Git repository", "CI/CD", "Issue tracking"]
    },
    introducedYear: 2011,
    vendor: "GitLab",
    isDeprecated: false,
    references: {
      wiki: "https://en.wikipedia.org/wiki/GitLab",
      docs: "https://docs.gitlab.com/"
    }
  }

];

// ═══════════════════════════════════════════
// === توابع تحلیلی و گزارش‌دهی پیشرفته ===
// ═══════════════════════════════════════════

/**
 * تحلیل پورت‌های باز بر اساس نوع سرویس
 */
export function analyzeServiceTypes(openPorts: number[]): {
  web: number;
  database: number;
  messaging: number;
  security: number;
  development: number;
  monitoring: number;
  other: number;
  breakdown: Map<string, Protocol[]>;
} {
  const protocols = openPorts
    .map(p => protocolsData.find(pr => pr.port === p))
    .filter((p): p is Protocol => p !== undefined);

  const breakdown = new Map<string, Protocol[]>();
  
  protocols.forEach(p => {
    const category = p.category.en;
    if (!breakdown.has(category)) {
      breakdown.set(category, []);
    }
    breakdown.get(category)!.push(p);
  });

  const web = (breakdown.get("Web")?.length || 0) + 
               (breakdown.get("Web Server")?.length || 0);
  const database = breakdown.get("Database")?.length || 0;
  const messaging = breakdown.get("Messaging")?.length || 0;
  const security = (breakdown.get("Security")?.length || 0) +
                   (breakdown.get("VPN")?.length || 0);
  const development = breakdown.get("Development")?.length || 0;
  const monitoring = breakdown.get("Monitoring")?.length || 0;
  const other = protocols.length - (web + database + messaging + security + development + monitoring);

  return { web, database, messaging, security, development, monitoring, other, breakdown };
}

/**
 * شناسایی Stack Technology
 */
export function identifyTechStack(openPorts: number[]): {
  stack: string[];
  frameworks: string[];
  databases: string[];
  confidence: "high" | "medium" | "low";
} {
  const protocols = openPorts
    .map(p => protocolsData.find(pr => pr.port === p))
    .filter((p): p is Protocol => p !== undefined);

  const stack: string[] = [];
  const frameworks: string[] = [];
  const databases: string[] = [];

  // شناسایی Stack
  if (openPorts.includes(3000) || openPorts.includes(3001)) {
    stack.push("Node.js/React");
    frameworks.push("Express.js");
  }
  if (openPorts.includes(8080)) {
    stack.push("Java/Spring Boot");
  }
  if (openPorts.includes(5000)) {
    stack.push("Python/Flask");
  }
  if (openPorts.includes(8000)) {
    stack.push("Python/Django");
  }
  if (openPorts.includes(4200)) {
    frameworks.push("Angular");
  }
  if (openPorts.includes(5173)) {
    frameworks.push("Vite");
  }

  // شناسایی دیتابیس
  if (openPorts.includes(3306)) databases.push("MySQL/MariaDB");
  if (openPorts.includes(5432)) databases.push("PostgreSQL");
  if (openPorts.includes(27017)) databases.push("MongoDB");
  if (openPorts.includes(6379)) databases.push("Redis");
  if (openPorts.includes(9200)) databases.push("Elasticsearch");

  const confidence = stack.length + frameworks.length + databases.length > 5 ? "high" :
                     stack.length + frameworks.length + databases.length > 2 ? "medium" : "low";

  return { stack, frameworks, databases, confidence };
}

/**
 * پیشنهاد بهینه‌سازی امنیتی
 */
export function suggestSecurityOptimizations(openPorts: number[]): {
  critical: string[];
  recommended: string[];
  optional: string[];
} {
  const protocols = openPorts
    .map(p => protocolsData.find(pr => pr.port === p))
    .filter((p): p is Protocol => p !== undefined);

  const critical: string[] = [];
  const recommended: string[] = [];
  const optional: string[] = [];

  // بررسی پروتکل‌های ناامن
  protocols.forEach(p => {
    if (p.securityRisk === "critical") {
      critical.push(`🚨 فوری: بستن یا محدود کردن پورت ${p.port} (${p.name})`);
    }
    if (p.isDeprecated) {
      critical.push(`⛔ فوری: جایگزینی ${p.name} (منسوخ شده)`);
    }
  });

  // HTTP به HTTPS
  if (openPorts.includes(80) && !openPorts.includes(443)) {
    recommended.push("🔒 فعال‌سازی HTTPS (پورت 443) و ریدایرکت از HTTP");
  }

  // FTP به SFTP
  if (openPorts.includes(21)) {
    recommended.push("🔐 جایگزینی FTP با SFTP (پورت 22) یا FTPS (پورت 990)");
  }

  // Telnet به SSH
  if (openPorts.includes(23)) {
    critical.push("⚠️ خطر بحرانی: جایگزینی Telnet با SSH");
  }

  // دیتابیس‌های بدون محدودیت
  const dbPorts = [3306, 5432, 27017, 6379, 9200];
  dbPorts.forEach(port => {
    if (openPorts.includes(port)) {
      recommended.push(`🔐 محدود کردن دسترسی به پورت ${port} با Firewall/Security Group`);
    }
  });

  // پورت‌های مدیریتی
  const adminPorts = [8080, 9090, 10000];
  adminPorts.forEach(port => {
    if (openPorts.includes(port)) {
      optional.push(`🛡️ محدود کردن دسترسی به پورت ${port} فقط از IP مشخص`);
    }
  });

  // فعال‌سازی Fail2Ban
  if (openPorts.includes(22)) {
    optional.push("🛡️ نصب و پیکربندی Fail2Ban برای SSH");
  }

  return { critical, recommended, optional };
}

/**
 * تولید گزارش Compliance
 */
export function generateComplianceReport(
  openPorts: number[],
  standards: ("PCI-DSS" | "HIPAA" | "ISO27001" | "SOC2")[] = ["PCI-DSS"]
): {
  compliant: boolean;
  violations: string[];
  warnings: string[];
  recommendations: string[];
} {
  const violations: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];

  const protocols = openPorts
    .map(p => protocolsData.find(pr => pr.port === p))
    .filter((p): p is Protocol => p !== undefined);

  standards.forEach(standard => {
    if (standard === "PCI-DSS") {
      // بررسی پروتکل‌های رمزنگاری نشده
      if (openPorts.includes(80)) {
        warnings.push("PCI-DSS: استفاده از HTTP بدون HTTPS");
      }
      if (openPorts.includes(21) || openPorts.includes(23)) {
        violations.push("PCI-DSS: استفاده از پروتکل‌های غیررمزنگاری شده (FTP/Telnet)");
      }
      
      // بررسی دسترسی به دیتابیس
      if (openPorts.includes(3306) || openPorts.includes(5432)) {
        warnings.push("PCI-DSS: دیتابیس باید از اینترنت عمومی مخفی باشد");
      }
    }

    if (standard === "HIPAA") {
      // رمزنگاری در انتقال
      if (openPorts.includes(80) || openPorts.includes(21)) {
        violations.push("HIPAA: داده‌های بهداشتی باید رمزنگاری شوند");
      }
    }

    if (standard === "ISO27001") {
      protocols.forEach(p => {
        if (p.securityRisk === "critical" || p.securityRisk === "high") {
          warnings.push(`ISO27001: ریسک امنیتی بالا برای ${p.name}`);
        }
      });
    }
  });

  recommendations.push("✅ پیاده‌سازی Two-Factor Authentication");
  recommendations.push("✅ استفاده از VPN برای دسترسی از راه دور");
  recommendations.push("✅ اسکن امنیتی منظم");

  return {
    compliant: violations.length === 0,
    violations,
    warnings,
    recommendations
  };
}

/**
 * تحلیل ترافیک و پیشنهاد CDN
 */
export function analyzeCDNNeeds(openPorts: number[]): {
  needsCDN: boolean;
  reason: string[];
  suggestedServices: string[];
} {
  const reason: string[] = [];
  const suggestedServices: string[] = [];
  let needsCDN = false;

  if (openPorts.includes(80) || openPorts.includes(443)) {
    needsCDN = true;
    reason.push("✅ سرویس وب شناسایی شد");
    suggestedServices.push("Cloudflare", "CloudFront", "Fastly");
  }

  if (openPorts.includes(8080) || openPorts.includes(3000)) {
    reason.push("⚠️ API Server شناسایی شد - CDN برای کش API مفید است");
    suggestedServices.push("Cloudflare Workers", "CloudFront");
  }

  if (openPorts.includes(32400) || openPorts.includes(8096)) {
    needsCDN = true;
    reason.push("📺 سرویس استریمینگ شناسایی شد");
    suggestedServices.push("CloudFront", "Akamai");
  }

  return { needsCDN, reason, suggestedServices };
}

/**
 * پیشنهاد معماری Microservices
 */
export function suggestMicroservicesArchitecture(openPorts: number[]): {
  isMicroservices: boolean;
  services: string[];
  suggestions: string[];
} {
  const services: string[] = [];
  const suggestions: string[] = [];

  // شناسایی سرویس‌ها
  if (openPorts.includes(3000)) services.push("Frontend (React/Node)");
  if (openPorts.includes(8080)) services.push("Backend API");
  if (openPorts.includes(3306) || openPorts.includes(5432)) services.push("Database");
  if (openPorts.includes(6379)) services.push("Cache (Redis)");
  if (openPorts.includes(9092)) services.push("Message Queue (Kafka)");
  if (openPorts.includes(9200)) services.push("Search (Elasticsearch)");

  const isMicroservices = services.length >= 3;

  if (isMicroservices) {
    suggestions.push("✅ استفاده از API Gateway (Kong/Nginx)");
    suggestions.push("✅ پیاده‌سازی Service Discovery (Consul)");
    suggestions.push("✅ استفاده از Container Orchestration (Kubernetes)");
    suggestions.push("✅ پیاده‌سازی Distributed Tracing (Jaeger/Zipkin)");
  }

  return { isMicroservices, services, suggestions };
}

/**
 * تولید Docker Compose برای Stack شناسایی شده
 */
export function generateDockerCompose(openPorts: number[]): string {
  let compose = `version: '3.8'\n\nservices:\n`;

  if (openPorts.includes(80) || openPorts.includes(443)) {
    compose += `  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    restart: unless-stopped

`;
  }

  if (openPorts.includes(3306)) {
    compose += `  mysql:
    image: mysql:8.0
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: changeme
      MYSQL_DATABASE: myapp
    volumes:
      - mysql_data:/var/lib/mysql
    restart: unless-stopped

`;
  }

  if (openPorts.includes(5432)) {
    compose += `  postgres:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: changeme
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

`;
  }

  if (openPorts.includes(6379)) {
    compose += `  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

`;
  }

  if (openPorts.includes(27017)) {
    compose += `  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: changeme
    volumes:
      - mongo_data:/data/db
    restart: unless-stopped

`;
  }

  compose += `\nvolumes:\n`;
  if (openPorts.includes(3306)) compose += `  mysql_data:\n`;
  if (openPorts.includes(5432)) compose += `  postgres_data:\n`;
  if (openPorts.includes(6379)) compose += `  redis_data:\n`;
  if (openPorts.includes(27017)) compose += `  mongo_data:\n`;

  return compose;
}

/**
 * محاسبه هزینه تخمینی سرویس‌های Cloud
 */
export function estimateCloudCost(
  openPorts: number[],
  provider: "AWS" | "GCP" | "Azure" = "AWS"
): {
  monthly: number;
  breakdown: Map<string, number>;
  currency: string;
} {
  const breakdown = new Map<string, number>();
  let total = 0;

  // قیمت‌های تقریبی (دلار در ماه)
  const prices = {
    AWS: {
      ec2_t3_small: 15,
      rds_mysql: 25,
      rds_postgres: 30,
      elasticache_redis: 20,
      elb: 20,
      cloudfront: 10,
    }
  };

  // محاسبه هزینه EC2
  const instanceCost = prices.AWS.ec2_t3_small;
  breakdown.set("EC2 Instance (t3.small)", instanceCost);
  total += instanceCost;

  // دیتابیس
  if (openPorts.includes(3306)) {
    breakdown.set("RDS MySQL", prices.AWS.rds_mysql);
    total += prices.AWS.rds_mysql;
  }
  if (openPorts.includes(5432)) {
    breakdown.set("RDS PostgreSQL", prices.AWS.rds_postgres);
    total += prices.AWS.rds_postgres;
  }

  // کش
  if (openPorts.includes(6379)) {
    breakdown.set("ElastiCache Redis", prices.AWS.elasticache_redis);
    total += prices.AWS.elasticache_redis;
  }

  // لودبالانسر
  if (openPorts.includes(80) || openPorts.includes(443)) {
    breakdown.set("Application Load Balancer", prices.AWS.elb);
    total += prices.AWS.elb;
  }

  return {
    monthly: Math.round(total),
    breakdown,
    currency: "USD"
  };
}
// ═══════════════════════════════════════════
// === توابع تحلیلی پیشرفته / Advanced Analytics ===
// ═══════════════════════════════════════════

/**
 * تحلیل امنیتی شبکه
 */
export function analyzeNetworkSecurity(openPorts: number[]): {
  criticalRisks: Protocol[];
  highRisks: Protocol[];
  recommendations: string[];
  score: number;
} {
  const protocols = openPorts
    .map(port => protocolsData.find(p => p.port === port))
    .filter((p): p is Protocol => p !== undefined);

  const criticalRisks = protocols.filter(p => p.securityRisk === "critical");
  const highRisks = protocols.filter(p => p.securityRisk === "high");
  const deprecated = protocols.filter(p => p.isDeprecated);

  const recommendations: string[] = [];

  if (criticalRisks.length > 0) {
    recommendations.push(`⛔ ${criticalRisks.length} پورت با ریسک بحرانی باز است!`);
    criticalRisks.forEach(p => {
      recommendations.push(`   - بستن یا محدود کردن پورت ${p.port} (${p.name})`);
    });
  }

  if (deprecated.length > 0) {
    recommendations.push(`⚠️ ${deprecated.length} پروتکل منسوخ در حال استفاده`);
  }

  // محاسبه امتیاز امنیتی (0-100)
  const score = Math.max(0, 100 - 
    (criticalRisks.length * 25) - 
    (highRisks.length * 10) - 
    (deprecated.length * 5)
  );

  return { criticalRisks, highRisks, recommendations, score };
}

/**
 * پیشنهاد جایگزین‌های امن
 */
export function suggestSecureAlternatives(port: number): {
  current: Protocol | undefined;
  alternatives: Protocol[];
  reason: string;
} {
  const current = protocolsData.find(p => p.port === port);
  if (!current) return { current, alternatives: [], reason: "" };

  const alternatives: Protocol[] = [];
  let reason = "";

  // نگاشت پروتکل‌های ناامن به امن
  const secureMapping: Record<number, number[]> = {
    21: [22, 990],      // FTP -> SSH/FTPS
    23: [22],           // Telnet -> SSH
    80: [443],          // HTTP -> HTTPS
    143: [993],         // IMAP -> IMAPS
    110: [995],         // POP3 -> POP3S
    25: [587, 465],     // SMTP -> SMTP Submission/SMTPS
  };

  if (secureMapping[port]) {
    alternatives.push(
      ...secureMapping[port]
        .map(p => protocolsData.find(pr => pr.port === p))
        .filter((p): p is Protocol => p !== undefined)
    );
    reason = "این پورت ناامن است. از جایگزین‌های رمزنگاری‌شده استفاده کنید.";
  }

  return { current, alternatives, reason };
}

/**
 * گزارش جامع پورت
 */
export function generatePortReport(port: number): string {
  const protocol = protocolsData.find(p => p.port === port);
  if (!protocol) return `پورت ${port} در دیتابیس یافت نشد.`;

  const report = `
╔════════════════════════════════════════════════════════════╗
║           گزارش کامل پورت ${port.toString().padEnd(10)}                    ║
╠════════════════════════════════════════════════════════════╣
║ نام: ${protocol.name.padEnd(52)} ║
║ مخفف: ${protocol.abbreviation.padEnd(50)} ║
║ دسته‌بندی: ${protocol.category.fa.padEnd(46)} ║
║ پروتکل انتقال: ${protocol.transport.padEnd(42)} ║
║ سطح خطر: ${protocol.securityRisk.padEnd(46)} ║
║ وضعیت IANA: ${protocol.ianaStatus.padEnd(44)} ║
║ منسوخ شده: ${(protocol.isDeprecated ? "بله" : "خیر").padEnd(45)} ║
${protocol.vendor ? `║ سازنده: ${protocol.vendor.padEnd(48)} ║` : ""}
${protocol.introducedYear ? `║ سال معرفی: ${protocol.introducedYear.toString().padEnd(45)} ║` : ""}
╠════════════════════════════════════════════════════════════╣
║ کاربردها:                                                 ║
${protocol.commonUseCases.fa.map(uc => `║   • ${uc.padEnd(53)} ║`).join('\n')}
╠════════════════════════════════════════════════════════════╣
║ توصیه‌های امنیتی:                                         ║
${getSecurityRecommendations(port).map(rec => `║   ${rec.padEnd(55)} ║`).join('\n')}
╚════════════════════════════════════════════════════════════╝
  `.trim();

  return report;
}

/**
 * تشخیص پورت‌های مشکوک
 */
export function detectSuspiciousPorts(openPorts: number[]): {
  suspicious: Protocol[];
  reasons: Map<number, string[]>;
} {
  const suspicious: Protocol[] = [];
  const reasons = new Map<number, string[]>();

  // پورت‌های مشکوک
  const suspiciousPorts = [
    1080,  // SOCKS proxy
    3128,  // Squid proxy
    4444,  // Metasploit
    5555,  // Android Debug Bridge
    6667,  // IRC
    12345, // NetBus backdoor
    31337, // Back Orifice
  ];

  openPorts.forEach(port => {
    const protocol = protocolsData.find(p => p.port === port);
    const portReasons: string[] = [];

    if (suspiciousPorts.includes(port)) {
      portReasons.push("پورت شناخته‌شده برای backdoor یا malware");
    }

    if (protocol?.securityRisk === "critical") {
      portReasons.push("سطح خطر بحرانی");
    }

    if (protocol?.isDeprecated) {
      portReasons.push("پروتکل منسوخ شده");
    }

    // پورت‌های بالای 49152 (Dynamic/Private)
    if (port > 49152) {
      portReasons.push("پورت در محدوده Dynamic - احتمال استفاده غیرعادی");
    }

    if (portReasons.length > 0 && protocol) {
      suspicious.push(protocol);
      reasons.set(port, portReasons);
    }
  });

  return { suspicious, reasons };
}

/**
 * تولید نقشه شبکه
 */
export function generateNetworkMap(ports: number[]): {
  webServices: Protocol[];
  databases: Protocol[];
  messaging: Protocol[];
  security: Protocol[];
  other: Protocol[];
} {
  const protocols = ports
    .map(p => protocolsData.find(pr => pr.port === p))
    .filter((p): p is Protocol => p !== undefined);

  return {
    webServices: protocols.filter(p => 
      ["Web", "وب"].includes(p.category.en) || 
      ["Web", "وب"].includes(p.category.fa)
    ),
    databases: protocols.filter(p => 
      ["Database", "پایگاه داده"].includes(p.category.en) ||
      ["Database", "پایگاه داده"].includes(p.category.fa)
    ),
    messaging: protocols.filter(p => 
      ["Messaging", "پیام‌رسانی"].includes(p.category.en) ||
      ["Messaging", "پیام‌رسانی"].includes(p.category.fa)
    ),
    security: protocols.filter(p => 
      ["Security", "امنیت", "VPN"].includes(p.category.en) ||
      ["Security", "امنیت", "VPN"].includes(p.category.fa)
    ),
    other: protocols.filter(p => 
      !["Web", "وب", "Database", "پایگاه داده", "Messaging", "پیام‌رسانی", 
        "Security", "امنیت", "VPN"].includes(p.category.en) &&
      !["Web", "وب", "Database", "پایگاه داده", "Messaging", "پیام‌رسانی", 
        "Security", "امنیت", "VPN"].includes(p.category.fa)
    )
  };
}

/**
 * ایجاد قوانین فایروال
 */
export function generateFirewallRules(
  allowedPorts: number[],
  format: "iptables" | "ufw" | "firewalld" = "iptables"
): string[] {
  const rules: string[] = [];

  if (format === "iptables") {
    rules.push("# Drop all incoming by default");
    rules.push("iptables -P INPUT DROP");
    rules.push("");
    rules.push("# Allow established connections");
    rules.push("iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT");
    rules.push("");
    rules.push("# Allow loopback");
    rules.push("iptables -A INPUT -i lo -j ACCEPT");
    rules.push("");
    
    allowedPorts.forEach(port => {
      const protocol = protocolsData.find(p => p.port === port);
      const transport = protocol?.transport.includes("TCP") ? "tcp" : "udp";
      rules.push(`# ${protocol?.name || `Port ${port}`}`);
      rules.push(`iptables -A INPUT -p ${transport} --dport ${port} -j ACCEPT`);
    });
  } else if (format === "ufw") {
    rules.push("# Enable UFW");
    rules.push("ufw --force enable");
    rules.push("ufw default deny incoming");
    rules.push("ufw default allow outgoing");
    rules.push("");
    
    allowedPorts.forEach(port => {
      const protocol = protocolsData.find(p => p.port === port);
      rules.push(`# ${protocol?.name || `Port ${port}`}`);
      rules.push(`ufw allow ${port}`);
    });
  } else if (format === "firewalld") {
    allowedPorts.forEach(port => {
      const protocol = protocolsData.find(p => p.port === port);
      const transport = protocol?.transport.includes("TCP") ? "tcp" : "udp";
      rules.push(`# ${protocol?.name || `Port ${port}`}`);
      rules.push(`firewall-cmd --permanent --add-port=${port}/${transport}`);
    });
    rules.push("");
    rules.push("firewall-cmd --reload");
  }

  return rules;
}

// ═══════════════════════════════════════════
// === توابع کمکی پیشرفته / Advanced Helper Functions ===
// ═══════════════════════════════════════════

/**
 * گروه‌بندی بر اساas transport protocol
 */
export function getProtocolsByTransport(
  transport: "TCP" | "UDP" | "TCP/UDP"
): Protocol[] {
  if (transport === "TCP/UDP") {
    return protocolsData.filter((p) => p.transport === "TCP/UDP");
  }
  return protocolsData.filter((p) => p.transport.includes(transport));
}

/**
 * پیدا کردن پورت‌های خطرناک
 */
export function getDangerousPorts(): Protocol[] {
  return protocolsData.filter(
    (p) => p.securityRisk === "high" || p.securityRisk === "critical"
  );
}

/**
 * لیست پورت‌های استاندارد IANA
 */
export function getOfficialPorts(): Protocol[] {
  return protocolsData.filter((p) => p.ianaStatus === "official");
}

/**
 * جستجوی پیشرفته با فیلترهای چندگانه
 */
export function advancedSearch(filters: {
  query?: string;
  category?: string;
  transport?: "TCP" | "UDP" | "TCP/UDP";
  securityRisk?: "low" | "medium" | "high" | "critical";
  deprecated?: boolean;
  portRange?: { min: number; max: number };
}): Protocol[] {
  let results = [...protocolsData];

  if (filters.query) {
    const q = filters.query.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.abbreviation.toLowerCase().includes(q) ||
        p.description.en.toLowerCase().includes(q) ||
        p.description.fa.includes(q) ||
        p.port.toString().includes(q) ||
        p.vendor?.toLowerCase().includes(q)
    );
  }

  if (filters.category) {
    results = results.filter(
      (p) => p.category.en.toLowerCase() === filters.category?.toLowerCase()
    );
  }

  if (filters.transport) {
    results = results.filter((p) => p.transport.includes(filters.transport!));
  }

  if (filters.securityRisk) {
    results = results.filter((p) => p.securityRisk === filters.securityRisk);
  }

  if (filters.deprecated !== undefined) {
    results = results.filter((p) => p.isDeprecated === filters.deprecated);
  }

  if (filters.portRange) {
    results = results.filter(
      (p) =>
        p.port >= filters.portRange!.min && p.port <= filters.portRange!.max
    );
  }

  return results;
}

/**
 * تبدیل به JSON برای export
 */
export function exportToJSON(): string {
  return JSON.stringify(protocolsData, null, 2);
}

/**
 * تبدیل به CSV
 */
export function exportToCSV(): string {
  const headers = [
    "Port",
    "Name",
    "Abbreviation",
    "Category",
    "Transport",
    "Security Risk",
    "IANA Status",
    "Deprecated",
    "Vendor",
  ];

  const rows = protocolsData.map((p) => [
    p.port,
    p.name,
    p.abbreviation,
    p.category.en,
    p.transport,
    p.securityRisk,
    p.ianaStatus,
    p.isDeprecated ? "Yes" : "No",
    p.vendor || "N/A",
  ]);

  return [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");
}

/**
 * گروه‌بندی بر اساس محدوده پورت
 */
export function getProtocolsByPortRange(ranges: {
  wellKnown?: boolean; // 0-1023
  registered?: boolean; // 1024-49151
  dynamic?: boolean; // 49152-65535
}): Protocol[] {
  let results: Protocol[] = [];

  if (ranges.wellKnown) {
    results = results.concat(
      protocolsData.filter((p) => p.port >= 0 && p.port <= 1023)
    );
  }

  if (ranges.registered) {
    results = results.concat(
      protocolsData.filter((p) => p.port >= 1024 && p.port <= 49151)
    );
  }

  if (ranges.dynamic) {
    results = results.concat(
      protocolsData.filter((p) => p.port >= 49152 && p.port <= 65535)
    );
  }

  return [...new Set(results)]; // حذف تکراری
}

/**
 * پیشنهاد پورت‌های مشابه
 */
export function getSuggestedPorts(port: number, limit = 5): Protocol[] {
  const protocol = protocolsData.find((p) => p.port === port);
  if (!protocol) return [];

  return getRelatedProtocols(protocol, limit);
}

/**
 * بررسی تداخل پورت
 */
export function checkPortConflict(port: number): {
  hasConflict: boolean;
  protocols: Protocol[];
} {
  const protocols = protocolsData.filter((p) => p.port === port);

  return {
    hasConflict: protocols.length > 1,
    protocols,
  };
}

/**
 * دریافت timeline پروتکل‌ها
 */
export function getProtocolTimeline(): {
  year: number;
  protocols: Protocol[];
}[] {
  const timeline = new Map<number, Protocol[]>();

  protocolsData.forEach((p) => {
    if (p.introducedYear) {
      const year = p.introducedYear;
      if (!timeline.has(year)) {
        timeline.set(year, []);
      }
      timeline.get(year)!.push(p);
    }
  });

  return Array.from(timeline.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([year, protocols]) => ({ year, protocols }));
}

/**
 * توصیه‌های امنیتی
 */
export function getSecurityRecommendations(port: number): string[] {
  const protocol = protocolsData.find((p) => p.port === port);
  if (!protocol) return [];

  const recommendations: string[] = [];

  if (protocol.securityRisk === "critical" || protocol.securityRisk === "high") {
    recommendations.push("⚠️ این پورت دارای ریسک امنیتی بالا است");
    recommendations.push("🔒 از فایروال برای محدود کردن دسترسی استفاده کنید");
  }

  if (protocol.isDeprecated) {
    recommendations.push("⛔ این پروتکل منسوخ شده است");
    recommendations.push("✅ از جایگزین‌های مدرن استفاده کنید");
  }

  if (protocol.transport.includes("UDP")) {
    recommendations.push("💡 پروتکل UDP - ممکن است نیاز به تنظیمات فایروال داشته باشد");
  }

  if (!protocol.rfc && protocol.ianaStatus === "unofficial") {
    recommendations.push("ℹ️ این پورت استاندارد رسمی ندارد");
  }

  return recommendations;
}

/**
 * مقایسه چند پروتکل
 */
export function compareMultipleProtocols(
  ports: number[]
): {
  port: number;
  name: string;
  category: string;
  securityRisk: string;
  transport: string;
}[] {
  return ports
    .map((port) => protocolsData.find((p) => p.port === port))
    .filter((p): p is Protocol => p !== undefined)
    .map((p) => ({
      port: p.port,
      name: p.name,
      category: p.category.en,
      securityRisk: p.securityRisk,
      transport: p.transport,
    }));
}

/**
 * دریافت آمار vendor
 */
export function getVendorStats(): { vendor: string; count: number }[] {
  const vendorMap = new Map<string, number>();

  protocolsData.forEach((p) => {
    if (p.vendor) {
      vendorMap.set(p.vendor, (vendorMap.get(p.vendor) || 0) + 1);
    }
  });

  return Array.from(vendorMap.entries())
    .map(([vendor, count]) => ({ vendor, count }))
    .sort((a, b) => b.count - a.count);
}

export const getFullName = (abbr: string): string => {
  const mapping: Record<string, string> = {
    HTTP: "Hypertext Transfer Protocol",
    HTTPS: "Hypertext Transfer Protocol Secure",
    FTP: "File Transfer Protocol",
    SSH: "Secure Shell",
    SMTP: "Simple Mail Transfer Protocol",
    DNS: "Domain Name System",
    // ... بقیه
  };
  return mapping[abbr] || abbr;
};

export function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getProtocolBySlug(slug: string): Protocol | undefined {
  return protocolsData.find((p) => nameToSlug(p.name) === slug.toLowerCase());
}

export function getRelatedProtocols(protocol: Protocol, limit = 4): Protocol[] {
  return protocolsData
    .filter(
      (p) =>
        p.name !== protocol.name &&
        (p.category.en === protocol.category.en ||
          p.transport === protocol.transport ||
          p.securityRisk === protocol.securityRisk)
    )
    .slice(0, limit);
}

export function getAllProtocolSlugs(): string[] {
  return protocolsData.map((p) => nameToSlug(p.name));
}

// 🆕 فیلتر بر اساس سطح امنیت
export function getProtocolsBySecurityRisk(
  risk: "low" | "medium" | "high" | "critical"
): Protocol[] {
  return protocolsData.filter((p) => p.securityRisk === risk);
}

// 🆕 فیلتر پروتکل‌های منسوخ
export function getDeprecatedProtocols(): Protocol[] {
  return protocolsData.filter((p) => p.isDeprecated);
}

// 🆕 جستجوی پیشرفته
export function searchProtocols(query: string): Protocol[] {
  const q = query.toLowerCase();
  return protocolsData.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.abbreviation.toLowerCase().includes(q) ||
      p.description.en.toLowerCase().includes(q) ||
      p.description.fa.includes(q) ||
      p.port.toString().includes(q)
  );
}
// 🆕 دسته‌بندی بر اساس کاربرد
export function getProtocolsByCategory(category: string): Protocol[] {
  return protocolsData.filter(
    (p) => p.category.en.toLowerCase() === category.toLowerCase()
  );
}

// 🆕 لیست همه دسته‌بندی‌ها
export function getAllCategories(): { fa: string; en: string }[] {
  const categories = new Map<string, { fa: string; en: string }>();
  protocolsData.forEach((p) => {
    if (!categories.has(p.category.en)) {
      categories.set(p.category.en, p.category);
    }
  });
  return Array.from(categories.values());
}

// 🆕 پورت‌های پرکاربرد
export function getPopularProtocols(limit = 10): Protocol[] {
  const popular = [80, 443, 22, 21, 25, 3306, 5432, 6379, 27017, 53];
  return protocolsData
    .filter((p) => popular.includes(p.port))
    .slice(0, limit);
}

// 🆕 فیلتر بر اساس RFC
export function getProtocolsByRFC(rfcNumber: number): Protocol[] {
  return protocolsData.filter((p) => p.rfc?.includes(rfcNumber));
}

// 🆕 پورت‌های یک vendor خاص
export function getProtocolsByVendor(vendor: string): Protocol[] {
  return protocolsData.filter(
    (p) => p.vendor?.toLowerCase().includes(vendor.toLowerCase())
  );
}

// 🆕 آمار کلی
export function getProtocolStats() {
  return {
    total: protocolsData.length,
    byTransport: {
      TCP: protocolsData.filter((p) => p.transport.includes("TCP")).length,
      UDP: protocolsData.filter((p) => p.transport.includes("UDP")).length,
      both: protocolsData.filter((p) => p.transport === "TCP/UDP").length,
    },
    bySecurityRisk: {
      low: protocolsData.filter((p) => p.securityRisk === "low").length,
      medium: protocolsData.filter((p) => p.securityRisk === "medium").length,
      high: protocolsData.filter((p) => p.securityRisk === "high").length,
      critical: protocolsData.filter((p) => p.securityRisk === "critical").length,
    },
    deprecated: protocolsData.filter((p) => p.isDeprecated).length,
    official: protocolsData.filter((p) => p.ianaStatus === "official").length,
  };
}

// 🆕 مقایسه دو پروتکل
export function compareProtocols(port1: number, port2: number): {
  similarities: string[];
  differences: string[];
} {
  const p1 = protocolsData.find((p) => p.port === port1);
  const p2 = protocolsData.find((p) => p.port === port2);
  
  if (!p1 || !p2) return { similarities: [], differences: [] };
  
  const similarities: string[] = [];
  const differences: string[] = [];
  
  if (p1.category.en === p2.category.en) similarities.push("Same category");
  else differences.push("Different categories");
  
  if (p1.transport === p2.transport) similarities.push("Same transport");
  else differences.push("Different transport protocols");
  
  if (p1.securityRisk === p2.securityRisk) similarities.push("Same security risk");
  else differences.push("Different security risk levels");
  
  return { similarities, differences };
}