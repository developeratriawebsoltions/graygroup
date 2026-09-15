/**
 * Route transition wrapper. Deliberately CSS-only: the animation runs before
 * and without JavaScript, so page content is never hidden on slow hydration.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
