# ඔබේ නම සහ GitHub පරිශීලක නාමය වෙනස් කරන්නේ කොහෙද?

දැනට මේ පැකේජයේ ඔබේ විස්තර මෙහෙම දාලා තියෙනවා:

| ක්ෂේත්‍රය | දැන් තියෙන අගය |
|---|---|
| ශිෂ්‍ය නම | **ROKSHAN TAVINJANA** |
| GitHub username | `tavinjanarokshan-design` |
| GitHub profile එකේ පෙන්වන නම | **ROKSHAN TAVINJANA UDUGAMASOORIYA** |
| ශිෂ්‍ය අංකය | අවශ්‍ය නම් `STUDENT-DETAILS.txt` හි දාන්න |

මේවා පිටු footer, About පිටු, සතියේ README ලිපි, සමාලෝචන, `README.md`, `START-HERE.html`, `Hosted Link.txt`, `STUDENT-DETAILS.txt`, GitHub URLs, `git-log.txt`, `prepare-github-repo.sh`, `GITHUB-SETUP.md` සහ `HOSTING-NOTES.md` වල තියෙනවා. URL වලට දාන්නේ GitHub username එක විතරයි; සම්පූර්ණ `https://github.com/...` ලිපිනය නෙවෙයි.

## ලේසිම ක්‍රමය: එක command එකක්

`LankaExplorer_Final_Submission/` ෆෝල්ඩරය ඇතුළේ ඉඳන් මෙය run කරන්න:

```bash
python3 set-name.py "ඔබේ සම්පූර්ණ නම" your-github-username
```

උදාහරණය:

```bash
python3 set-name.py "Asha Perera" asha-perera
```

මෙයින් දැන් තියෙන නම සහ GitHub username එක, `Week01/`–`Week05/` සහ root එකේ අදාළ සියලුම text files වල අලුත් අගයන්ගෙන් වෙනස් වෙනවා. Script එක `CHANGE-NAME.md`, `CHANGE-NAME-SINHALA.md` සහ තමන්වම skip කරනවා, ඒ නිසා උපදෙස් නරක් වෙන්නේ නැහැ. GitHub username එක විතරක් දෙන්න; සම්පූර්ණ `https://github.com/...` URL එක දෙන්න එපා.

## අතින් වෙනස් කරනවා නම් ප්‍රධාන ලිපි

- `STUDENT-DETAILS.txt` — සම්පූර්ණ නම, ශිෂ්‍ය අංකය, GitHub username.
- `README.md`, `START-HERE.html`, `Hosted Link.txt`, `hosted-link.txt` — cover page එකයි, අවශ්‍ය Notepad hosted-link ලිපියයි.
- `GITHUB-SETUP.md`, `HOSTING-NOTES.md`, `git-log.txt`, `prepare-github-repo.sh` — GitHub links සහ local commit history.
- `Week01/` … `Week05/` — `README.md`, `about.html`, `index.html`, `destinations.html`, `details.html`, `trip.html`, `hosted-link.txt`.
- `INDIVIDUAL-REFLECTION.md` සහ `Week05/INDIVIDUAL-REFLECTION.md` — සමාලෝචනයේ කර්තෘ.

අතින් කරන එකේ වැරදි වෙන්න පුළුවන් නිසා script එක පාවිච්චි කරන එක ආරක්ෂිතයි.

## වෙනස් කළාට පස්සේ

1. අවශ්‍ය නම් `STUDENT-DETAILS.txt` හි ශිෂ්‍ය අංකය දාන්න.
2. GitHub username එක වෙනස් වුණා නම් commit history එක අලුත් කරන්න:
   `./prepare-github-repo.sh <GITHUB_USERNAME> lanka-explorer "<FULL NAME>"`
3. ෆෝල්ඩරය ආයෙත් `LankaExplorer_Final.zip` ලෙස zip කරන්න.
4. සැබෑ GitHub repo එකක් සහ Pages URL එකක් හදන්න නම්, ඒ සූදානම් කළ repo එක push කරලා ඇතුළත් workflow එක enable කරන්න. මේ script එක GitHub එක්ක connect වෙන්නෙත් නැහැ, push කරන්නෙත් නැහැ.
5. Public hosted link එක <https://my-1e9c9ig3oq.brewpage.app/> වෙනස් කරන්න ඕනේ නැහැ; වෙනස් වෙන්නේ GitHub links විතරයි.

මේ අගයන් වෙනස් කරන්න ඕනේ නම් අලුත් නම සහ GitHub username එක මට එව්වොත්, මම සියල්ල යාවත්කාලීන කරලා `git-log.txt` අලුත් කරලා ZIP එකත් ආයෙත් හදලා දෙන්නම්.
