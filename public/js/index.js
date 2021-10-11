(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('three')) :
    typeof define === 'function' && define.amd ? define(['three'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE));
})(this, (function (THREE) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var THREE__namespace = /*#__PURE__*/_interopNamespace(THREE);

    class ResLoader {
      constructor() {
        this.reset();
      }

      reset() {
        clearInterval(this.interval), this.loadInfo = {}, this.assets = {};
      }

      load(t, e) {
        return this.reset(), this.progressCallback = e, new Promise(e => {
          if (!t.length) return void e(null);
          const n = [];
          t.forEach(t => {
            "[object Array]" !== Object.prototype.toString.call(t.url) && (t.url.indexOf(".png") > -1 || t.url.indexOf(".jpg") > -1 || t.url.indexOf(".jpeg") > -1 || t.url.indexOf(".gif") > -1 ? (this.assets.textures = this.assets.textures || {}, n.push(this.loadTexture(t))) : t.url.indexOf(".json") > -1 && 0 === t.type && (this.assets.data = this.assets.data || {}, n.push(this.loadData(t))));
          }), this.interval = setInterval(this.update, 1e3 / 30), Promise.all(n).then(() => {
            e({
              assets: this.assets,
              loader: this
            });
          });
        });
      }

      loadData(t) {
        this.loadInfo[t.id] = {
          loaded: 0,
          total: 0
        };
        const e = new XMLHttpRequest();
        let n = !1;
        return new Promise((i, r) => {
          const s = () => {
            n = !0, this.assets.data[t.id] = null, this.loadInfo[t.id].loaded = this.loadInfo[t.id].total = 1, r(new Error("loadData error"));
          };

          e.addEventListener("progress", e => {
            this.loadInfo[t.id].loaded = e.loaded, this.loadInfo[t.id].total = e.total;
          }), e.overrideMimeType("application/json"), e.open("GET", t.url, !0), e.onreadystatechange = () => {
            4 === e.readyState && 200 === e.status ? (this.assets.data[t.id] = JSON.parse(e.responseText), this.loadInfo[t.id].loaded = this.loadInfo[t.id].total, i(this.assets.data[t.id])) : 404 !== e.status || n || s();
          }, e.onerror = s, e.send();
        });
      }

      loadTexture(t) {
        const e = new THREE__namespace.TextureLoader();
        return this.loadInfo[t.id] = {
          loaded: 0,
          total: 0
        }, new Promise((n, i) => {
          e.load(t.url, e => {
            this.loadInfo[t.id].loaded = this.loadInfo[t.id].total, this.assets.textures[t.id] = e, n();
          }, e => {
            this.loadInfo[t.id].loaded = e.loaded, this.loadInfo[t.id].total = e.total;
          }, t => {
            i(t);
          });
        });
      }

      update() {
        if ("function" == typeof this.progressCallback) {
          let t = 0,
              e = 0;

          for (const n in this.loadInfo) this.loadInfo[n].loaded && (t += this.loadInfo[n].loaded), this.loadInfo[n].total && (e += this.loadInfo[n].total);

          this.progressCallback && this.progressCallback(t, e);
        }
      }

      dispose() {
        clearInterval(this.interval), this.interval = null, this.loadInfo = null, this.assets = null, this.progressCallback = null;
      }

    }

    const Signal = signals.Signal;
    const bl = {};
    const _l_pause = new Signal();
    const _l_resume = new Signal();

    //   hl: ,
    //   ul: "PR_OPENED",
    //   dl: "PR_MERGED",
    //   pl: "CUSTOM",
    //   fl: 16777215,
    //   ml: 2197759,
    //   gl: 16018366,
    //   vl: "PAUSE",
    //   yl: "RESUME",
    // }

    const hl = new THREE__namespace.Euler(.3, 4.6, .05);
    const ul = "PR_OPENED";
    const dl = "PR_MERGED";
    const pl = "CUSTOM";
    const fl = 16777215; //0xffffff

    const ml = 2197759; //0x2188ff

    const gl = 16018366; //0xf46bbe

    const cl = 40;
    const Ml = Math.PI / 180;
    const vl$1 = "PAUSE";
    const yl$1 = "RESUME";

    function Rl(t, e, n, i) {
      i = i || new THREE__namespace.Vector3();
      const r = (90 - t) * Ml,
            s = (e + 180) * Ml;
      return i.set(-n * Math.sin(r) * Math.cos(s), n * Math.cos(r), n * Math.sin(r) * Math.sin(s)), i;
    }
    function Nl(t, e, n) {
      return Math.max(e, Math.min(t, n));
    }
    function Al(t, e, n) {
      const i = n || new THREE__namespace.Matrix4();
      i.identity(), i.makeRotationY(e), i.multiply(t.matrix), t.matrix.copy(i), t.rotation.setFromRotationMatrix(t.matrix);
    }
    function Ll(t) {
      t instanceof THREE__namespace.Mesh && (t.geometry && t.geometry.dispose(), t.material && (t.material.map && t.material.map.dispose(), t.material.lightMap && t.material.lightMap.dispose(), t.material.bumpMap && t.material.bumpMap.dispose(), t.material.normalMap && t.material.normalMap.dispose(), t.material.specularMap && t.material.specularMap.dispose(), t.material.envMap && t.material.envMap.dispose(), t.material.emissiveMap && t.material.emissiveMap.dispose(), t.material.metalnessMap && t.material.metalnessMap.dispose(), t.material.roughnessMap && t.material.roughnessMap.dispose(), t.material.dispose()));
    }

    class Earth {
      constructor(t) {
        this.props = t, this.init();
      }

      init() {
        const {
          radius: t,
          detail: e = 50,
          renderer: n,
          shadowPoint: i,
          highlightPoint: r,
          highlightColor: s,
          frontHighlightColor: o = 3555965,
          waterColor: c = 857395,
          landColorFront: h = 16777215,
          shadowDist: u,
          highlightDist: d,
          frontPoint: f
        } = this.props,
              m = new THREE__namespace.SphereBufferGeometry(t, e, e),
              y = new THREE__namespace.MeshStandardMaterial({
          color: c,
          metalness: 0,
          roughness: .9
        });
        this.uniforms = [], y.onBeforeCompile = t => {
          t.uniforms.shadowDist = {
            value: u
          }, t.uniforms.highlightDist = {
            value: d
          }, t.uniforms.shadowPoint = {
            value: new THREE__namespace.Vector3().copy(i)
          }, t.uniforms.highlightPoint = {
            value: new THREE__namespace.Vector3().copy(r)
          }, t.uniforms.frontPoint = {
            value: new THREE__namespace.Vector3().copy(f)
          }, t.uniforms.highlightColor = {
            value: new THREE__namespace.Color(s)
          }, t.uniforms.frontHighlightColor = {
            value: new THREE__namespace.Color(o)
          }, t.vertexShader = `
                #define GLSLIFY 1
                #define STANDARD
                varying vec3 vViewPosition;
                #ifndef FLAT_SHADED
                    varying vec3 vNormal;
                    #ifdef USE_TANGENT
                        varying vec3 vTangent;
                        varying vec3 vBitangent;
                    #endif
                #endif
                #include <common>
                #include <uv_pars_vertex>
                #include <uv2_pars_vertex>
                #include <displacementmap_pars_vertex>
                #include <color_pars_vertex>
                #include <fog_pars_vertex>
                #include <morphtarget_pars_vertex>
                #include <skinning_pars_vertex>
                #include <shadowmap_pars_vertex>
                #include <logdepthbuf_pars_vertex>
                #include <clipping_planes_pars_vertex>

                varying vec3 vWorldPosition;

                void main() {
                    #include <uv_vertex>
                    #include <uv2_vertex>
                    #include <color_vertex>
                    #include <beginnormal_vertex>
                    #include <morphnormal_vertex>
                    #include <skinbase_vertex>
                    #include <skinnormal_vertex>
                    #include <defaultnormal_vertex>
                #ifndef FLAT_SHADED
                    vNormal = normalize( transformedNormal );
                    #ifdef USE_TANGENT
                        vTangent = normalize( transformedTangent );
                        vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
                    #endif
                #endif
                    #include <begin_vertex>
                    #include <morphtarget_vertex>
                    #include <skinning_vertex>
                    #include <displacementmap_vertex>
                    #include <project_vertex>
                    #include <logdepthbuf_vertex>
                    #include <clipping_planes_vertex>
                    vViewPosition = - mvPosition.xyz;
                    // # include <worldpos_vertex>
                    vec4 worldPosition = vec4( transformed, 1.0 );

                    #ifdef USE_INSTANCING

                        worldPosition = instanceMatrix * worldPosition;

                    #endif

                    worldPosition = modelMatrix * worldPosition;
                    vWorldPosition = worldPosition.xyz;
                    #include <shadowmap_vertex>
                    #include <fog_vertex>
                }`, t.fragmentShader = `
                #define GLSLIFY 1
                #define STANDARD
                #ifdef PHYSICAL
                    #define REFLECTIVITY
                    #define CLEARCOAT
                    #define TRANSPARENCY
                #endif
                uniform vec3 diffuse;
                uniform vec3 emissive;
                uniform float roughness;
                uniform float metalness;
                uniform float opacity;
                #ifdef TRANSPARENCY
                    uniform float transparency;
                #endif
                #ifdef REFLECTIVITY
                    uniform float reflectivity;
                #endif
                #ifdef CLEARCOAT
                    uniform float clearcoat;
                    uniform float clearcoatRoughness;
                #endif
                #ifdef USE_SHEEN
                    uniform vec3 sheen;
                #endif
                varying vec3 vViewPosition;
                #ifndef FLAT_SHADED
                    varying vec3 vNormal;
                    #ifdef USE_TANGENT
                        varying vec3 vTangent;
                        varying vec3 vBitangent;
                    #endif
                #endif
                #include <common>
                #include <packing>
                #include <dithering_pars_fragment>
                #include <color_pars_fragment>
                #include <uv_pars_fragment>
                #include <uv2_pars_fragment>
                #include <map_pars_fragment>
                #include <alphamap_pars_fragment>
                #include <aomap_pars_fragment>
                #include <lightmap_pars_fragment>
                #include <emissivemap_pars_fragment>
                #include <bsdfs>
                #include <cube_uv_reflection_fragment>
                #include <envmap_common_pars_fragment>
                #include <envmap_physical_pars_fragment>
                #include <fog_pars_fragment>
                #include <lights_pars_begin>
                #include <lights_physical_pars_fragment>
                #include <shadowmap_pars_fragment>
                #include <bumpmap_pars_fragment>
                #include <normalmap_pars_fragment>
                #include <clearcoat_pars_fragment>
                #include <roughnessmap_pars_fragment>
                #include <metalnessmap_pars_fragment>
                #include <logdepthbuf_pars_fragment>
                #include <clipping_planes_pars_fragment>

                uniform float shadowDist;
                uniform float highlightDist;
                uniform vec3 shadowPoint;
                uniform vec3 highlightPoint;
                uniform vec3 frontPoint;
                uniform vec3 highlightColor;
                uniform vec3 frontHighlightColor;

                varying vec3 vWorldPosition;

                void main() {
                    #include <clipping_planes_fragment>
                    vec4 diffuseColor = vec4( diffuse, opacity );
                    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
                    vec3 totalEmissiveRadiance = emissive;
                    #include <logdepthbuf_fragment>
                    #ifdef USE_MAP

                        vec4 texelColor = texture2D( map, vUv );
                        texelColor = mapTexelToLinear( texelColor );

                        #ifndef IS_FILL
                            diffuseColor *= texelColor;
                        #endif

                    #endif
                    #include <color_fragment>
                    #include <alphamap_fragment>
                    #include <alphatest_fragment>
                    #include <roughnessmap_fragment>
                    #include <metalnessmap_fragment>
                    #include <normal_fragment_begin>
                    #include <normal_fragment_maps>
                    #include <clearcoat_normal_fragment_begin>
                    #include <clearcoat_normal_fragment_maps>
                    #include <emissivemap_fragment>
                    #include <lights_physical_fragment>
                    #include <lights_fragment_begin>
                    #include <lights_fragment_maps>
                    #include <lights_fragment_end>
                    #include <aomap_fragment>
                    vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
                    #ifdef TRANSPARENCY
                        diffuseColor.a *= saturate( 1. - transparency + linearToRelativeLuminance( reflectedLight.directSpecular + reflectedLight.indirectSpecular ) );
                    #endif

                    float dist;
                    float distZ;

                    // highlights
                    #ifdef USE_HIGHLIGHT
                        dist = distance(vWorldPosition, highlightPoint);
                        distZ = distance(vWorldPosition.z, 0.0);
                        outgoingLight = mix(highlightColor, outgoingLight, smoothstep(0.0, highlightDist, dist) * smoothstep(0.0, 3.0, pow(distZ, 0.5)));
                        outgoingLight = mix(outgoingLight * 2.0, outgoingLight, smoothstep(0.0, 12.0, distZ));
                    #endif

                    // front hightlight
                    #ifdef USE_FRONT_HIGHLIGHT
                        dist = distance(vWorldPosition * vec3(0.875, 0.5, 1.0), frontPoint);
                        outgoingLight = mix(frontHighlightColor * 1.6, outgoingLight, smoothstep(0.0, 15.0, dist));
                    #endif

                    // shadows
                    dist = distance(vWorldPosition, shadowPoint);
                    outgoingLight = mix(outgoingLight * 0.01, outgoingLight, smoothstep(0.0, shadowDist, dist));
                    // shadow debug
                    // outgoingLight = mix(vec3(1.0, 0.0, 0.0), outgoingLight, smoothstep(0.0, shadowDist, dist));

                    #ifdef IS_FILL
                        outgoingLight = mix(outgoingLight, outgoingLight * 0.5, 1.0 - texelColor.g * 1.5);
                    #endif

                    gl_FragColor = vec4( outgoingLight, diffuseColor.a );
                    #include <tonemapping_fragment>
                    #include <encodings_fragment>
                    #include <fog_fragment>
                    #include <premultiplied_alpha_fragment>
                    #include <dithering_fragment>
                }`, this.uniforms.push(t.uniforms);
        }, y.defines = {
          USE_HIGHLIGHT: 1,
          USE_HIGHLIGHT_ALT: 1,
          USE_FRONT_HIGHLIGHT: 1,
          DITHERING: 1
        }, this.mesh = new THREE__namespace.Group();
        const x = new THREE__namespace.Mesh(m, y);
        x.name = "Earth";
        x.renderOrder = 1, this.mesh.add(x), this.meshFill = x, this.materials = [y];
      }

      setShadowPoint(t) {
        this.uniforms && this.uniforms.forEach(e => {
          e.shadowPoint.value.copy(t);
        });
      }

      setHighlightPoint(t) {
        this.uniforms && this.uniforms.forEach(e => {
          e.highlightPoint.value.copy(t);
        });
      }

      setFrontPoint(t) {
        this.uniforms && this.uniforms.forEach(e => {
          e.frontPoint.value.copy(t);
        });
      }

      setShadowDist(t) {
        this.uniforms && this.uniforms.forEach(e => {
          e.shadowDist.value = t;
        });
      }

      setHighlightDist(t) {
        this.uniforms && this.uniforms.forEach(e => {
          e.highlightDist.value = t;
        });
      }

      dispose() {
        this.mesh = null, this.materials = null, this.uniforms = null, this.meshFill = null;
      }

    }

    /**
     * 交互接口
     */

    class MouseEvent {
      constructor(t) {
        this.props = t, this.handleMouseDown = this.handleMouseDown.bind(this), this.handleMouseMove = this.handleMouseMove.bind(this), this.handleMouseUp = this.handleMouseUp.bind(this), this.handleMouseOut = this.handleMouseOut.bind(this), this.handleTouchStart = this.handleTouchStart.bind(this), this.handleTouchMove = this.handleTouchMove.bind(this), this.handleTouchEnd = this.handleTouchEnd.bind(this), this.handlePause = this.handlePause.bind(this), this.handleResume = this.handleResume.bind(this), this.init();
      }

      init() {
        this.dragging = !1, this.mouse = new THREE__namespace.Vector2(.5, .5), this.lastMouse = new THREE__namespace.Vector2(.5, .5), this.target = new THREE__namespace.Vector3(0, 0), this.matrix = new THREE__namespace.Matrix4(), this.velocity = new THREE__namespace.Vector2(), this.autoRotationSpeedScalar = 1, this.autoRotationSpeedScalarTarget = 1, this.addListeners(), _l_pause.add(this.handlePause), _l_resume.add(this.handleResume);
      }

      addListeners() {
        const {
          domElement: t
        } = this.props;
        this.removeListeners(), t.addEventListener("mousedown", this.handleMouseDown, !1), t.addEventListener("mousemove", this.handleMouseMove, !1), t.addEventListener("mouseup", this.handleMouseUp, !1), t.addEventListener("mouseout", this.handleMouseOut, !1), t.addEventListener("mouseleave", this.handleMouseOut, !1), t.addEventListener("touchstart", this.handleTouchStart, !1), t.addEventListener("touchmove", this.handleTouchMove, !1), t.addEventListener("touchend", this.handleTouchEnd, !1), t.addEventListener("touchcancel", this.handleTouchEnd, !1);
      }

      removeListeners() {
        const {
          domElement: t
        } = this.props;
        t.removeEventListener("mousedown", this.handleMouseDown), t.removeEventListener("mousemove", this.handleMouseMove), t.removeEventListener("mouseup", this.handleMouseUp), t.removeEventListener("mouseout", this.handleMouseOut), t.removeEventListener("mouseleave", this.handleMouseOut), t.removeEventListener("touchstart", this.handleTouchStart), t.removeEventListener("touchmove", this.handleTouchMove), t.removeEventListener("touchend", this.handleTouchEnd), t.removeEventListener("touchcancel", this.handleTouchEnd);
      }

      setMouse(t) {
        const {
          width: e,
          height: n
        } = bl.parentNode.getBoundingClientRect();
        this.mouse.x = t.clientX / e * 2 - 1, this.mouse.y = -t.clientY / n * 2 + 1;
      }

      setDragging(t) {
        this.dragging = t;
        const {
          setDraggingCallback: e
        } = this.props;
        e && "function" == typeof e && e(t);
      }

      handlePause() {
        this.removeListeners();
        console.error("handlePause");
      }

      handleResume() {
        this.addListeners();
        console.error("handleResume");
      }

      handleMouseDown(t) {
        this.setMouse(t), this.setDragging(!0);
      }

      handleMouseMove(t) {
        this.setMouse(t);
      }

      handleMouseUp(t) {
        this.setMouse(t), this.setDragging(!1);
      }

      handleMouseOut() {
        this.setDragging(!1);
      }

      handleTouchStart(t) {
        this.setMouse(t.changedTouches[0]), this.lastMouse.copy(this.mouse), this.setDragging(!0);
      }

      handleTouchMove(t) {
        this.setMouse(t.changedTouches[0]);
      }

      handleTouchEnd(t) {
        this.setMouse(t.changedTouches[0]), this.setDragging(!1);
      }

      update(t = .01) {
        let e = 0,
            n = 0;
        const {
          object: i,
          objectContainer: r,
          rotateSpeed: s,
          autoRotationSpeed: o,
          easing: c = .1,
          maxRotationX: h = .3
        } = this.props;
        this.dragging && (e = this.mouse.x - this.lastMouse.x, n = this.mouse.y - this.lastMouse.y, this.target.y = Nl(this.target.y - n, -h, .6 * h)), r.rotation.x += (this.target.y + hl.x - r.rotation.x) * c, this.target.x += (e - this.target.x) * c, Al(i, this.target.x * s, this.matrix), this.dragging || Al(i, t * o * this.autoRotationSpeedScalar, this.matrix), this.autoRotationSpeedScalar += .05 * (this.autoRotationSpeedScalarTarget - this.autoRotationSpeedScalar), this.lastMouse.copy(this.mouse), this.velocity.set(e, n);
      }

      dispose() {
        this.removeListeners(), _l_pause.remove(vl, this.handlePause), _l_resume.remove(yl, this.handleResume), this.dragging = null, this.mouse = null, this.lastMouse = null, this.target = null, this.matrix = null, this.velocity = null, this.autoRotationSpeedScalar = null, this.autoRotationSpeedScalarTarget = null;
      }

    }

    THREE__namespace.OBJLoader = function () {
      // o object_name | g group_name
      var object_pattern = /^[og]\s*(.+)?/; // mtllib file_reference

      var material_library_pattern = /^mtllib /; // usemtl material_name

      var material_use_pattern = /^usemtl /; // usemap map_name

      var map_use_pattern = /^usemap /;
      var vA = new THREE__namespace.Vector3();
      var vB = new THREE__namespace.Vector3();
      var vC = new THREE__namespace.Vector3();
      var ab = new THREE__namespace.Vector3();
      var cb = new THREE__namespace.Vector3();

      function ParserState() {
        var state = {
          objects: [],
          object: {},
          vertices: [],
          normals: [],
          colors: [],
          uvs: [],
          materials: {},
          materialLibraries: [],
          startObject: function (name, fromDeclaration) {
            // If the current object (initial from reset) is not from a g/o declaration in the parsed
            // file. We need to use it for the first parsed g/o to keep things in sync.
            if (this.object && this.object.fromDeclaration === false) {
              this.object.name = name;
              this.object.fromDeclaration = fromDeclaration !== false;
              return;
            }

            var previousMaterial = this.object && typeof this.object.currentMaterial === 'function' ? this.object.currentMaterial() : undefined;

            if (this.object && typeof this.object._finalize === 'function') {
              this.object._finalize(true);
            }

            this.object = {
              name: name || '',
              fromDeclaration: fromDeclaration !== false,
              geometry: {
                vertices: [],
                normals: [],
                colors: [],
                uvs: [],
                hasUVIndices: false
              },
              materials: [],
              smooth: true,
              startMaterial: function (name, libraries) {
                var previous = this._finalize(false); // New usemtl declaration overwrites an inherited material, except if faces were declared
                // after the material, then it must be preserved for proper MultiMaterial continuation.


                if (previous && (previous.inherited || previous.groupCount <= 0)) {
                  this.materials.splice(previous.index, 1);
                }

                var material = {
                  index: this.materials.length,
                  name: name || '',
                  mtllib: Array.isArray(libraries) && libraries.length > 0 ? libraries[libraries.length - 1] : '',
                  smooth: previous !== undefined ? previous.smooth : this.smooth,
                  groupStart: previous !== undefined ? previous.groupEnd : 0,
                  groupEnd: -1,
                  groupCount: -1,
                  inherited: false,
                  clone: function (index) {
                    var cloned = {
                      index: typeof index === 'number' ? index : this.index,
                      name: this.name,
                      mtllib: this.mtllib,
                      smooth: this.smooth,
                      groupStart: 0,
                      groupEnd: -1,
                      groupCount: -1,
                      inherited: false
                    };
                    cloned.clone = this.clone.bind(cloned);
                    return cloned;
                  }
                };
                this.materials.push(material);
                return material;
              },
              currentMaterial: function () {
                if (this.materials.length > 0) {
                  return this.materials[this.materials.length - 1];
                }

                return undefined;
              },
              _finalize: function (end) {
                var lastMultiMaterial = this.currentMaterial();

                if (lastMultiMaterial && lastMultiMaterial.groupEnd === -1) {
                  lastMultiMaterial.groupEnd = this.geometry.vertices.length / 3;
                  lastMultiMaterial.groupCount = lastMultiMaterial.groupEnd - lastMultiMaterial.groupStart;
                  lastMultiMaterial.inherited = false;
                } // Ignore objects tail materials if no face declarations followed them before a new o/g started.


                if (end && this.materials.length > 1) {
                  for (var mi = this.materials.length - 1; mi >= 0; mi--) {
                    if (this.materials[mi].groupCount <= 0) {
                      this.materials.splice(mi, 1);
                    }
                  }
                } // Guarantee at least one empty material, this makes the creation later more straight forward.


                if (end && this.materials.length === 0) {
                  this.materials.push({
                    name: '',
                    smooth: this.smooth
                  });
                }

                return lastMultiMaterial;
              }
            }; // Inherit previous objects material.
            // Spec tells us that a declared material must be set to all objects until a new material is declared.
            // If a usemtl declaration is encountered while this new object is being parsed, it will
            // overwrite the inherited material. Exception being that there was already face declarations
            // to the inherited material, then it will be preserved for proper MultiMaterial continuation.

            if (previousMaterial && previousMaterial.name && typeof previousMaterial.clone === 'function') {
              var declared = previousMaterial.clone(0);
              declared.inherited = true;
              this.object.materials.push(declared);
            }

            this.objects.push(this.object);
          },
          finalize: function () {
            if (this.object && typeof this.object._finalize === 'function') {
              this.object._finalize(true);
            }
          },
          parseVertexIndex: function (value, len) {
            var index = parseInt(value, 10);
            return (index >= 0 ? index - 1 : index + len / 3) * 3;
          },
          parseNormalIndex: function (value, len) {
            var index = parseInt(value, 10);
            return (index >= 0 ? index - 1 : index + len / 3) * 3;
          },
          parseUVIndex: function (value, len) {
            var index = parseInt(value, 10);
            return (index >= 0 ? index - 1 : index + len / 2) * 2;
          },
          addVertex: function (a, b, c) {
            var src = this.vertices;
            var dst = this.object.geometry.vertices;
            dst.push(src[a + 0], src[a + 1], src[a + 2]);
            dst.push(src[b + 0], src[b + 1], src[b + 2]);
            dst.push(src[c + 0], src[c + 1], src[c + 2]);
          },
          addVertexPoint: function (a) {
            var src = this.vertices;
            var dst = this.object.geometry.vertices;
            dst.push(src[a + 0], src[a + 1], src[a + 2]);
          },
          addVertexLine: function (a) {
            var src = this.vertices;
            var dst = this.object.geometry.vertices;
            dst.push(src[a + 0], src[a + 1], src[a + 2]);
          },
          addNormal: function (a, b, c) {
            var src = this.normals;
            var dst = this.object.geometry.normals;
            dst.push(src[a + 0], src[a + 1], src[a + 2]);
            dst.push(src[b + 0], src[b + 1], src[b + 2]);
            dst.push(src[c + 0], src[c + 1], src[c + 2]);
          },
          addFaceNormal: function (a, b, c) {
            var src = this.vertices;
            var dst = this.object.geometry.normals;
            vA.fromArray(src, a);
            vB.fromArray(src, b);
            vC.fromArray(src, c);
            cb.subVectors(vC, vB);
            ab.subVectors(vA, vB);
            cb.cross(ab);
            cb.normalize();
            dst.push(cb.x, cb.y, cb.z);
            dst.push(cb.x, cb.y, cb.z);
            dst.push(cb.x, cb.y, cb.z);
          },
          addColor: function (a, b, c) {
            var src = this.colors;
            var dst = this.object.geometry.colors;
            if (src[a] !== undefined) dst.push(src[a + 0], src[a + 1], src[a + 2]);
            if (src[b] !== undefined) dst.push(src[b + 0], src[b + 1], src[b + 2]);
            if (src[c] !== undefined) dst.push(src[c + 0], src[c + 1], src[c + 2]);
          },
          addUV: function (a, b, c) {
            var src = this.uvs;
            var dst = this.object.geometry.uvs;
            dst.push(src[a + 0], src[a + 1]);
            dst.push(src[b + 0], src[b + 1]);
            dst.push(src[c + 0], src[c + 1]);
          },
          addDefaultUV: function () {
            var dst = this.object.geometry.uvs;
            dst.push(0, 0);
            dst.push(0, 0);
            dst.push(0, 0);
          },
          addUVLine: function (a) {
            var src = this.uvs;
            var dst = this.object.geometry.uvs;
            dst.push(src[a + 0], src[a + 1]);
          },
          addFace: function (a, b, c, ua, ub, uc, na, nb, nc) {
            var vLen = this.vertices.length;
            var ia = this.parseVertexIndex(a, vLen);
            var ib = this.parseVertexIndex(b, vLen);
            var ic = this.parseVertexIndex(c, vLen);
            this.addVertex(ia, ib, ic);
            this.addColor(ia, ib, ic); // normals

            if (na !== undefined && na !== '') {
              var nLen = this.normals.length;
              ia = this.parseNormalIndex(na, nLen);
              ib = this.parseNormalIndex(nb, nLen);
              ic = this.parseNormalIndex(nc, nLen);
              this.addNormal(ia, ib, ic);
            } else {
              this.addFaceNormal(ia, ib, ic);
            } // uvs


            if (ua !== undefined && ua !== '') {
              var uvLen = this.uvs.length;
              ia = this.parseUVIndex(ua, uvLen);
              ib = this.parseUVIndex(ub, uvLen);
              ic = this.parseUVIndex(uc, uvLen);
              this.addUV(ia, ib, ic);
              this.object.geometry.hasUVIndices = true;
            } else {
              // add placeholder values (for inconsistent face definitions)
              this.addDefaultUV();
            }
          },
          addPointGeometry: function (vertices) {
            this.object.geometry.type = 'Points';
            var vLen = this.vertices.length;

            for (var vi = 0, l = vertices.length; vi < l; vi++) {
              var index = this.parseVertexIndex(vertices[vi], vLen);
              this.addVertexPoint(index);
              this.addColor(index);
            }
          },
          addLineGeometry: function (vertices, uvs) {
            this.object.geometry.type = 'Line';
            var vLen = this.vertices.length;
            var uvLen = this.uvs.length;

            for (var vi = 0, l = vertices.length; vi < l; vi++) {
              this.addVertexLine(this.parseVertexIndex(vertices[vi], vLen));
            }

            for (var uvi = 0, l = uvs.length; uvi < l; uvi++) {
              this.addUVLine(this.parseUVIndex(uvs[uvi], uvLen));
            }
          }
        };
        state.startObject('', false);
        return state;
      } //


      function OBJLoader(manager) {
        THREE__namespace.Loader.call(this, manager);
        this.materials = null;
      }

      OBJLoader.prototype = Object.assign(Object.create(THREE__namespace.Loader.prototype), {
        constructor: OBJLoader,
        load: function (url, onLoad, onProgress, onError) {
          var scope = this;
          var loader = new THREE__namespace.FileLoader(this.manager);
          loader.setPath(this.path);
          loader.setRequestHeader(this.requestHeader);
          loader.setWithCredentials(this.withCredentials);
          loader.load(url, function (text) {
            try {
              onLoad(scope.parse(text));
            } catch (e) {
              if (onError) {
                onError(e);
              } else {
                console.error(e);
              }

              scope.manager.itemError(url);
            }
          }, onProgress, onError);
        },
        setMaterials: function (materials) {
          this.materials = materials;
          return this;
        },
        parse: function (text) {
          var state = new ParserState();

          if (text.indexOf('\r\n') !== -1) {
            // This is faster than String.split with regex that splits on both
            text = text.replace(/\r\n/g, '\n');
          }

          if (text.indexOf('\\\n') !== -1) {
            // join lines separated by a line continuation character (\)
            text = text.replace(/\\\n/g, '');
          }

          var lines = text.split('\n');
          var line = '',
              lineFirstChar = '';
          var lineLength = 0;
          var result = []; // Faster to just trim left side of the line. Use if available.

          var trimLeft = typeof ''.trimLeft === 'function';

          for (var i = 0, l = lines.length; i < l; i++) {
            line = lines[i];
            line = trimLeft ? line.trimLeft() : line.trim();
            lineLength = line.length;
            if (lineLength === 0) continue;
            lineFirstChar = line.charAt(0); // @todo invoke passed in handler if any

            if (lineFirstChar === '#') continue;

            if (lineFirstChar === 'v') {
              var data = line.split(/\s+/);

              switch (data[0]) {
                case 'v':
                  state.vertices.push(parseFloat(data[1]), parseFloat(data[2]), parseFloat(data[3]));

                  if (data.length >= 7) {
                    state.colors.push(parseFloat(data[4]), parseFloat(data[5]), parseFloat(data[6]));
                  } else {
                    // if no colors are defined, add placeholders so color and vertex indices match
                    state.colors.push(undefined, undefined, undefined);
                  }

                  break;

                case 'vn':
                  state.normals.push(parseFloat(data[1]), parseFloat(data[2]), parseFloat(data[3]));
                  break;

                case 'vt':
                  state.uvs.push(parseFloat(data[1]), parseFloat(data[2]));
                  break;
              }
            } else if (lineFirstChar === 'f') {
              var lineData = line.substr(1).trim();
              var vertexData = lineData.split(/\s+/);
              var faceVertices = []; // Parse the face vertex data into an easy to work with format

              for (var j = 0, jl = vertexData.length; j < jl; j++) {
                var vertex = vertexData[j];

                if (vertex.length > 0) {
                  var vertexParts = vertex.split('/');
                  faceVertices.push(vertexParts);
                }
              } // Draw an edge between the first vertex and all subsequent vertices to form an n-gon


              var v1 = faceVertices[0];

              for (var j = 1, jl = faceVertices.length - 1; j < jl; j++) {
                var v2 = faceVertices[j];
                var v3 = faceVertices[j + 1];
                state.addFace(v1[0], v2[0], v3[0], v1[1], v2[1], v3[1], v1[2], v2[2], v3[2]);
              }
            } else if (lineFirstChar === 'l') {
              var lineParts = line.substring(1).trim().split(' ');
              var lineVertices = [],
                  lineUVs = [];

              if (line.indexOf('/') === -1) {
                lineVertices = lineParts;
              } else {
                for (var li = 0, llen = lineParts.length; li < llen; li++) {
                  var parts = lineParts[li].split('/');
                  if (parts[0] !== '') lineVertices.push(parts[0]);
                  if (parts[1] !== '') lineUVs.push(parts[1]);
                }
              }

              state.addLineGeometry(lineVertices, lineUVs);
            } else if (lineFirstChar === 'p') {
              var lineData = line.substr(1).trim();
              var pointData = lineData.split(' ');
              state.addPointGeometry(pointData);
            } else if ((result = object_pattern.exec(line)) !== null) {
              // o object_name
              // or
              // g group_name
              // WORKAROUND: https://bugs.chromium.org/p/v8/issues/detail?id=2869
              // var name = result[ 0 ].substr( 1 ).trim();
              var name = (' ' + result[0].substr(1).trim()).substr(1);
              state.startObject(name);
            } else if (material_use_pattern.test(line)) {
              // material
              state.object.startMaterial(line.substring(7).trim(), state.materialLibraries);
            } else if (material_library_pattern.test(line)) {
              // mtl file
              state.materialLibraries.push(line.substring(7).trim());
            } else if (map_use_pattern.test(line)) {
              // the line is parsed but ignored since the loader assumes textures are defined MTL files
              // (according to https://www.okino.com/conv/imp_wave.htm, 'usemap' is the old-style Wavefront texture reference method)
              console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');
            } else if (lineFirstChar === 's') {
              result = line.split(' '); // smooth shading
              // @todo Handle files that have varying smooth values for a set of faces inside one geometry,
              // but does not define a usemtl for each face set.
              // This should be detected and a dummy material created (later MultiMaterial and geometry groups).
              // This requires some care to not create extra material on each smooth value for "normal" obj files.
              // where explicit usemtl defines geometry groups.
              // Example asset: examples/models/obj/cerberus/Cerberus.obj

              /*
               * http://paulbourke.net/dataformats/obj/
               * or
               * http://www.cs.utah.edu/~boulos/cs3505/obj_spec.pdf
               *
               * From chapter "Grouping" Syntax explanation "s group_number":
               * "group_number is the smoothing group number. To turn off smoothing groups, use a value of 0 or off.
               * Polygonal elements use group numbers to put elements in different smoothing groups. For free-form
               * surfaces, smoothing groups are either turned on or off; there is no difference between values greater
               * than 0."
               */

              if (result.length > 1) {
                var value = result[1].trim().toLowerCase();
                state.object.smooth = value !== '0' && value !== 'off';
              } else {
                // ZBrush can produce "s" lines #11707
                state.object.smooth = true;
              }

              var material = state.object.currentMaterial();
              if (material) material.smooth = state.object.smooth;
            } else {
              // Handle null terminated files without exception
              if (line === '\0') continue;
              console.warn('THREE.OBJLoader: Unexpected line: "' + line + '"');
            }
          }

          state.finalize();
          var container = new THREE__namespace.Group();
          container.materialLibraries = [].concat(state.materialLibraries);
          var hasPrimitives = !(state.objects.length === 1 && state.objects[0].geometry.vertices.length === 0);

          if (hasPrimitives === true) {
            for (var i = 0, l = state.objects.length; i < l; i++) {
              var object = state.objects[i];
              var geometry = object.geometry;
              var materials = object.materials;
              var isLine = geometry.type === 'Line';
              var isPoints = geometry.type === 'Points';
              var hasVertexColors = false; // Skip o/g line declarations that did not follow with any faces

              if (geometry.vertices.length === 0) continue;
              var buffergeometry = new THREE__namespace.BufferGeometry();
              buffergeometry.setAttribute('position', new THREE__namespace.Float32BufferAttribute(geometry.vertices, 3));

              if (geometry.normals.length > 0) {
                buffergeometry.setAttribute('normal', new THREE__namespace.Float32BufferAttribute(geometry.normals, 3));
              }

              if (geometry.colors.length > 0) {
                hasVertexColors = true;
                buffergeometry.setAttribute('color', new THREE__namespace.Float32BufferAttribute(geometry.colors, 3));
              }

              if (geometry.hasUVIndices === true) {
                buffergeometry.setAttribute('uv', new THREE__namespace.Float32BufferAttribute(geometry.uvs, 2));
              } // Create materials


              var createdMaterials = [];

              for (var mi = 0, miLen = materials.length; mi < miLen; mi++) {
                var sourceMaterial = materials[mi];
                var materialHash = sourceMaterial.name + '_' + sourceMaterial.smooth + '_' + hasVertexColors;
                var material = state.materials[materialHash];

                if (this.materials !== null) {
                  material = this.materials.create(sourceMaterial.name); // mtl etc. loaders probably can't create line materials correctly, copy properties to a line material.

                  if (isLine && material && !(material instanceof THREE__namespace.LineBasicMaterial)) {
                    var materialLine = new THREE__namespace.LineBasicMaterial();
                    THREE__namespace.Material.prototype.copy.call(materialLine, material);
                    materialLine.color.copy(material.color);
                    material = materialLine;
                  } else if (isPoints && material && !(material instanceof THREE__namespace.PointsMaterial)) {
                    var materialPoints = new THREE__namespace.PointsMaterial({
                      size: 10,
                      sizeAttenuation: false
                    });
                    THREE__namespace.Material.prototype.copy.call(materialPoints, material);
                    materialPoints.color.copy(material.color);
                    materialPoints.map = material.map;
                    material = materialPoints;
                  }
                }

                if (material === undefined) {
                  if (isLine) {
                    material = new THREE__namespace.LineBasicMaterial();
                  } else if (isPoints) {
                    material = new THREE__namespace.PointsMaterial({
                      size: 1,
                      sizeAttenuation: false
                    });
                  } else {
                    material = new THREE__namespace.MeshPhongMaterial();
                  }

                  material.name = sourceMaterial.name;
                  material.flatShading = sourceMaterial.smooth ? false : true;
                  material.vertexColors = hasVertexColors;
                  state.materials[materialHash] = material;
                }

                createdMaterials.push(material);
              } // Create mesh


              var mesh;

              if (createdMaterials.length > 1) {
                for (var mi = 0, miLen = materials.length; mi < miLen; mi++) {
                  var sourceMaterial = materials[mi];
                  buffergeometry.addGroup(sourceMaterial.groupStart, sourceMaterial.groupCount, mi);
                }

                if (isLine) {
                  mesh = new THREE__namespace.LineSegments(buffergeometry, createdMaterials);
                } else if (isPoints) {
                  mesh = new THREE__namespace.Points(buffergeometry, createdMaterials);
                } else {
                  mesh = new THREE__namespace.Mesh(buffergeometry, createdMaterials);
                }
              } else {
                if (isLine) {
                  mesh = new THREE__namespace.LineSegments(buffergeometry, createdMaterials[0]);
                } else if (isPoints) {
                  mesh = new THREE__namespace.Points(buffergeometry, createdMaterials[0]);
                } else {
                  mesh = new THREE__namespace.Mesh(buffergeometry, createdMaterials[0]);
                }
              }

              mesh.name = object.name;
              container.add(mesh);
            }
          } else {
            // if there is only the default parser state object with no geometry data, interpret data as point cloud
            if (state.vertices.length > 0) {
              var material = new THREE__namespace.PointsMaterial({
                size: 1,
                sizeAttenuation: false
              });
              var buffergeometry = new THREE__namespace.BufferGeometry();
              buffergeometry.setAttribute('position', new THREE__namespace.Float32BufferAttribute(state.vertices, 3));

              if (state.colors.length > 0 && state.colors[0] !== undefined) {
                buffergeometry.setAttribute('color', new THREE__namespace.Float32BufferAttribute(state.colors, 3));
                material.vertexColors = true;
              }

              var points = new THREE__namespace.Points(buffergeometry, material);
              container.add(points);
            }
          }

          return container;
        }
      });
      return OBJLoader;
    }();

    class Stage {
      constructor(t) {
        this.handleResize = this.handleResize.bind(this), this.handlePause = this.handlePause.bind(this), this.handleResume = this.handleResume.bind(this), this.handleScroll = this.handleScroll.bind(this), this.handleMouseMove = this.handleMouseMove.bind(this), this.setDragging = this.setDragging.bind(this), this.update = this.update.bind(this), this.hasLoaded = !1, this.initBase(t || document.body), this.initScene(), this.addListeners(), _l_pause.add(this.handlePause), _l_resume.add(this.handleResume);
      }

      initBase(t) {
        const {
          width: e,
          height: n
        } = bl.parentNode.getBoundingClientRect();
        this.scene = new THREE__namespace.Scene(), this.camera = new THREE__namespace.PerspectiveCamera(20, e / n, 170, 260), this.renderer = new THREE__namespace.WebGLRenderer({
          powerPreference: "high-performance",
          alpha: true,
          preserveDrawingBuffer: !1
        }), this.then = Date.now() / 1e3, this.fpsWarnings = 0, this.fpsWarningThreshold = 50, this.fpsTarget = 60, this.fpsEmergencyThreshold = 12, this.fpsTargetSensitivity = .925, this.fpsStorage = [], this.worldDotRows = 200, this.worldDotSize = .095, this.renderQuality = 4, this.renderer.setPixelRatio(bl.pixelRatio || 1), this.renderer.setSize(e, n), // this.renderer.setClearColor(16448250, 1),
        this.renderer.setClearColor(265505, 1), t.appendChild(this.renderer.domElement), this.renderer.domElement.classList.add("webgl-canvas"), this.renderer.domElement.classList.add("js-globe-canvas");
        const i = new THREE__namespace.AmbientLight(16777215, .8);
        this.scene.add(i), this.parentContainer = new THREE__namespace.Group(), this.parentContainer.name = "parentContainer";
        let r = hl;
        const s = new Date().getTimezoneOffset() || 0;
        r.y = hl.y + Math.PI * (s / 720), this.parentContainer.rotation.copy(r), this.scene.add(this.parentContainer), this.haloContainer = new THREE__namespace.Group(), this.haloContainer.name = "haloContainer", this.scene.add(this.haloContainer), this.container = new THREE__namespace.Group(), this.container.name = "container", this.parentContainer.add(this.container), this.camera.position.set(0, 0, 220), this.scene.add(this.camera), this.clock = new THREE__namespace.Clock(), this.mouse = new THREE__namespace.Vector3(0, 0, .5), this.mouseScreenPos = new THREE__namespace.Vector2(-9999, -9999), this.raycaster = new THREE__namespace.Raycaster(), this.raycaster.far = 260, this.paused = !1, this.canvasOffset = {
          x: 0,
          y: 0
        }, this.updateCanvasOffset(), this.highlightMaterial = new THREE__namespace.MeshBasicMaterial({
          opacity: 1,
          transparent: !1,
          color: fl
        }), this.handleResize(), this.startUpdating();
        window.scene = this.scene;
      }

      initScene() {
        const {
          isMobile: t,
          globeRadius: e = cl,
          assets: {
            textures: {
              globeDiffuse: n,
              globeAlpha: i
            }
          }
        } = bl;
        this.radius = e, this.light0 = new THREE__namespace.SpotLight(ml, 12, 120, .3, 0, 1.1), this.light1 = new THREE__namespace.DirectionalLight(11124735, 3), this.light3 = new THREE__namespace.SpotLight(gl, 5, 75, .5, 0, 1.25), this.light0.target = this.parentContainer, this.light1.target = this.parentContainer, this.light3.target = this.parentContainer, this.scene.add(this.light0, this.light1, this.light3), this.positionContainer(), this.shadowPoint = new THREE__namespace.Vector3().copy(this.parentContainer.position).add(new THREE__namespace.Vector3(.7 * this.radius, .3 * -this.radius, this.radius)), this.highlightPoint = new THREE__namespace.Vector3().copy(this.parentContainer.position).add(new THREE__namespace.Vector3(1.5 * -this.radius, 1.5 * -this.radius, 0)), this.frontPoint = new THREE__namespace.Vector3().copy(this.parentContainer.position).add(new THREE__namespace.Vector3(0, 0, this.radius));
        const r = new Earth({
          radius: this.radius,
          detail: 55,
          renderer: this.renderer,
          shadowPoint: this.shadowPoint,
          shadowDist: 1.5 * this.radius,
          highlightPoint: this.highlightPoint,
          highlightColor: 5339494,
          highlightDist: 5,
          frontPoint: this.frontPoint,
          frontHighlightColor: 2569853,
          waterColor: 1513012,
          landColorFront: fl,
          landColorBack: fl
        });
        this.container.add(r.mesh), this.globe = r; // 发光光源

        const s = new THREE__namespace.Mesh(new THREE__namespace.SphereBufferGeometry(cl, 45, 45), new THREE__namespace.ShaderMaterial({
          uniforms: {
            c: {
              type: "f",
              value: .7
            },
            p: {
              type: "f",
              value: 15
            },
            glowColor: {
              type: "c",
              value: new THREE__namespace.Color(0x1c2462)
            },
            viewVector: {
              type: "v3",
              value: new THREE__namespace.Vector3(0, 0, 220)
            }
          },
          vertexShader: `
            #define GLSLIFY 1
            uniform vec3 viewVector;
            uniform float c;
            uniform float p;
            varying float intensity;
            void main()
            {
                vec3 vNormal = normalize( normalMatrix * normal );
                vec3 vNormel = normalize( normalMatrix * viewVector );
                intensity = pow( c - dot(vNormal, vNormel), p );

                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }`,
          fragmentShader: `
            #define GLSLIFY 1
            uniform vec3 glowColor;
            varying float intensity;
            void main()
            {
                vec3 glow = glowColor * intensity;
                gl_FragColor = vec4( glow, 1.0 );
            }`,
          side: 1,
          blending: 2,
          transparent: !0
        }));
        s.name = "GlowLight";
        s.scale.multiplyScalar(1.15), s.rotateX(.03 * Math.PI), s.rotateY(.03 * Math.PI), s.renderOrder = 3, this.haloContainer.add(s);
        this.dragging = !1, this.rotationSpeed = .5, this.raycastIndex = 0, this.raycastTrigger = 10, this.raycastTargets = [], this.intersectTests = [], this.controls = new MouseEvent({
          object: this.container,
          objectContainer: this.parentContainer,
          domElement: this.renderer.domElement,
          setDraggingCallback: this.setDragging,
          rotateSpeed: t ? 1.5 : 3,
          autoRotationSpeed: this.rotationSpeed,
          easing: .12,
          maxRotationX: .5,
          camera: this.camera
        });
      }

      initDataObjects(t) {
        this.buildWorldGeometry(), this.addArcticCodeVault(), this.maxAmount = t.length, this.maxIndexDistance = 60, this.indexIncrementSpeed = 15, this.visibleIndex = 60; // this.openPrEntity = new Beam({
        //     data: t,
        //     maxAmount: this.maxAmount,
        //     radius: this.radius,
        //     particleDiffuse: i,
        //     camera: this.camera,
        //     maxIndexDistance: this.maxIndexDistance,
        //     indexIncrementSpeed: this.indexIncrementSpeed,
        //     visibleIndex: this.visibleIndex,
        //     colors: e
        // });
        // this.mergedPrEntity = new FlyLine({
        //     data: t,
        //     maxAmount: this.maxAmount,
        //     radius: this.radius,
        //     camera: this.camera,
        //     maxIndexDistance: this.maxIndexDistance,
        //     visibleIndex: this.visibleIndex,
        //     colors: e,
        //     mouse: this.mouse
        // });

        const {
          width: s,
          height: o
        } = bl.parentNode.getBoundingClientRect(),
              c = 850 / o * 1;
        this.containerScale = c, // this.dataInfo = new Label({
        //     parentSelector: ".js-webgl-globe-data",
        //     domElement: this.renderer.domElement,
        //     controls: this.controls
        // }),
        this.dataItem = {}, this.intersectTests.push(this.globe.meshFill), // this.intersectTests.push(this.openPrEntity.spikeIntersects),
        // this.intersectTests.push(...this.mergedPrEntity.lineHitMeshes),
        this.intersects = [];
      }

      monitorFps() {
        if (1 == this.renderQuality) return;
        const t = Date.now() / 1e3,
              e = t - this.then;
        this.then = t;
        const n = parseInt(1 / e + .5);
        this.fpsStorage.push(n), this.fpsStorage.length > 10 && this.fpsStorage.shift();
        const i = this.fpsStorage.reduce((t, e) => t + e) / this.fpsStorage.length;
        i < this.fpsTarget * this.fpsTargetSensitivity && this.fpsStorage.length > 9 ? (this.fpsWarnings++, this.fpsWarnings > this.fpsWarningThreshold && (this.renderQuality = Math.max(this.renderQuality - 1, 1), this.fpsWarnings = 0, this.updateRenderQuality(), this.fpsStorage = [])) : this.fpsStorage.length > 9 && i < this.fpsEmergencyThreshold ? (this.renderQuality = 1, this.initPerformanceEmergency()) : this.fpsWarnings = 0;
      }

      updateRenderQuality() {
        4 == this.renderQuality ? this.initRegularQuality() : 3 == this.renderQuality ? this.initMediumQuality() : 2 == this.renderQuality ? this.initLowQuality() : 1 == this.renderQuality && this.initLowestQuality();
      }

      initRegularQuality() {
        this.renderer.setPixelRatio(bl.pixelRatio || 1), this.indexIncrementSpeed = 15, this.raycastTrigger = 10;
      }

      initMediumQuality() {
        this.renderer.setPixelRatio(Math.min(bl.pixelRatio, 1.85)), this.indexIncrementSpeed = 13, this.raycastTrigger = 12;
      }

      initLowQuality() {
        this.renderer.setPixelRatio(Math.min(bl.pixelRatio, 1.5)), this.indexIncrementSpeed = 10, this.raycastTrigger = 14, this.worldDotRows = 180, this.worldDotSize = .1, this.resetWorldMap(), this.buildWorldGeometry();
      }

      initLowestQuality() {
        this.renderer.setPixelRatio(1), this.indexIncrementSpeed = 5, this.raycastTrigger = 16, this.worldDotRows = 140, this.worldDotSize = .1, this.resetWorldMap(), this.buildWorldGeometry();
      }

      initPerformanceEmergency() {
        this.dispose(), Ol();
      }

      buildWorldGeometry() {
        const {
          assets: {
            textures: {
              worldMap: t
            }
          }
        } = bl,
              e = new THREE__namespace.Light(),
              n = this.getImageData(t.image),
              i = [],
              r = this.worldDotRows;

        for (let h = -90; h <= 90; h += 180 / r) {
          const t = Math.cos(Math.abs(h) * Ml) * cl * Math.PI * 2 * 2;

          for (let r = 0; r < t; r++) {
            const s = 360 * r / t - 180;
            if (!this.visibilityForCoordinate(s, h, n)) continue;
            const o = Rl(h, s, this.radius);
            e.position.set(o.x, o.y, o.z);
            const c = Rl(h, s, this.radius + 5);
            e.lookAt(c.x, c.y, c.z), e.updateMatrix(), i.push(e.matrix.clone());
          }
        }

        const s = new THREE__namespace.CircleBufferGeometry(this.worldDotSize, 5),
              o = new THREE__namespace.MeshStandardMaterial({
          color: 3818644,
          metalness: 0,
          roughness: .9,
          // transparent: !0,
          side: THREE__namespace.DoubleSide,
          alphaTest: .02
        });

        o.onBeforeCompile = function (t) {
          t.fragmentShader = t.fragmentShader.replace("gl_FragColor = vec4( outgoingLight, diffuseColor.a );", "\n        gl_FragColor = vec4( outgoingLight, diffuseColor.a );\n        if (gl_FragCoord.z > 0.51) {\n          gl_FragColor.a = 1.0 + ( 0.51 - gl_FragCoord.z ) * 17.0;\n        }\n      ");
        };

        const c = new THREE__namespace.InstancedMesh(s, o, i.length);

        for (let h = 0; h < i.length; h++) c.setMatrixAt(h, i[h]);

        c.renderOrder = 3, this.worldMesh = c, c.name = "points";
        this.container.add(c);
      }

      resetWorldMap() {
        this.container.remove(this.worldMesh), Ll(this.worldMesh), this.dotMesh = null;
      }

      addArcticCodeVault() {
        new THREE__namespace.CylinderBufferGeometry(.075, .075, 1.5, 8), this.vaultMaterial = new THREE__namespace.MeshBasicMaterial({
          blending: 2,
          opacity: .9,
          transparent: !0,
          color: 4299263
        }), this.vaultIsHighlighted = !1;
        const t = Rl(39.56, 116.20, this.radius),
              e = Rl(39.56, 116.20, this.radius + 5),
              {
          basePath: n,
          imagePath: i
        } = bl,
              r = `${n}${i}flag.obj`;
        new THREE__namespace.OBJLoader().load(r, n => {
          n.position.set(t.x, t.y, t.z), n.lookAt(e.x, e.y, e.z), n.rotateX(90 * Ml), n.scale.set(.1, .1, .1), n.renderOrder = 3;

          for (const t of n.children) t.material = this.vaultMaterial, t.name = "arcticCodeVault", this.arcticCodeVaultMesh = t, this.intersectTests.push(this.arcticCodeVaultMesh);

          this.container.add(n);
        });
      }

      highlightArcticCodeVault() {
        this.vaultIsHighlighted || (this.arcticCodeVaultMesh.material = this.highlightMaterial, this.vaultIsHighlighted = !0);
      }

      resetArcticCodeVaultHighlight() {
        this.vaultIsHighlighted && (this.arcticCodeVaultMesh.material = this.vaultMaterial, this.vaultIsHighlighted = !1);
      }

      visibilityForCoordinate(t, e, n) {
        const i = 4 * n.width,
              r = parseInt((t + 180) / 360 * n.width + .5),
              s = n.height - parseInt((e + 90) / 180 * n.height - .5),
              o = parseInt(i * (s - 1) + 4 * r) + 3;
        return n.data[o] > 90;
      }

      getImageData(t) {
        const e = document.createElement("canvas").getContext("2d");
        return e.canvas.width = t.width, e.canvas.height = t.height, e.drawImage(t, 0, 0, t.width, t.height), e.getImageData(0, 0, t.width, t.height);
      }

      addListeners() {
        window.addEventListener("resize", this.handleResize, !1), window.addEventListener("orientationchange", this.handleResize, !1), window.addEventListener("scroll", this.handleScroll, !1), // this.handleClick = t=>{
        //     null === this.dataItem || null === this.dataItem.url || this.shouldCancelClick(t) || window.open(this.dataItem.url, "_blank")
        // }
        //,
        // this.renderer.domElement.addEventListener("mouseup", this.handleClick, !1),
        this.handleMouseDown = t => {
          this.resetInteractionIntention(t);
        }, this.renderer.domElement.addEventListener("mousedown", this.handleMouseDown, !1), this.handleTouchStart = t => {
          const e = t.changedTouches[0];
          this.handleMouseMove(e), this.resetInteractionIntention(e), t.preventDefault();
        }, this.renderer.domElement.addEventListener("touchstart", this.handleTouchStart, !1), this.handleTouchMove = t => {
          this.shouldCancelClick(t.changedTouches[0]) && (this.mouse = {
            x: -9999,
            y: -9999
          }, t.preventDefault());
        }, this.renderer.domElement.addEventListener("touchmove", this.handleTouchMove, !1), this.renderer.domElement.addEventListener("mousemove", this.handleMouseMove, !1);
      }

      removeListeners() {
        window.removeEventListener("resize", this.handleResize), window.removeEventListener("orientationchange", this.handleResize), window.removeEventListener("scroll", this.handleScroll), this.renderer.domElement.removeEventListener("mousemove", this.handleMouseMove), this.renderer.domElement.removeEventListener("mouseup", this.handleClick), this.renderer.domElement.removeEventListener("mousedown", this.handleMouseDown), this.renderer.domElement.removeEventListener("touchstart", this.handleTouchStart), this.renderer.domElement.removeEventListener("touchmove", this.handleTouchMove);
      }

      updateCanvasOffset() {
        const t = document.querySelector(".js-webgl-globe-data").getBoundingClientRect(),
              e = document.querySelector(".js-webgl-globe").getBoundingClientRect();
        this.canvasOffset = {
          x: e.x - t.x,
          y: e.y - t.y
        };
      }

      resetInteractionIntention(t) {
        this.mouseDownPos = {
          x: t.clientX,
          y: t.clientY
        };
      }

      shouldCancelClick(t) {
        const e = Math.abs(t.clientX - this.mouseDownPos.x);
        return Math.abs(t.clientY - this.mouseDownPos.y) > 2 || e > 2;
      }

      positionContainer() {
        const {
          isMobile: t,
          parentNode: e
        } = bl,
              {
          height: n
        } = e.getBoundingClientRect(),
              i = 850 / n * 1;
        this.containerScale = i, t ? this.parentContainer.position.set(0, 0, 0) : (this.parentContainer.scale.set(i, i, i), this.parentContainer.position.set(0, 0, 0), this.haloContainer.scale.set(i, i, i)), this.haloContainer.position.set(0, 0, -10), this.positionLights(i);
      }

      positionLights(t = 1) {
        this.light0 && (this.light0.position.set(this.parentContainer.position.x - 2.5 * this.radius, 80, -40).multiplyScalar(t), this.light0.distance = 120 * t), this.light1 && this.light1.position.set(this.parentContainer.position.x - 50, this.parentContainer.position.y + 30, 10).multiplyScalar(t), this.light2 && (this.light2.position.set(this.parentContainer.position.x - 25, 0, 100).multiplyScalar(t), this.light2.distance = 150 * t), this.light3 && (this.light3.position.set(this.parentContainer.position.x + this.radius, this.radius, 2 * this.radius).multiplyScalar(t), this.light3.distance = 75 * t);
      }

      handlePause() {
        this.stopUpdating(), this.clock.stop();
      }

      handleResume() {
        this.clock.start(), this.startUpdating();
      }

      handleScroll() {
        window.scrollY >= this.renderer.domElement.getBoundingClientRect().height && !this.paused ? (this.paused = !0, _l_pause.dispatch(vl$1)) : window.scrollY < this.renderer.domElement.getBoundingClientRect().height && this.paused && (this.paused = !1, _l_resume.dispatch(yl$1));
      }

      handleResize() {
        clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(() => {
          const {
            width: t,
            height: e
          } = bl.parentNode.getBoundingClientRect();
          this.camera.aspect = t / e, this.camera.updateProjectionMatrix(), this.renderer.setSize(t, e), this.positionContainer();
          const n = 850 / e * 1,
                i = this.radius * n;
          this.shadowPoint.copy(this.parentContainer.position).add(new THREE__namespace.Vector3(.7 * i, .3 * -i, i)), this.globe.setShadowPoint(this.shadowPoint), this.highlightPoint.copy(this.parentContainer.position).add(new THREE__namespace.Vector3(1.5 * -i, 1.5 * -i, 0)), this.globe.setHighlightPoint(this.highlightPoint), this.frontPoint = new THREE__namespace.Vector3().copy(this.parentContainer.position).add(new THREE__namespace.Vector3(0, 0, i)), this.globe.setFrontPoint(this.frontPoint), this.globe.setShadowDist(1.5 * i), this.globe.setHighlightDist(5 * n), this.updateCanvasOffset();
        }, 150);
      }

      handleMouseMove(t) {
        null != t.preventDefault && t.preventDefault();
        const {
          width: e,
          height: n,
          x: i,
          y: r
        } = bl.parentNode.getBoundingClientRect(),
              s = t.clientX - i,
              o = t.clientY - r;
        this.mouse.x = s / e * 2 - 1, this.mouse.y = -o / n * 2 + 1, this.mouseScreenPos.set(s, o);
      }

      startUpdating() {
        this.stopUpdating(), this.update();
      }

      stopUpdating() {
        cancelAnimationFrame(this.rafID);
      }

      setDragging(t = !0) {
        this.dragging = t;
      }

      setDataInfo(t) {
        return;
      }

      testForDataIntersection() {
        const {
          mouse: t,
          raycaster: e,
          camera: n
        } = this;
        this.intersects.length = 0, function (t, e, n, i, r, s = !1) {
          (i = i || new THREE__namespace.Raycaster()).setFromCamera(t, e);
          const o = i.intersectObjects(n, s, r);
          o.length > 0 && o[0];
        }(t, n, this.intersectTests, e, this.intersects), this.intersects.length && this.intersects[0].object === this.globe.meshFill && (this.intersects.length = 0);
      }

      transitionIn() {
        return new Promise(() => {
          // this.container.add(this.openPrEntity.mesh),
          this.container.add(this.mergedPrEntity.mesh);
        });
      }

      handleUpdate() {
        if (this.monitorFps(), null === this.clock) return;
        const t = this.clock.getDelta();
        if (this.controls && this.controls.update(t), this.visibleIndex += t * this.indexIncrementSpeed, this.visibleIndex >= this.maxAmount - 60 && (this.visibleIndex = 60), // this.openPrEntity && this.openPrEntity.update(this.visibleIndex),
        // this.mergedPrEntity && this.mergedPrEntity.update(t, this.visibleIndex),
        !this.dataInfo) return void this.render();
        const {
          raycaster: e,
          camera: n,
          mouseScreenPos: i
        } = this;
        let r,
            s = !1;

        if (this.raycastIndex % this.raycastTrigger == 0) {
          if (this.testForDataIntersection(), this.intersects.length) {
            this.radius, this.containerScale;

            for (let t = 0; t < this.intersects.length && !s; t++) {
              const {
                instanceId: e,
                object: n
              } = this.intersects[t];

              if ("lineMesh" === n.name) {
                r = this.setMergedPrEntityDataItem(n), s = !0;
                break;
              } // if (n === this.openPrEntity.spikeIntersects && this.shouldShowOpenPrEntity(e)) {
              //     r = this.setOpenPrEntityDataItem(e),
              //     s = !0;
              //     break
              // }


              if ("arcticCodeVault" === n.name) {
                r = {
                  header: "Arctic Code Vault",
                  body: "Svalbard • Cold storage of the work of 3,466,573 open source developers. For safe keeping.\nLearn more →",
                  type: pl,
                  url: "https://archiveprogram.github.com"
                }, this.highlightArcticCodeVault(), s = !0;
                break;
              }
            }
          }

          s && r ? (this.setDataInfo(r), this.dataInfo.show()) : (this.dataInfo.hide(), // this.openPrEntity.setHighlightIndex(-9999),
          // this.mergedPrEntity.resetHighlight(),
          this.resetArcticCodeVaultHighlight(), this.dataItem = null, bl.isMobile && (this.mouse = {
            x: -9999,
            y: -9999
          }));
        }

        this.dragging && (this.dataInfo.hide(), // this.openPrEntity.setHighlightIndex(-9999),
        // this.mergedPrEntity.resetHighlight(),
        this.resetArcticCodeVaultHighlight()), this.dataInfo.isVisible && this.dataInfo.update(i, this.canvasOffset), this.raycastIndex++, this.raycastIndex >= this.raycastTrigger && (this.raycastIndex = 0), this.render();
      }

      update() {
        this.handleUpdate(), this.hasLoaded || this.sceneDidLoad(), this.rafID = requestAnimationFrame(this.update);
      }

      render() {
        this.renderer.render(this.scene, this.camera);
      }

      shouldShowMergedPrEntity(t, e) {
        const n = t.geometry.attributes.index.array[e];
        return n >= this.visibleIndex - this.maxIndexDistance && n <= this.visibleIndex + this.maxIndexDistance;
      }

      sceneDidLoad() {
        this.hasLoaded = !0;
        const t = document.querySelector(".js-webgl-globe-loading");
        if (!t) return;
        const e = {
          fill: "both",
          duration: 600,
          easing: "ease"
        };
        this.renderer.domElement.animate([{
          opacity: 0,
          transform: "scale(0.8)"
        }, {
          opacity: 1,
          transform: "scale(1)"
        }], e), t.animate([{
          opacity: 1,
          transform: "scale(0.8)"
        }, {
          opacity: 0,
          transform: "scale(1)"
        }], e).addEventListener("finish", () => {
          t.remove();
        });
      }

      setMergedPrEntityDataItem(t) {
        // this.mergedPrEntity.setHighlightObject(t),
        // this.openPrEntity.setHighlightIndex(-9999);
        // const e = this.mergedPrEntity.props.data[parseInt(t.userData.dataIndex)];
        return e.type = dl, e;
      }

      shouldShowOpenPrEntity(t) {
        return t >= this.visibleIndex - this.maxIndexDistance && t <= this.visibleIndex + this.maxIndexDistance;
      }

      setOpenPrEntityDataItem(t) {
        // this.openPrEntity.setHighlightIndex(t);
        // this.mergedPrEntity.resetHighlight();
        const e = this.openPrEntity.props.data[t];
        return e.type = ul, e;
      }

      dispose() {
        this.stopUpdating(), this.removeListeners(), _l_pause.removeAll(vl$1, this.handlePause), _l_resume.removeAll(yl$1, this.handleResume), this.renderer && this.renderer.domElement && this.renderer.domElement.parentNode && this.renderer.domElement.parentNode.removeChild(this.renderer.domElement), this.controls && this.controls.dispose(), this.globe && this.globe.dispose(), // this.openPrEntity && this.openPrEntity.dispose(),
        // this.mergedPrEntity && this.mergedPrEntity.dispose(),
        this.dataInfo && this.dataInfo.dispose(), this.scene = null, this.camera = null, this.renderer = null, this.parentContainer = null, this.container = null, this.clock = null, this.mouse = null, this.mouseScreenPos = null, this.raycaster = null, this.paused = null, this.radius = null, this.light0 = null, this.light1 = null, this.light2 = null, this.light3 = null, this.shadowPoint = null, this.highlightPoint = null, this.frontPoint = null, this.globe = null, this.dragging = null, this.rotationSpeed = null, this.raycastIndex = null, this.raycastTrigger = null, this.raycastTargets = null, this.intersectTests = null, this.controls = null, this.maxAmount = null, this.maxIndexDistance = null, this.indexIncrementSpeed = null, this.visibleIndex = null; // this.openPrEntity = null
      }

    }

    class Device {
      constructor(t) {
        for (let i in t) {
          bl[i] = t[i];
        }

        this.init = this.init.bind(this), this.handleVisibilityChange = this.handleVisibilityChange.bind(this), function (t) {
          for (const [e, n] of Object.entries(t)) bl[e] = n;
        }({
          app: this,
          env: "production",
          imagePath: "images/",
          isMobile: /iPhone|iPad|iPod|Android|BlackBerry|BB10/i.test(navigator.userAgent),
          pixelRatio: window.devicePixelRatio || 1
        });
      }

      loadAssets() {
        const {
          basePath: t,
          imagePath: e
        } = bl,
              n = [{
          url: `${t}${e}particle-diffuse.png`,
          id: "particleDiffuse"
        }, {
          url: `${t}${e}map.png`,
          id: "worldMap"
        }],
              i = new ResLoader();
        return new Promise((t, e) => {
          i.load(n).then(({
            assets: e
          }) => {
            t(e), i.dispose();
          }).catch(t => e(t));
        });
      }

      trackPageVisibility() {
        let t, e;
        void 0 !== document.hidden ? (t = "hidden", e = "visibilitychange") : void 0 !== document.msHidden ? (t = "msHidden", e = "msvisibilitychange") : void 0 !== document.webkitHidden && (t = "webkitHidden", e = "webkitvisibilitychange"), this.documentHidden = t, this.visibilityChange = e, document.addEventListener(e, this.handleVisibilityChange, !1);
      }

      init() {
        return new Promise((t, e) => {
          this.loadAssets().then(n => {
            bl.assets = n;
            const {
              parentNode: i = document.body
            } = bl;
            this.webglController = new Stage(i), this.webglController.initDataObjects([]), this.trackPageVisibility(), t();
          }).catch(t => {
            e(t);
          });
        });
      }

      handleVisibilityChange() {
        document[this.documentHidden] ? _l_pause.dispatch() : _l_resume.dispatch();
      }

      get renderer() {
        return this.webglController ? this.webglController.renderer : null;
      }

      get canvas() {
        return this.webglController ? this.webglController.renderer.domElement : null;
      }

      dispose() {
        document.removeEventListener(this.visibilityChange, this.handleVisibilityChange), this.webglController.dispose(), this.webglController = null, this.visibilityChange = null, this.documentHidden = null, Object.keys(bl).forEach(t => {
          delete bl[t];
        });
      }

    }

    function Ol$1() {
      const t = document.querySelector(".js-webgl-globe");
      if (!t) return;
      if (!t.hasChildNodes()) return;
      const e = t.parentNode;
      e && e.classList.remove("home-globe-container-webgl");
      const n = t.querySelector(".js-webgl-globe-loading");
      n && t.removeChild(n);
      const i = t.querySelector(".js-globe-canvas");
      i && t.removeChild(i);
      const r = t.querySelector(".js-globe-popup");
      r && t.removeChild(r), t.querySelector(".js-globe-fallback-image").removeAttribute("hidden");
    }

    window.onload = () => {
      const t = new Device({
        basePath: "js/webgl-globe/",
        parentNode: document.querySelector(".js-webgl-globe"),
        globeRadius: cl,
        spikeRadius: .06
      });
      window.lm = t;
      t.init().then(() => {
        t.canvas.addEventListener("webglcontextlost", Ol$1, !1);
      });
    };

}));
