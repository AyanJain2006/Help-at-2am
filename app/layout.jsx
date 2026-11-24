
import "./globals.css";
import { EmergencyProvider } from "./context/EmergencyContext";

export const metadata = {
  title: "Help at 2 A.M. | Campus Emergency Assistance",
  description:
    "A simulation-only campus emergency assistance and location communication platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <EmergencyProvider>
          {children}
        </EmergencyProvider>
      </body>
    </html>
  );
}
