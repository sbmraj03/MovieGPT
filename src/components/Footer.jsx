import linkedinIcon from '../assets/icons/linkedin.png';
import githubIcon from '../assets/icons/github.png';
import portfolioIcon from '../assets/icons/portfolio.png';

const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-b from-gray-900 to-black text-gray-300 py-10 mt-15 border-t border-gray-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    
                    {/* Left - Brand / App Info */}
                    <div className="text-center md:text-left space-y-2">
                        <h3 className="text-red-600 text-3xl font-extrabold tracking-wider">
                            MovieGPT
                        </h3>
                        <p className="text-sm text-gray-400 font-medium">
                            Your AI-Powered Movie Experience
                        </p>
                        <p className="text-xs text-gray-500">
                            © 2025 All rights reserved.
                        </p>
                    </div>

                    {/* Middle - Developer Info */}
                    <div className="text-center space-y-3">
                        <div className="space-y-2">
                            <p className="text-lg text-gray-200">
                                Developed by{" "}
                                <span className="text-white font-semibold hover:text-red-500 transition-colors duration-300">
                                    Shubham Kumar
                                </span>
                            </p>
                            <p className="text-sm text-gray-400">
                                Built with{" "}
                                <span className="text-red-500 font-medium">React</span> &{" "}
                                <span className="text-blue-400 font-medium">Tailwind CSS</span>
                            </p>
                        </div>
                    </div>

                    {/* Right - Social Links */}
                    <div className="flex justify-center md:justify-end gap-4">
                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/shubham-kumar-080852248/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-800/80 rounded-lg hover:bg-[#0077b5] transition-all duration-300 hover:scale-110 shadow-lg group"
                            title="LinkedIn"
                        >
                            <img 
                                src={linkedinIcon} 
                                alt="LinkedIn" 
                                className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                        </a>

                        {/* GitHub */}
                        <a
                            href="https://github.com/sbmraj03/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-800/80 rounded-lg hover:bg-[#333] transition-all duration-300 hover:scale-110 shadow-lg group"
                            title="GitHub"
                        >
                            <img 
                                src={githubIcon} 
                                alt="GitHub" 
                                className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                        </a>

                        {/* Portfolio */}
                        <a
                            href="https://personal-portfolio-sbmraj03.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-800/80 rounded-lg hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-110 shadow-lg group"
                            title="Portfolio"
                        >
                            <img 
                                src={portfolioIcon}
                                alt="Portfolio" 
                                className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
