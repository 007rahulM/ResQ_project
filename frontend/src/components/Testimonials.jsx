const Testimonials = () => {
    const reviews = [
      {
        id: 1,
        content: "ResQ made it incredibly easy for our restaurant to donate surplus food instead of throwing it away. Highly recommended!",
        author: "Sarah Jenkins",
        role: "Restaurant Owner"
      },
      {
        id: 2,
        content: "As a volunteer at a local shelter, this app has been a lifesaver. We can find food donations nearby instantly.",
        author: "David Chen",
        role: "NGO Volunteer"
      },
      {
        id: 3,
        content: "The interface is so simple to use. I love knowing that my extra catering food is going to people who actually need it.",
        author: "Maria Rodriguez",
        role: "Catering Service"
      }
    ];
  
    return (
      <section className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-lg font-semibold leading-8 tracking-tight text-emerald-600">Testimonials</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Trusted by the Community
            </p>
          </div>
          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <div key={review.id} className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5 hover:shadow-md transition">
                  <blockquote className="text-gray-900 leading-7">
                    <p>"{review.content}"</p>
                  </blockquote>
                  <div className="mt-6 flex items-center gap-x-4 border-t border-gray-900/5 pt-4">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700">
                        {review.author[0]}
                    </div>
                    <div>
                      <div className="font-semibold">{review.author}</div>
                      <div className="text-sm leading-6 text-gray-600">{review.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Testimonials;