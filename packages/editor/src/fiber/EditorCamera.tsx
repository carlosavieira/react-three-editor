import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { folder, levaStore, useControls } from "leva"
import React, { useEffect } from "react"
import { useThree } from "@react-three/fiber"
import { editable } from "../editable/editable"

export function EditorCamera() {
  const props = useControls(
    "editor",
    {
      camera: folder({
        enabled: false,
        position: {
          value: [-6.836465353768794, 3.1169378502902387, -2.747260436170274],
          step: 0.1
        },
        fov: { value: 75, min: 1, max: 180 },
        near: { value: 0.1, min: 0.1, max: 100 },
        far: { value: 1000, min: 0.1, max: 10000 }
      })
    },
    {
      collapsed: true,
      order: 1000
    }
  )

  const camera = useThree((c) => c.camera)

  const ref = React.useRef()

  useEffect(() => {
    if (!ref.current) {
      ref.current = camera
    }
    // console.log(camera)
  }, [])

  // useHelper(ref, CameraHelper)
  const controls = useThree((c) => c.controls)
  const ref2 = React.useRef()

  useEffect(() => {
    function update(e) {
      if (props.enabled) {
        console.log(e.target.object.position)
        levaStore.setValueAtPath(
          "editor.camera.position",
          e.target.object.position.toArray(),
          false
        )
      }
    }
    controls?.addEventListener("change", update)

    return () => {
      controls?.removeEventListener("change", update)
    }

    // levaStore.useStore.subscribe((s) => s.data["editor.camera.position"], {
    // })
  }, [controls, props.enabled])

  return (
    <>
      {props.enabled && <PerspectiveCamera {...props} makeDefault />}
      {props.enabled && (!controls || ref2.current === controls) && (
        <OrbitControls ref={ref2} onChange={console.log} makeDefault />
      )}
      <editable.primitive
        name="Camera"
        object={ref.current || camera}
        _source={{}}
      />
      {/* <PerspectiveCamera makeDefault /> */}
    </>
  )
}
