import "./styles/TechStackNew.css";

interface TechItem {
  name: string;
  mark: string;
  icon?: string;
  url: string;
}

// Only technologies listed in Samarth's resume are shown here.
const techStack: TechItem[][] = [
  [
    { name: "Python", mark: "Py", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", url: "https://www.python.org/" },
    { name: "C", mark: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", url: "https://en.cppreference.com/w/c" },
    { name: "C++", mark: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", url: "https://isocpp.org/" },
    { name: "SQL", mark: "SQL", url: "https://en.wikipedia.org/wiki/SQL" },
    { name: "React", mark: "Re", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", url: "https://react.dev/" },
    { name: "Node.js", mark: "N", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", url: "https://nodejs.org/" },
    { name: "FastAPI", mark: "Fa", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", url: "https://fastapi.tiangolo.com/" },
  ],
  [
    { name: "Flask", mark: "Fl", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", url: "https://flask.palletsprojects.com/" },
    { name: "PyTorch", mark: "Pt", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", url: "https://pytorch.org/" },
    { name: "YOLO", mark: "Y", url: "https://docs.ultralytics.com/" },
    { name: "GANs", mark: "G", url: "https://developers.google.com/machine-learning/gan" },
    { name: "OpenCV", mark: "Cv", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg", url: "https://opencv.org/" },
    { name: "FAISS", mark: "F", url: "https://github.com/facebookresearch/faiss" },
  ],
  [
    { name: "CLIP", mark: "Cl", url: "https://openai.com/index/clip/" },
    { name: "Pandas", mark: "Pd", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", url: "https://pandas.pydata.org/" },
    { name: "NumPy", mark: "Np", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", url: "https://numpy.org/" },
    { name: "Scikit-learn", mark: "Sk", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg", url: "https://scikit-learn.org/" },
    { name: "GCP", mark: "G", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", url: "https://cloud.google.com/" },
  ],
  [
    { name: "MongoDB", mark: "M", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", url: "https://www.mongodb.com/" },
    { name: "BigQuery", mark: "BQ", url: "https://cloud.google.com/bigquery" },
    { name: "Vertex AI", mark: "VA", url: "https://cloud.google.com/vertex-ai" },
    { name: "Git", mark: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", url: "https://git-scm.com/" },
  ],
];

const TechStackNew = () => (
  <div className="techstack-new">
    <div className="techstack-video-container" aria-hidden="true">
      <video autoPlay loop muted playsInline className="techstack-video">
        <source src="/video/video.webm" type="video/webm" />
      </video>
      <div className="techstack-overlay" />
    </div>
    <div className="techstack-content">
      <h2>Tech Stack</h2>
      <div className="techstack-pyramid">
        {techStack.map((row, rowIndex) => (
          <div key={rowIndex} className="techstack-row">
            {row.map((tech) => (
              <a
                key={tech.name}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="techstack-item"
                title={tech.name}
                data-cursor="disable"
              >
                {tech.icon ? (
                  <img src={tech.icon} alt="" loading="lazy" decoding="async" />
                ) : (
                  <span className="techstack-mark" aria-hidden="true">{tech.mark}</span>
                )}
                <span>{tech.name}</span>
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default TechStackNew;
