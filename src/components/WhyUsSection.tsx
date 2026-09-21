import { Reveal } from "./Reveal";
const benefits = [
  [
    "Your traffic. Your terms.",
    "Revenue share, CPA or a blend of both. We shape your agreement around how you acquire players, not the other way around.",
  ],
  [
    "Someone who picks up.",
    "A dedicated account manager who knows your business. From creatives to your next market, you have someone to call.",
  ],
  [
    "A fresh start every month.",
    "No negative carryover. A difficult month stays in that month, so you can keep your focus on what comes next.",
  ],
  [
    "Value that stays with you.",
    "Lifetime player tracking and transparent reporting. Build lasting revenue from the audience you worked hard to earn.",
  ],
];
export const WhyUsSection = () => (
  <section className="partnership section-space" id="why-us">
    <div className="shell partnership-grid">
      <div className="partnership-intro">
        <Reveal>
          <span className="eyebrow">01 / People before platforms</span>
          <h2>
            Big on ambition.
            <br />
            <span className="muted-heading">Personal by design.</span>
          </h2>
          <p>
            There’s a business behind every click. We take the time to
            understand yours.
          </p>
          <a className="text-link" href="#deals">
            Find your arrangement <span aria-hidden="true">↓</span>
          </a>
        </Reveal>
      </div>
      <div className="benefit-list">
        {benefits.map(([title, description], i) => (
          <Reveal key={title}>
            <article className="benefit-row">
              <span className="row-number">0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
