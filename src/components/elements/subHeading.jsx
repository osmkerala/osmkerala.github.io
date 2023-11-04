export default function SubHeadingComponent(heading) {
  return (
    <div class="flex ml-8 m-2 underline underline-offset-2 p-2">
      <div class="text-[#2b2b2b] text-3xl font-semibold ">
        <p>{heading}</p>
      </div>
    </div>
  );
}
