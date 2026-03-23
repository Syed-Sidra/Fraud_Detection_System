# FraudShield — Angular 19 + PrimeNG Credit Card Fraud Detection UI

## Quick Start

```bash
npm install --legacy-peer-deps
npm start
# → http://localhost:4200
```

## Login (Dummy Auth)
Any email/password works. Pre-filled: admin@fraudshield.com / password123

## Pages
| Route | Page |
|---|---|
| /auth/login | Login (any credentials → dashboard) |
| /auth/signup | Signup (create account → dashboard) |
| /app/dashboard | Fraud detection dashboard |
| /app/transactions | Transaction table with filters |
| /app/analytics | Charts & trend analysis |
| /app/simulation | Scenario simulation engine |

## Tech Stack
- Angular 19 (standalone components + signals)
- PrimeNG 17 (Table, Chart, Dialog, Dropdown, Slider, Toast)
- PrimeFlex + Font Awesome 6
- Plus Jakarta Sans + JetBrains Mono fonts
- Chart.js (Line, Bar, Horizontal Bar, Doughnut, Radar, Polar)
- Spring Boot API at http://localhost:8080 (graceful mock fallback)

## Backend CORS (Spring Boot)
```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:4200")
            .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
            .allowedHeaders("*");
    }
}
```
