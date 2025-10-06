import React from 'react';

// Framework data
const frameworks = [
    { name: 'Vite', logo: 'https://vitejs.dev/logo.svg' },
    { name: 'React', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
    { name: 'HTML5', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg' },
    { name: 'CSS3', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg' },
    { name: 'JavaScript', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png' },
    { name: 'Bootstrap', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg' },
    { name: 'Tailwind CSS', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
    { name: 'Node.js', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg' },
    { name: 'Next.js', logo: 'https://cdn.worldvectorlogo.com/logos/next-js.svg' },
    { name: 'Python', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' },
    { name: 'Django', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Django_logo.svg' },
    { name: 'FastAPI', logo: 'https://cdn.worldvectorlogo.com/logos/fastapi.svg' },
    { name: 'SQL', logo: 'https://www.svgrepo.com/show/331760/sql-database-generic.svg' },
    { name: 'MongoDB', logo: 'https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg' },
    { name: 'Firebase', logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/firebase-studio-icon.png' },
    { name: 'Supabase', logo: 'https://cdn.prod.website-files.com/66842e04d18971242a294872/669e87d174d190a8ba60b861_supabase-TAiY.png' },
    { name: 'Postman', logo: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg' },
    { name: 'VS Code', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg' },
    { name: 'Chrome', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Chrome_icon_%28September_2014%29.svg' },
    { name: 'Google Ads', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Google_Ads_icon.svg' },
    { name: 'Gemini', logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png' },
    { name: 'Android', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg' }
];

export default function ServicesIcons() {
  return (
    <section className="relative min-h-full w-full flex items-center justify-center md:p-4 overflow-hidden transition-colors duration-500">
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-black sujoy md:mb-8 max-w-2xl">
          Useing your favorite frameworks and tools
        </h1>

        {/* Logos Grid */}
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto py-8">
          {frameworks.map((fw) => (
            <div
              key={fw.name}
              className="flex cursor-pointer w-18 h-18 md:w-22 md:h-22 items-center justify-center 
                        bg-white/5 border border-white/10 
                        rounded-xl backdrop-blur-md shadow-lg hover:shadow-orange-200 
                        transition-transform duration-300 hover:bg-white/10 hover:scale-110"
            >
              <img
                src={fw.logo}
                alt={`${fw.name} logo`}
                className="h-10 w-10 md:h-12 md:w-12 object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
