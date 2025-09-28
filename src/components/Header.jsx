import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { removeUser, addUser } from '../utils/userSlice'
import { toggleGptSearchView } from '../utils/gptSlice'
import { changeLanguage } from '../utils/configSlice'


const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const showGPTSearch = useSelector((store) => store.gpt.showGptSearch);
  const langKey = useSelector((store) => store.config.lang);

  const handlesignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        navigate('/error')
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGPTSearchClick = () => {
    // Toggle GPT Search button
    dispatch(toggleGptSearchView())
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-full flex flex-col gap-2 md:flex-row justify-center md:justify-between items-center py-5 px-15 bg-gradient-to-b from-black z-50">
      {/* Logo */}
      <img
        className="w-44"
        src={LOGO}
        alt="logo"
      />

      {/* Right Section */}
      {user && (
        <div className="flex items-center space-x-4">
          <button className="bg-purple-700 text-white font-bold px-4 py-1 rounded hover:bg-purple-800"
            onClick={handleGPTSearchClick}>
              {showGPTSearch ? "HomePage" : "GPT Search"}
          </button>

          {/* Language Dropdown */}
          {showGPTSearch && (
            <select
              className="bg-black text-white border border-gray-500 px-2 py-1 rounded"
              onChange={handleLanguageChange}
              value={langKey}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>

          )
          }

          {/* Sign Out Button */}
          <button className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700" onClick={handlesignOut}>
            Sign Out
          </button>
        </div>
      )
      }
    </div>
  );
};

export default Header;
