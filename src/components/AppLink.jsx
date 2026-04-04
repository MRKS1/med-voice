function isModifiedEvent(event) {
  return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}

export default function AppLink({ href, className, children, onNavigate, ...rest }) {
  function handleClick(event) {
    if (
      event.defaultPrevented ||
      isModifiedEvent(event) ||
      event.button !== 0 ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')
    ) {
      return;
    }

    event.preventDefault();
    onNavigate(href);
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
