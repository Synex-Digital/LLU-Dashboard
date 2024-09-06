const Image = ({ src, className, onClick, width, alt }) => {
  return <img onClick={onClick} alt={alt} className={className} src={src} />;
};

export default Image;
