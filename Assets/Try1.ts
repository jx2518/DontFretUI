@component
export class Try1 extends BaseScriptComponent {
    // Expose a texture property to the Inspector
    public imageTexture: Texture | null = null;

    private scrollSpeed: number = 50.0; // Speed of scrolling
    private scrollPosition: number = 0; // Current scroll position
    private imageObject: SceneObject | null = null; // Reference to the image object
    private imageTransform: Transform | null = null;

    onAwake() {
        // Ensure the texture is assigned
        if (!this.imageTexture) {
            print("Error: Image texture not assigned. Assign it in the Inspector panel.");
            return;
        }

        // Create a new SceneObject for the image
        this.imageObject = global.scene.createSceneObject("ScrollingImage");

        if (this.imageObject) {
            // Add an Image Component to the SceneObject
            const imageComponent = this.imageObject.createComponent("Component.Image");

            // Assign the texture to the Image Component
            imageComponent.mainPass.baseTex = this.imageTexture;

            // Get the Transform of the image object
            this.imageTransform = this.imageObject.getTransform();

            // Set the initial scale and position of the image
            if (this.imageTransform) {
                this.imageTransform.setLocalScale(new vec3(1, 3, 1)); // Adjust scale as needed
                this.imageTransform.setLocalPosition(new vec3(0, 0, 0));
            }
        }
    }

    onUpdate(deltaTime: number) {
        if (this.imageTransform) {
            // Update the scroll position
            this.scrollPosition -= this.scrollSpeed * deltaTime;

            // Get the height of the image (using its local scale)
            const imageHeight = this.imageTransform.getLocalScale().y;

            // Reset position when the image scrolls out of view
            if (this.scrollPosition < -imageHeight) {
                this.scrollPosition = 0; // Reset to the top
            }

            // Update the position of the image
            this.imageTransform.setLocalPosition(new vec3(0, this.scrollPosition, 0));
        }
    }
}
