export const isValidLink = (link) => {
  const gitLinkRegex =
    /^(([A-Za-z0-9]+@|http(|s)\:\/\/)|(http(|s)\:\/\/[A-Za-z0-9]+@))([A-Za-z0-9.]+(:\d+)?)(?::|\/)([\d\/\w.-]+?)(\.git){1}$/i;
  return gitLinkRegex.test(link.toLowerCase());
};
