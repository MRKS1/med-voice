export default function BrandLogo({ className = '', alt = 'MedVoice logo' }) {
  const classes = ['brand-logo', className].filter(Boolean).join(' ');

  return <img className={classes} src="/medvoice-logo.png" alt={alt} />;
}
