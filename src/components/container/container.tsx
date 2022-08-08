import styles from './container.module.css';

export type ContainerProps = {
  children: JSX.Element;
};

const Container = ({ children }: ContainerProps) => (
  <div className={styles.container}>{children}</div>
);

export default Container;
