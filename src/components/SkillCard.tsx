import { Link } from "@tanstack/react-router";
import { ArrowBigDown, ArrowBigUp, Bookmark, Copy, MessageSquare } from "lucide-react";
import { type JSX, useState } from "react";
import {
	FaAws,
	FaBolt,
	FaCheck,
	FaCopy,
	FaDatabase,
	FaDocker,
	FaGitAlt,
	FaJsSquare,
	FaNode,
	FaPython,
	FaReact,
	FaServer,
} from "react-icons/fa";
import { SiPostgresql, SiTypescript, SiVite } from "react-icons/si";

const getCategoryIcon = (category: string) => {
	const iconMap: Record<string, JSX.Element> = {
		Frontend: <FaReact title="Frontend" />,
		Backend: <FaNode title="Backend" />,
		Database: <FaDatabase title="Database" />,
	};
	return iconMap[category] || <FaServer title={category} />;
};

const getTagIcon = (tag: string) => {
	const tagMap: Record<string, JSX.Element> = {
		react: <FaReact title={tag} />,
		javascript: <FaJsSquare title={tag} />,
		typescript: <SiTypescript title={tag} />,
		nodejs: <FaNode title={tag} />,
		python: <FaPython title={tag} />,
		database: <FaDatabase title={tag} />,
		sql: <SiPostgresql title={tag} />,
		docker: <FaDocker title={tag} />,
		git: <FaGitAlt title={tag} />,
		performance: <FaBolt title={tag} />,
		api: <FaServer title={tag} />,
		rest: <FaServer title={tag} />,
		optimization: <FaBolt title={tag} />,
	};
	return tagMap[tag] || <FaBolt title={tag} />;
};

const SkillCard = ({ skill }: { skill: SkillRecord }) => {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopyCommand = async () => {
		try {
			await navigator.clipboard.writeText(skill.installCommand);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	return (
		<article className="skill-card">
			<Link
				to="/"
				tabIndex={-1}
				aria-label={`View details for ${skill.title}`}
				className="overlay"
			/>

			<div className="chrome">
				<div className="chrome-bar">
					<div className="lights">
						<div className="light red" />
						<div className="light amber" />
						<div className="light green" />
					</div>

					<div className="host">regisrtry.sh</div>
				</div>
			</div>

			<div className="body">
				<div className="meta">
					<div className="author">
						<div className="avatar tech-logo">
							{getCategoryIcon(skill.category)}
						</div>
						<div className="author-copy">
							<p>{skill.authorEmail.split("@")[0]}</p>
							<p>
								Published on {new Date(skill.createdAt).toLocaleDateString()}
							</p>
						</div>
					</div>

					<p className="category">{skill.category}</p>
				</div>

				<div className="summary">
					<Link to="/" className="title-link">
						<h3 className="title">{skill.title}</h3>
					</Link>

					<p className="description">{skill.description}</p>
				</div>

				<div className="command">
					<div className="command-copy">
						<span>{">_"}</span>
						<p>{skill.installCommand}</p>
					</div>{" "}
					<button
						type="button"
						className="copy"
						onClick={handleCopyCommand}
						title={isCopied ? "Copied!" : "Copy command"}
					>
						{isCopied ? <FaCheck size={14} /> : <FaCopy size={14} />}
					</button>{" "}
				</div>

				<div className="footer">
					<div className="stats">
						<button type="button" className="upvote" disabled>
							<ArrowBigUp size={16} fill="currentColor" />
							<span>0</span>
						</button>

						<div className="comments">
							<MessageSquare size={14} />
							<span>{skill.authorEmail ? 1 : 0}</span>
						</div>
					</div>

					<div className="actions">
						<Link to="/" className="open" title={`Open ${skill.title}`}>
							<span>Open</span>
							<ArrowBigDown size={14} />
						</Link>

                        <button
                            type="button"
                            className="save"
                            aria-label={`Save ${skill.title} to favorites`}
                            disabled
                        >
                            <Bookmark size={16} />
                        </button>
					</div>
				</div>
			</div>
		</article>
	);
};

export default SkillCard;
