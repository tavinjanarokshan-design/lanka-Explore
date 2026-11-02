# GitHub and GitHub Pages setup

The submission is **push-ready**: it contains a five-commit repository builder, a GitHub Actions Pages workflow and visible GitHub links in the site footer and About page. The repository URLs are already set to `tavinjanarokshan-design`; if you change accounts, run `python3 set-name.py "<FULL NAME>" <GITHUB_USERNAME>` first.

## 1. Create the local repository with weekly history

From this submission folder, run:

```bash
./prepare-github-repo.sh tavinjanarokshan-design
```

This creates `../lanka-explorer-git` and makes one commit per week:

1. Week 01 — semantic HTML and destination data
2. Week 02 — responsive CSS and mobile menu
3. Week 03 — dynamic cards, search and validation
4. Week 04 — weather, currency and maps
5. Week 05 — final trip planner, dark mode and polish

The script also sets `origin` to `https://github.com/tavinjanarokshan-design/lanka-explorer.git`.

## 2. Create the repository on GitHub

1. Go to <https://github.com/new>.
2. Name it `lanka-explorer`, choose **Public**, and do **not** add a README, licence or `.gitignore` (the local repo already has everything).
3. Copy the repository URL shown by GitHub. If it differs from the default, run:

```bash
git -C ../lanka-explorer-git remote set-url origin <your-repository-url>
```

## 3. Push

```bash
git -C ../lanka-explorer-git branch -M main
git -C ../lanka-explorer-git push -u origin main
```

Arena cannot push without GitHub authentication, so these two commands are the only steps that need your signed-in GitHub account.

## 4. Publish with GitHub Pages

The included `.github/workflows/deploy.yml` deploys the `Week05` folder as a static Pages site. In your repository:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions**.
3. Select the **Deploy static site to GitHub Pages** workflow, or push again to trigger it.
4. After the green workflow run, open <%%GITHUB_PAGES_URL%>.

If you prefer to upload only the final site, create the repository from the **contents of `Week05/`** instead; the `Week05/.github/workflows/deploy.yml` workflow uses `path: .` and works in that layout too.

## Live links in this submission

- Public hosted site (shareable now, valid until 2 December 2026): <https://my-1e9c9ig3oq.brewpage.app/>
- Arena live preview: <https://8000-ievlemzkk36tsxm86z7uh.e2b.app/>
- Permanent GitHub Pages URL after push: <https://tavinjanarokshan-design.github.io/lanka-explorer/>
- Repository: <https://github.com/tavinjanarokshan-design/lanka-explorer>

The public hosted site is a static deployment of `Week05/` and works immediately; it shows a small free-host badge and expires on 2 December 2026. The Arena preview is live while this workspace is running. Push the included repository and enable GitHub Pages for a permanent link suitable for your CV and final demo.
