import React from "react";

/**
 * Renders stories with a 'play' function with an icon prefix. All other items are unaffected.
 */
const renderLabel = (item) => {
    const isStory = item.type === 'story';
    const hasPlayFn = item.tags?.includes('play-fn') ?? false;
    const isInteractive = isStory && hasPlayFn;
    if (!isInteractive) {
        return item.name;
    }
    return (
        <span title={item.name + ' (interactive)'} className="interactive-story-label">
            {item.name}
        </span>
    );
};

export default renderLabel;