export default function EventsBanner() {
  return (
    <div className="relative isolate overflow-hidden  bg-white ring-1 ring-gray-200/10">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-[100px] w-[100px] rounded-full bg-blue-200/30 blur-3xl"></div>
        <div className="absolute right-0 bottom-0 h-[150px] w-[150px] rounded-full bg-purple-200/30 blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-white/70"></div>
      </div>

      <div className="container mx-auto px-6 py-16 sm:py-24 lg:px-8 ">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Discover{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Events
              </span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600">
              Explore curated experiences and happenings in your community
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
