import "./styles/Career.css";
import { config } from "../config";

const getDisplayYear = (period: string) => {
  if (period.includes("Present")) return "NOW";
  if (period.includes(" - ")) {
    return period.split(" - ")[0]; // Show start year for ranges
  }
  return period; // Single year like "2021"
};

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {config.experiences.map((exp, index) => (
            <div key={index} className="career-info-box">
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{exp.position}</h4>
                  <h5>{exp.company}</h5>
                  <p className="career-period">{exp.period}</p>
                </div>
                <h3>{getDisplayYear(exp.period)}</h3>
              </div>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
        <section className="career-achievements" aria-labelledby="achievement-title">
          <h3 id="achievement-title">Achievements & rankings</h3>
          <div className="career-achievement-grid">
            {config.achievements.map((achievement) => (
              <article className="career-achievement" key={`${achievement.title}-${achievement.event}`}>
                <span>{achievement.event}</span>
                <h4>{achievement.title}</h4>
                <p>{achievement.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Career;
