const Observer = (root, node, cb) => {
    const observer = new IntersectionObserver(cb, {root, threshold: 0.7});
    observer.observe(node);
}

export default Observer;
