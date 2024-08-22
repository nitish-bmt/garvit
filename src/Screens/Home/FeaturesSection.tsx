import React from "react";

const FeaturesSection: React.FC = () => (
  <section style={styles.container}>
    <h2 style={styles.title}>
      Simple yet, <span style={styles.highlight}>Powerful Features</span>.
    </h2>
    <div style={styles.features}>
      <div style={styles.featureCard}>
        <h3>Secure Sign In</h3>
        <p>Ensure your data is secure with our robust authentication system.</p>
      </div>
      <div style={styles.featureCard}>
        <h3>Detailed Reports</h3>
        <p>
          Generate detailed financial reports to track your spending patterns.
        </p>
      </div>
    </div>
  </section>
);

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "2rem",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  highlight: {
    color: "orange",
  },
  features: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    marginTop: "2rem",
  },
  featureCard: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    textAlign: "center",
    width: "300px",
  },
};

export default FeaturesSection;
