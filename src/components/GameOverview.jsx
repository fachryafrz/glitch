import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import gfm from "remark-gfm";

export default function GameOverview({ game }) {
  return (
    <div className={`py-8 grid grid-cols-[1fr_1fr_2px_1fr] gap-8`}>
      {/* Left */}
      <div className={`col-span-2 flex flex-col gap-8`}>
        <section className={`flex flex-col gap-4`}>
          <h2 className={`text-4xl font-bold`}>About the game</h2>
          <div
            className={`prose prose-invert max-w-none`}
            dangerouslySetInnerHTML={{ __html: game.description }}
          ></div>
        </section>

        <section className={`flex flex-col gap-4`}>
          <h2 className={`text-4xl font-bold`}>System Requirements</h2>
          <div className={`prose prose-invert max-w-none`}>
            <ReactMarkdown remarkPlugins={[gfm]}>
              {
                game.platforms.find((platform) => platform.requirements)
                  .requirements.minimum
              }
            </ReactMarkdown>
          </div>
        </section>
      </div>

      {/* Border */}
      <span className={`border-r border-white border-opacity-10`}></span>

      {/* Right */}
      <div className={``}>GameOverview</div>
    </div>
  );
}
