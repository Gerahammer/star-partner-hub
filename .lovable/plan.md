

# החלפת פונט הכותרות ל-Rubik Storm

## סקירה
נחליף את פונט **Orbitron** הנוכחי בפונט **Rubik Storm** מ-Google Fonts לכל הכותרות באתר.

## שינויים נדרשים

### 1. עדכון קובץ src/index.css
- שינוי ה-import של Google Fonts להכיל Rubik Storm במקום Orbitron
- עדכון ה-font-family בכללי h1-h6 ו-.font-display

### 2. עדכון קובץ tailwind.config.ts
- שינוי הגדרת `font-display` מ-Orbitron ל-Rubik Storm

## פרטים טכניים

```css
/* שורה 5 ב-index.css - שינוי ה-import */
@import url('https://fonts.googleapis.com/css2?family=Rubik+Storm&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

/* שורות 99-103 ב-index.css */
h1, h2, h3, h4, h5, h6, .font-display {
  font-family: 'Rubik Storm', cursive;
  letter-spacing: 0.02em;
  font-weight: 400; /* Rubik Storm מגיע במשקל אחד */
}
```

```typescript
// שורות 16-19 ב-tailwind.config.ts
fontFamily: {
  sans: ['Space Grotesk', 'sans-serif'],
  display: ['Rubik Storm', 'cursive'],
},
```

## הערות
- Rubik Storm הוא פונט דקורטיבי שמגיע במשקל אחד בלבד (400)
- יש לו סגנון דינמי עם קווים נוזליים שיתאים לעיצוב הזהב והיוקרתי של האתר
- כל הכותרות באתר (Hero, About, Brands, Deals וכו') יקבלו את הפונט החדש אוטומטית

