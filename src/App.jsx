import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";
import AddVulnerabilityForm from "./components/AddVulnerabilityForm";
import PreviewSection from "./components/PreviewSection";

const App = () => {
  // Set dark mode by default and don't allow toggling.
  const theme = createTheme({
    palette: {
      mode: "dark", // Always dark mode
      primary: {
        main: "#CB1A29", // You can keep your custom colors here
      },
      secondary: {
        main: "#9c27b0",
      },
    },
  });

  const [formData, setFormData] = useState({
    exploitId: "",
    poc: [],
    steps: [""],
    recommendation: "",
    occurrences: [""],
    resources: "",
  });

  const [selectedExploit, setSelectedExploit] = useState(null);

  const exploits = [
    {
      id: 1,
      name: "Missing HTTP Security Headers",
      severity: "info",
      description:
        "Missing security headers in a web application refer to the absence of specific HTTP response headers designed to increase the application's security. These help prevent Cross-Site Scripting (XSS), where attackers can steal user data.",
      recomendation:
        "<p>To mitigate the risk of this issue, the assessment team recommends the following steps:</p><ul><li>Set limiting rates on those requests to restrict the number of simultaneous attempts that are allowed.</li><li>The number of attempts should be based on the business logic, but it is recommended to be around 5 to 10 attempts in a small time window like 1 minute.</li></ul>",
      resources:
        "<p>More information about HTTP security headers</p><ul><li><strong>cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html</strong></li></ul><p>5 security headers that must be implemented on a website</p><ul><li><strong>www.thesslstore.com/blog/http-security-headers/</strong></li></ul>",
    },
    {
      id: 2,
      name: "SQL Injection",
      severity: "critical",
      description:
        "SQL Injection allows attackers to interfere with the queries that an application makes to its database, potentially leading to data leaks or even full database compromise.",
      recomendation:
        "<p>Use prepared statements with parameterized queries. Avoid string concatenation to build SQL queries.</p>",
      resources:
        "<ul><li><strong>owasp.org/www-community/attacks/SQL_Injection</strong></li></ul>",
    },
    {
      id: 3,
      name: "Cross-Site Scripting (XSS)",
      severity: "high",
      description:
        "XSS enables attackers to inject malicious scripts into webpages viewed by other users, leading to data theft or session hijacking.",
      recomendation:
        "<p>Sanitize user inputs and use proper output encoding.</p>",
      resources:
        "<ul><li><strong>owasp.org/www-community/attacks/xss/</strong></li></ul>",
    },
    {
      id: 4,
      name: "Open Redirect",
      severity: "medium",
      description:
        "Open redirects allow attackers to redirect users to malicious websites using a trusted domain.",
      recomendation: "<p>Validate and whitelist redirect URLs.</p>",
      resources:
        "<ul><li><strong>owasp.org/www-community/attacks/Redirect_Attacks</strong></li></ul>",
    },
    {
      id: 5,
      name: "Directory Traversal",
      severity: "high",
      description:
        "Directory traversal allows attackers to access files outside the intended directories.",
      recomendation:
        "<p>Sanitize file path inputs and use secure libraries for file access.</p>",
      resources:
        "<ul><li><strong>owasp.org/www-community/attacks/Path_Traversal</strong></li></ul>",
    },
    {
      id: 6,
      name: "Insecure Deserialization",
      severity: "critical",
      description:
        "Deserialization of untrusted data can lead to remote code execution, injection attacks, or privilege escalation.",
      recomendation:
        "<p>Implement integrity checks and avoid deserializing objects from untrusted sources.</p>",
      resources:
        "<ul><li><strong>owasp.org/www-community/vulnerabilities/Deserialization_of_untrusted_data</strong></li></ul>",
    },
    {
      id: 7,
      name: "Sensitive Data Exposure",
      severity: "high",
      description:
        "Improper protection of sensitive data like passwords, credit card numbers, or health records.",
      recomendation:
        "<p>Encrypt data at rest and in transit using strong algorithms.</p>",
      resources:
        "<ul><li><strong>owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure</strong></li></ul>",
    },
    {
      id: 8,
      name: "Broken Access Control",
      severity: "critical",
      description:
        "Access controls are not properly enforced, allowing users to act outside their intended permissions.",
      recomendation:
        "<p>Enforce role-based access control and deny by default.</p>",
      resources:
        "<ul><li><strong>owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control</strong></li></ul>",
    },
    {
      id: 9,
      name: "Clickjacking",
      severity: "medium",
      description:
        "Clickjacking tricks users into clicking on something different than what they perceive, potentially compromising sensitive operations.",
      recomendation:
        "<p>Use X-Frame-Options header and Content Security Policy (CSP) to prevent framing.</p>",
      resources:
        "<ul><li><strong>developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options</strong></li></ul>",
    },
    {
      id: 10,
      name: "Using Components with Known Vulnerabilities",
      severity: "high",
      description:
        "Using vulnerable libraries or frameworks can open up the application to known exploits.",
      recomendation:
        "<p>Regularly update dependencies and use tools to identify vulnerabilities.</p>",
      resources:
        "<ul><li><strong>owasp.org/www-project-dependency-check/</strong></li></ul>",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          width: "100%",
        }}
      >
        {/* Left side for form */}
        <Box sx={{ flex: 1, padding: 2, bgcolor: "#1E1E1E" }}>
          <AddVulnerabilityForm
            exploits={exploits}
            formData={formData}
            setFormData={setFormData}
            selectedExploit={selectedExploit}
            setSelectedExploit={setSelectedExploit}
          />
        </Box>

        {/* Right side for preview */}
        <Box
          sx={{
            display: "flex",
            flex: 1,
            padding: 2,
            bgcolor: "#fff",
          }}
        >
          <PreviewSection
            formData={formData}
            selectedExploit={selectedExploit}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
