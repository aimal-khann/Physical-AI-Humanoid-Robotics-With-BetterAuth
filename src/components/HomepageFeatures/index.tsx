import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  description: JSX.Element;
  to: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Module 1: The Robotic Nervous System (ROS 2)',
    to: '/docs/ros2',
    description: (
      <>
        Explore the Robot Operating System (ROS 2), the communication backbone for modern robotics, and learn how to build modular and scalable robot applications.
      </>
    ),
  },
  {
    title: 'Module 2: Simulation Environments (Gazebo & Unity)',
    to: '/docs/gazebo-unity',
    description: (
      <>
        Master the art of robot simulation with Gazebo and Unity, allowing for rapid prototyping, testing, and validation of robotic systems in virtual worlds.
      </>
    ),
  },
  {
    title: 'Module 3: NVIDIA Isaac Ecosystem',
    to: '/docs/isaac',
    description: (
      <>
        Dive into NVIDIA's Isaac platform for AI-powered robotics, from synthetic data generation with Isaac Replicator to advanced simulation in Isaac Sim.
      </>
    ),
  },
  {
    title: 'Module 4: Vision Language Models (VLMs)',
    to: '/docs/vla',
    description: (
      <>
        Bridge the gap between language and vision by understanding and implementing Vision Language Models for tasks like object recognition and scene understanding.
      </>
    ),
  },
  {
    title: 'Module 5: Capstone Project',
    to: '/docs/capstone',
    description: (
      <>
        Apply your knowledge in a comprehensive capstone project, where you'll design, build, and deploy a complete humanoid robotics system.
      </>
    ),
  },
  {
    title: 'Module 6: References',
    to: '/docs/references',
    description: (
      <>
        A curated list of references and further reading to continue your journey into the exciting world of Physical AI and Humanoid Robotics.
      </>
    ),
  },
];

function Feature({title, description, to}: FeatureItem) {
  return (
    <div className={clsx('col col--4', 'text--center', styles.feature)}>
      <div className="card">
        <div className="card__header">
          <h3>{title}</h3>
        </div>
        <div className="card__body">
          <p>{description}</p>
        </div>
        <div className={clsx('card__footer', styles.readMoreBtn)}>
          <Link
            className="button button--primary button--block"
            to={to}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}