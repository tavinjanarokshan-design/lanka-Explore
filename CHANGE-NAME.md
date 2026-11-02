# Where to add your name and GitHub username

සිංහල උපදෙස් සඳහා `CHANGE-NAME-SINHALA.md` බලන්න. / For Sinhala instructions, see `CHANGE-NAME-SINHALA.md`.

Current identity values in this package:

| Field | Current value |
|---|---|
| Student name | **ROKSHAN TAVINJANA** |
| GitHub username | `tavinjanarokshan-design` |
| GitHub profile display name | **ROKSHAN TAVINJANA UDUGAMASOORIYA** |
| Student ID | Add in `STUDENT-DETAILS.txt` if your lecturer requires it |

These values appear in page footers, About pages, weekly READMEs, reflections, `README.md`, `START-HERE.html`, `Hosted Link.txt`, `STUDENT-DETAILS.txt`, GitHub URLs, `git-log.txt`, `prepare-github-repo.sh`, `GITHUB-SETUP.md` and `HOSTING-NOTES.md`. Use the GitHub username only in URLs, not the full `https://github.com/...` address.

## Easiest: one command

From inside this submission folder, run:

```bash
python3 set-name.py "<FULL NAME>" <GITHUB_USERNAME>
```

Example:

```bash
python3 set-name.py "Asha Perera" asha-perera
```

The script replaces the current name and username in every relevant text file under `Week01/`–`Week05/` and the root. It deliberately skips this guide, the Sinhala guide and itself so the instructions stay readable. Use the GitHub username only, not the full `https://github.com/...` URL.

## Main files if you edit manually

- `STUDENT-DETAILS.txt` — full name, student ID, GitHub username.
- `README.md`, `START-HERE.html`, `Hosted Link.txt`, `hosted-link.txt` — cover page and required Notepad hosted-link file.
- `GITHUB-SETUP.md`, `HOSTING-NOTES.md`, `git-log.txt`, `prepare-github-repo.sh` — GitHub links and local commit history.
- `Week01/` … `Week05/` — `README.md`, `about.html`, `index.html`, `destinations.html`, `details.html`, `trip.html`, `hosted-link.txt`.
- `INDIVIDUAL-REFLECTION.md` and `Week05/INDIVIDUAL-REFLECTION.md` — reflection author.

Manual editing is error-prone; the one-command script is safer.

## After changing

1. Add your student ID to `STUDENT-DETAILS.txt` if your lecturer requires it.
2. If the GitHub username changed, regenerate the five-commit history with the correct remote:
   `./prepare-github-repo.sh <GITHUB_USERNAME> lanka-explorer "<FULL NAME>"`
3. Re-zip the folder as `LankaExplorer_Final.zip`.
4. To create a real GitHub repository and Pages URL, push that prepared repository and enable the included workflow. This script does **not** connect to GitHub or push anything.
5. The public hosted site <https://my-1e9c9ig3oq.brewpage.app/> does not need changing; only the GitHub links do.

If you need to change these values, send me the new full name and GitHub username; I can run the replacement, regenerate `git-log.txt`, and rebuild the ZIP for you.
