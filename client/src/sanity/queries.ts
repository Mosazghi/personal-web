import { client } from "./lib/client";

function blocksToPlainText(blocks: any[] | undefined) {
    if (!blocks) return "";
    return blocks
        .map((blk) => (blk.children || []).map((c: any) => c.text || "").join(""))
        .filter(Boolean)
        .join("\n\n");
}

function blocksToHTML(blocks: any[] | undefined) {
    if (!blocks) return "";
    return blocks
        .map((blk) => {
            const text = (blk.children || []).map((c: any) => c.text || "").join("");
            return `<p>${text}</p>`;
        })
        .join("");
}

export async function getHero() {
    const data = await client.fetch('*[_type == "heroSettings"][0]{titles, name}');
    return data || { titles: [], name: "" };
}

export async function getAbout() {
    const data = await client.fetch('*[_type == "about"][0]{content}');
    return data ? blocksToHTML(data.content) : "";
}

export async function getExperiences() {
    const data = await client.fetch(
        '*[_type == "experience"]|order(order asc){period,title,company,description,technologies}'
    );
    return (data || []).map((d: any) => ({
        period: d.period,
        title: d.title,
        company: d.company,
        description: blocksToPlainText(d.description),
        technologies: d.technologies || [],
    }));
}

export async function getEducations() {
    const data = await client.fetch(
        '*[_type == "education"]|order(order asc){period,title,institution,description,technologies}'
    );
    return (data || []).map((d: any) => ({
        period: d.period,
        title: d.title,
        company: d.institution,
        description: blocksToPlainText(d.description),
        technologies: d.technologies || [],
    }));
}

export async function getSkills() {
    const data = await client.fetch('*[_type == "skills"][0]{items}');
    const items = (data && data.items) || [];
    return items.map((s: any) => ({ name: s.name }));
}

export async function getProjects() {
    const data = await client.fetch(
        '*[_type == "project"] | order(startDate desc){name,slug,description,showcaseLinkGif,showcaseLinkMp4,repositoryLink,previewLink,techStack,startDate,endDate}'
    );
    return (data || []).map((p: any) => ({
        name: p.name,
        description: blocksToPlainText(p.description),
        showcaseLinkGif: p.showcaseLinkGif || "",
        showcaseLinkMp4: p.showcaseLinkMp4 || "",
        repositoryLink: p.repositoryLink || "",
        previewLink: p.previewLink || "",
        techStack: p.techStack || [],
        startDate: p.startDate || "",
        endDate: p.endDate || "",
    }));
}
