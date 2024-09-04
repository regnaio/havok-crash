true&&(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
}());

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);
new BABYLON.HemisphericLight("", new BABYLON.Vector3(0, 100, 0), scene);
new BABYLON.ArcRotateCamera("", 0, Math.PI * 3 / 8, 50, new BABYLON.Vector3(), scene);
engine.runRenderLoop(() => {
  scene.render();
});
window.addEventListener("resize", () => {
  engine.resize();
});
(async (wasmPath) => {
  try {
    globalThis.HK = await HavokPhysics(
      wasmPath === void 0 ? void 0 : { locateFile: () => wasmPath }
    );
  } catch (err) {
    console.error("catch: err:", err);
  }
  scene.enablePhysics(void 0, new BABYLON.HavokPlugin());
  BABYLON.CreateGroundFromHeightMap("", "/static/heightmap.jpeg", {
    width: 100,
    height: 100,
    subdivisions: 100,
    maxHeight: 10,
    onReady(mesh, heightBuffer) {
      mesh.heightBuffer = heightBuffer;
      new BABYLON.PhysicsAggregate(
        mesh,
        BABYLON.PhysicsShapeType.HEIGHTFIELD,
        {
          mass: 0,
          restitution: 0.5,
          // @ts-expect-error
          groundMesh: mesh
        },
        scene
      );
      const boxMesh = BABYLON.MeshBuilder.CreateBox("", { width: 1, height: 2, depth: 4 });
      boxMesh.position.set(0, 20, 0);
      new BABYLON.PhysicsAggregate(boxMesh, BABYLON.PhysicsShapeType.BOX, { mass: 1, restitution: 0.5 });
    },
    passHeightBufferInCallback: true
  });
})();
