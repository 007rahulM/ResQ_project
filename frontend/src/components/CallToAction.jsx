import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="bg-emerald-700">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to make a difference?
            <br />
            Start donating today.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-emerald-100">
            Join thousands of donors and volunteers who are fighting hunger and reducing food waste in your city.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/login"
              className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-emerald-600 shadow-sm hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get started for free
            </Link>
            <Link to="/about" className="text-sm font-semibold leading-6 text-white hover:text-emerald-100">
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;