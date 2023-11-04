export default function BlogIntro({ heading, subHeading, description,
linkToBlog, imageLink }) {
  return (
    <div className="m-2 p-2 border-2 border-b-slate-500 rounded-lg">
      <a href={linkToBlog}>
        <div className="md:flex md:justify-between">
        <div class="md:w-[70%]">
          <div className="text-2xl font-bold">
            {heading}
          </div>
          <div className="text-xl font-medium">
            {subHeading}
          </div>
          <div>
            {description}
          </div>
          </div>
          <div class="md:w-64">
            <img src={imageLink} alt="Blog Thumbnail" />
          </div>
        </div>
      </a>
    </div>
  );
}
