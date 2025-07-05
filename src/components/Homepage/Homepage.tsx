import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo2 from "../../assets/iou_transparent.png";
import { Wallet, Bell, CreditCard, Trophy, TrendingUp, TrendingDown, DollarSignIcon, Smile, Heart, ThumbsUp } from "lucide-react";
import danny from "../../assets/danny.jpeg"
import haotian from "../../assets/haotian.png"
import laurenb from "../../assets/laurenb.png"
import marcelo from "../../assets/marcelo.png"
import zamijah from "../../assets/zamijah.jpg"
import terris from "../../assets/terris.jpeg"
import new_dash from "../../assets/new_dash.png"


interface HomepageProps {
  onGetStarted: () => void;
}

export function Homepage({ onGetStarted }: HomepageProps) {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const sectionRefs = useRef<HTMLDivElement[]>([]);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!visibleSections.includes(index)) {
              setVisibleSections((prev) => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [visibleSections]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="relative py-16 px-4"
          style={{
            transform: `translateY(${scrollY * 0.6}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <div className="flex justify-center items-center mb-8">
            <img src={logo2} alt="Logo" className="h-500 w-auto" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center">
            Track IOUs with Friends,{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(to right, #34d0d3, #3fb2e9)",
              }}
            >
              Hassle-Free
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-center">
            Keep your friendships strong with clear, simple debt tracking.
          </p>
          <div className="flex flex-col justify-center items-center space-y-4">
            <button
              onClick={() => navigate("/signup")}
              className="text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:-translate-y-1 hover:shadow-lg"
              style={{
                background: "linear-gradient(to right, #34d0d3, #3fb2e9)",
              }}
            >
              Get Started
            </button>
            <div className="text-center">
              <span className="text-gray-600 text-med">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-middle-blue font-bold hover:underline"
                >
                  Log In
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureCard
          icon={<Wallet style={{ color: "#34d0d3" }} size={24} />}
          title="Easy Tracking"
          description="Keep track of all your IOUs in one place with a simple, intuitive interface."
        />
        <FeatureCard
          icon={<Bell style={{ color: "#3fb2e9" }} size={24} />}
          title="Reliability Scores"
          description="See how reliable your friends are with our reliability-based rating system."
        />
        <FeatureCard
          icon={<CreditCard style={{ color: "#434bab" }} size={24} />}
          title="Payment Reminders"
          description="Gentle payment reminders to keep everyone on track."
        />
        <FeatureCard
          icon={<Trophy style={{ color: "#34d0d3" }} size={24} />}
          title="Friends Leaderboard"
          description="Compete with your friends for the top spot on the leaderboard."
        />
      </div>

      <div className="bg-gray-50 rounded-xl shadow-md p-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    {/* Left Side: Big Title */}
    <div className="text-gray-900 font-extrabold leading-tight md:pl-24">
      <span className="text-6xl md:text-7xl block">What is</span>
      <span className="text-8xl md:text-9xl text-teal">IOU?</span>
    </div>

    {/* Right Side: Description */}
    <div className="text-gray-600 text-lg space-y-4">
      <p>
      IOU is a website that makes tracking money owed between friends simple and stress-free. 
      Whether you owe money or are owed money, IOU helps you keep track of transactions, set 
      repayment deadlines, and build a reliability score based on how quickly you settle debts. 
      It encourages timely payments, strengthens trust, and eliminates the awkwardness of money-related conversations, 
      all while making managing shared expenses easy and transparent.
      </p>
      
    </div>
  </div>
</div>




      {/* Karma System */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="text-center mb-8">
          <Trophy style={{ color: "#3fb2e9" }} className="mx-auto mb-4" size={40} />
          <h2 className="text-3xl font-bold mb-4">Reliability Score System</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
          IOU's reliability score rates users from 0% (least reliable) to 100% (most reliable) based on repayment timeliness, 
          balances, and debt history. A leaderboard highlights top scorers, promoting accountability and timely payments!
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-xl flex justify-center items-center p-4 border-8 border-darker-blue w-120 h-90">
            <img
              src={new_dash} // Replace with the actual path to your image
              alt="Dashboard"
              className="w-full h-full object-contain rounded-md"
            />
          </div>


          {/* Right Section */}
          <div className="flex flex-col space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">How the Dashboard Works</h2>
            <p className="text-gray-600 text-lg">
              The dashboard simplifies managing who owes what, helping you keep track of your payments, effortlessly.
            </p>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <TrendingUp className="text-green-500" size={32} />
                <p className="text-gray-600">Quickly pay back your friends for shared expenses.</p>
              </div>
              <div className="flex items-center space-x-4">
                <TrendingDown className="text-red-500" size={32} />
                <p className="text-gray-600">Track who owes you money and stay organized.</p>
              </div>
              <div className="flex items-center space-x-4">
                <Bell className="text-yellow-500" size={32} />
                <p className="text-gray-600">If its been a few days, send a reminder to friends to pay you.</p>
              </div>
              <div className="flex items-center space-x-4">
                <DollarSignIcon className="text-blue-500" size={32} />
                <p className="text-gray-600">Easily manage outstanding balances and stay debt-free.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-gray-50 rounded-xl shadow-md p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <ReviewBubble
            bgColor="bg-teal"
            text="I was finally able to get back the money Terris owed me 5 years ago!"
            user="Vee Denis"
          />
          <ReviewBubble
            bgColor="bg-middle-blue"
            text="As a financially illiterate individual, this app is absolutely wonderful. I highly recommend it!"
            user="Billy O'Naire
"
          />
          <ReviewBubble
            bgColor="bg-darker-blue"
            text="Thanks to IOU, I don’t have to go into the notes app everytime I want to track who owes me money!"
            user="Nicki Nichols"
          />
        </div>
      </div>
      
      
      
      {/* About Us Section */}
<div className="space-y-8">
  <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Meet the Team</h2>
  {[
    {
      name: "Daniel Kardhashi",
      location: "Hightstown, NJ",
      school: "Rice University",
      description: "I have a passion for software engineering, with a particular love for front-end development, and worked with React, TypeScript, Tailwind CSS, and other tools to help create the IOU website. One fun fact about me is that I currently competitively powerlift, but I used to do ballet!",
      img: danny,
    },
    {
      name: "Haotian Li",
      location: "Okemos, MI",
      school: "University of Michigan",
      description: "I love working with software and solutions that have real-world impacts. I thrive to ship products that improves everyone's day to day life, and that's exactly what we did with IOU. One fun fact about me is that I love to play the piano!",
      img: haotian,
    },
    {
      name: "Lauren Braswell",
      location: "Chicago, IL",
      school: "Northern Illinois University",
      description: " As a kid, I grew up surrounded by technology which influenced me to pursue Computer Science. I also strive to combine my creativity and love for art with CS, which is why I created wireframes and designs in Figma for the IOU website. A fun fact about me is that I have lived in over 7 different places!",
      img: laurenb,
    },
    {
      name: "Marcelo Perez Morales",
      location: "Mayaguez, PR",
      school: "University of Puerto Rico",
      description: "The ability to create and solve real-world problems in my own way is what inspired me to pursue software engineering. Brainstorming, designing, documenting, and bringing my ideas to life are what fuel my passion and drive as a software engineer, continuously pushing me to grow and improve in my field.",
      img: marcelo,
    },
    {
      name: "Zamijah Shakeur-Tompkins",
      location: "Camden, NJ",
      school: "Howard University",
      description: "I love working with software. Mention android, Linux, or cybersecurity around me, and my ears perk up like an elf! I came up with the idea for a lending app, but it was my amazing team who made the dream a reality. A couple fun facts about me is I started crocheting and coding as a child, and have been doing both since then!",
      img: zamijah,
    },
    // Add more team members as needed
  ].map((member, index) => (
          <div
        key={member.name}
        ref={(el) => (sectionRefs.current[index] = el!)}
        data-index={index}
        className={`flex bg-gray-50 p-6 rounded-xl shadow-md transition-transform ${
          visibleSections.includes(index) ? "opacity-100 translate-y-0 animate-fadeInUp" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Profile Picture */}
        <div className="w-32 h-32 flex-shrink-0 rounded-full overflow-hidden border-4 border-teal">
          <img
            src={member.img}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Centered Name, Location, and School */}
        <div className="flex flex-col justify-center items-center text-center mx-8 flex-none" style={{ width: "300px" }}>
          <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
          <p className="text-lg text-gray-500">{member.location}</p>
          <p className="text-lg text-gray-500">{member.school}</p>
        </div>

        {/* Description */}
        <div className="flex-grow text-gray-600 text-lg pl-10">
          <p>{member.description}</p>
        </div>
      </div>


  ))
  }
</div>



    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all transform hover:-translate-y-1">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function ReviewBubble({ bgColor, text, user }: { bgColor: string; text: string; user: string }) {
  return (
    <div className={`${bgColor} text-white rounded-xl p-8 text-center shadow-md space-y-4`}>
      <p className="text-lg">{text}</p>
      <h4 className="text-sm font-bold">{user}</h4>
    </div>
  );
}
