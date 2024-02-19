import CheckinForm from "~/app/_components/CheckinForm";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="container flex flex-col items-center space-y-10">
      <CheckinForm />
    </div>
  );
}
