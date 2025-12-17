# Module 1: The Robotic Nervous System (ROS 2)

## Introduction

The Robot Operating System 2 (ROS 2) is not merely an operating system; it is a meta-operating system—a flexible framework encompassing tools, libraries, and conventions specifically designed for developing complex robotic applications. Building upon the foundational success of its predecessor, ROS 2 was engineered to address the demanding requirements of modern robotics, including real-time control, multi-robot systems, embedded platforms, and industrial applications. Its distributed architecture facilitates modular, scalable, and robust robot behaviors across a diverse range of hardware platforms. This module delves into the core concepts of ROS 2, emphasizing its architectural underpinnings, communication paradigms, and crucial tools for humanoid robotics development.

## ROS 2 Architecture: Nodes, Topics, Services, Actions, and DDS

ROS 2's distributed nature is its most significant advantage, enabling components of a robotic system to operate independently while seamlessly communicating. This is achieved through several core concepts:

### Nodes

Nodes are the fundamental computational units within ROS 2. Each node is an executable process responsible for a specific task. By decomposing a robot's functionality into numerous, interconnected nodes, developers can manage complexity, facilitate parallel development, and enhance system fault tolerance. For a humanoid robot, nodes might include:
-   **Perception Nodes:** Handle data acquisition from cameras, LiDAR, and depth sensors, performing tasks like object detection, facial recognition, or scene segmentation.
-   **Control Nodes:** Manage joint actuation, balance control, and locomotion planning, converting high-level commands into motor signals.
-   **Navigation Nodes:** Process sensor data to build maps, localize the robot within those maps, and plan collision-free paths.
-   **Human-Robot Interaction Nodes:** Interpret voice commands (using speech-to-text), generate synthetic speech (text-to-speech), or recognize human gestures.

### Topics

Topics implement a publish-subscribe communication model, serving as asynchronous data streams where nodes can exchange messages without direct knowledge of each other's existence. This decoupled communication fosters modularity. Publishers send messages to a named topic, while subscribers receive all messages published on that topic.
-   **Example in Humanoid Robotics:** A camera node might publish high-frequency image data to a topic like `/perception/camera/image_raw`. A visual processing node subscribes to this topic, processes the images to detect obstacles, and then publishes obstacle information to `/navigation/obstacles`. Meanwhile, a base control node might publish odometry data to `/odom`, and other nodes, such as a localization node, subscribe to it.

### Services

Services provide a synchronous, request-reply communication mechanism ideal for operations that require an immediate response. A client node sends a request to a service-providing node and blocks until it receives a response.
-   **Example in Humanoid Robotics:** A client node (e.g., a high-level task planner) might request a specific manipulation action from a "gripper control" service node via a `/manipulation/grasp_object` service. The gripper control node executes the command (e.g., closes the gripper), and upon completion, sends back a success/failure status. This ensures that the planner knows the outcome of the action before proceeding.

### Actions

Actions are designed for long-running, goal-oriented tasks that require periodic feedback and can be preempted. They extend the service concept by allowing clients to send a goal, receive continuous feedback on the goal's progress, and eventually obtain a result. Actions are crucial for complex, multi-stage behaviors common in humanoid robots.
-   **Example in Humanoid Robotics:** A "navigate to goal" action might be initiated by a high-level command. The navigation action server continuously sends feedback (e.g., current position, estimated time to arrival) while the robot is moving. If the environment changes unexpectedly, or a higher-priority task emerges, the navigation action can be preempted.

### Data Distribution Service (DDS)

At the heart of ROS 2's communication is the Data Distribution Service (DDS), an open standard for real-time systems. DDS handles the discovery, serialization, transport, and delivery of messages between nodes, providing crucial Quality of Service (QoS) policies. Unlike ROS 1's custom TCP/IP-based communication, DDS offers:
-   **Decentralization:** No central master, improving robustness and scalability.
-   **Quality of Service (QoS):** Configurable policies for reliability, durability, history, and deadline, allowing developers to fine-tune communication for specific real-time requirements.
-   **Real-time Performance:** Optimized for low-latency, high-throughput data exchange.

### Quality of Service (QoS) Policies

QoS policies in ROS 2 allow developers to specify the desired behavior of communication channels, ensuring messages are delivered reliably and efficiently according to application needs. Key QoS policies include:
-   **Reliability:** Guarantees message delivery (at the cost of potential latency) or allows messages to be dropped for faster transmission (best-effort).
-   **Durability:** Determines whether late-joining subscribers receive previously published messages.
-   **History:** Specifies how many messages (or how much data) a publisher should retain for new subscribers.
-   **Deadline:** Enforces a maximum expected time between message publications; useful for monitoring real-time data streams.

## ROS 2 Python Nodes with `rclpy`

`rclpy` is the Python client library for ROS 2, providing an intuitive and powerful interface for developing ROS 2 nodes using Python.

### Complete Publisher/Subscriber Class Structure (Python)

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

# --- Publisher Node ---
class SimplePublisher(Node):
    def __init__(self):
        # Initialize the Node with a unique name
        super().__init__('simple_publisher_node')
        # Create a publisher to the 'chatter' topic, publishing String messages
        # The queue size (10) specifies how many messages to buffer if subscribers are slow
        self.publisher_ = self.create_publisher(String, 'chatter', 10)
        self.timer_period = 0.5  # seconds between messages
        self.timer = self.create_timer(self.timer_period, self.timer_callback)
        self.i = 0 # Counter for messages

    def timer_callback(self):
        # Create a String message
        msg = String()
        msg.data = f'Hello from ROS 2 Publisher: {self.i}'
        # Publish the message
        self.publisher_.publish(msg)
        # Log the published message
        self.get_logger().info(f'Published: "{msg.data}"')
        self.i += 1

# --- Subscriber Node ---
class SimpleSubscriber(Node):
    def __init__(self):
        # Initialize the Node with a unique name
        super().__init__('simple_subscriber_node')
        # Create a subscriber to the 'chatter' topic, expecting String messages
        # When a message is received, call the 'listener_callback' method
        self.subscription = self.create_subscription(
            String,
            'chatter',
            self.listener_callback,
            10)
        # Prevent unused variable warning
        self.subscription

    def listener_callback(self, msg):
        # Log the received message
        self.get_logger().info(f'Received: "{msg.data}"')

def main(args=None):
    # Initialize the ROS 2 client library
    rclpy.init(args=args)

    # Create instances of the publisher and subscriber nodes
    publisher_node = SimplePublisher()
    subscriber_node = SimpleSubscriber()

    # Create an executor to manage the execution of nodes
    # A MultiThreadedExecutor can process multiple callbacks concurrently
    executor = rclpy.executors.MultiThreadedExecutor()
    executor.add_node(publisher_node)
    executor.add_node(subscriber_node)

    try:
        # Spin the executor to start processing callbacks
        executor.spin()
    except KeyboardInterrupt:
        pass
    finally:
        # Shutdown nodes and executor cleanly
        publisher_node.destroy_node()
        subscriber_node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
```

To run this example, save it as `simple_talker_listener.py`. Then, from your ROS 2 workspace (after sourcing your setup file), you would run:
`python3 simple_talker_listener.py`

## Launch Files & Parameters

ROS 2 `launch` system is used to start and configure multiple nodes simultaneously, managing parameters, remappings, and compositions. This is essential for orchestrating complex robotic systems.

### `launch.py` Configuration

Launch files in ROS 2 are written in Python, offering powerful programmatic control over the launch process.

*Example `my_robot_launch.py`:*
```python
from launch import LaunchDescription
from launch_ros.actions import Node
from launch.substitutions import LaunchConfiguration
from launch.actions import DeclareLaunchArgument

def generate_launch_description():
    # Declare a launch argument for the robot's namespace
    robot_namespace_arg = DeclareLaunchArgument(
        'robot_namespace',
        default_value='humanoid_robot',
        description='Namespace for the robot nodes'
    )

    # Node for controlling the robot's base
    base_controller_node = Node(
        package='my_robot_controller',
        executable='base_controller',
        namespace=LaunchConfiguration('robot_namespace'),
        name='base_controller',
        parameters=[
            {'linear_speed': 0.5},
            {'angular_speed': 0.8}
        ],
        output='screen'
    )

    # Node for processing camera data
    camera_processor_node = Node(
        package='my_vision_package',
        executable='camera_processor',
        namespace=LaunchConfiguration('robot_namespace'),
        name='camera_processor',
        remappings=[
            ('/image_raw', '/robot_sensors/camera/image_raw'),
            ('/detected_objects', '/robot_perception/objects')
        ],
        output='screen'
    )

    # Node for a simple LiDAR sensor
    lidar_sensor_node = Node(
        package='my_sensors_package',
        executable='lidar_sensor',
        namespace=LaunchConfiguration('robot_namespace'),
        name='lidar_sensor',
        parameters=[
            {'frame_id': 'lidar_link'},
            {'scan_topic': '/robot_sensors/lidar/scan'}
        ],
        output='screen'
    )

    return LaunchDescription([
        robot_namespace_arg,
        base_controller_node,
        camera_processor_node,
        lidar_sensor_node
    ])
```
To run this launch file, you would use: `ros2 launch my_robot_package my_robot_launch.py`

### Parameters

Parameters in ROS 2 allow dynamic configuration of nodes at runtime. They can be set directly in launch files or via the `ros2 param` command-line tool. This flexibility enables easier tuning of robot behavior without recompiling code.

## URDF & Kinematics

The Unified Robot Description Format (URDF) is an XML format for describing all elements of a robot, including its physical properties, visual appearance, and kinematic structure. For humanoid robots, a detailed URDF model is indispensable for accurate simulation, motion planning, and visualization.

### Links

A `<link>` element defines a rigid body segment of the robot. Each link has associated geometric (visual and collision models) and inertial properties (mass, inertia matrix).
-   **Example:** For a humanoid, links might represent the torso, head, upper arms, forearms, hands, upper legs, lower legs, and feet.

### Joints

A `<joint>` element describes the kinematic and dynamic properties of the connection between two links. Joints specify how links move relative to each other.
-   **Types:** Revolute (rotating about an axis), Prismatic (sliding along an axis), Fixed (rigid connection), Continuous (revolute with no limits).
-   **Example:** A `revolute` joint might connect the upper arm to the shoulder, allowing rotation. A `fixed` joint might attach a camera to the head link.

### The TF2 Transform Tree

TF2 is a ROS 2 package that keeps track of the relationships between coordinate frames over time. In robotics, especially for complex humanoids, many different coordinate frames exist (e.g., world frame, base link frame, camera frame, end-effector frame). TF2 allows you to:
-   **Represent Transforms:** Store the 3D position and orientation (transform) of each frame relative to its parent.
-   **Query Transforms:** Ask for the transform between any two frames at any point in time.
-   **Broadcast Transforms:** Nodes publish the transforms they know (e.g., base_link to odom).

For humanoid robots, TF2 is critical for:
-   **Sensor Fusion:** Combining data from sensors defined in different frames.
-   **Motion Planning:** Transforming desired end-effector poses into joint commands.
-   **Perception:** Locating detected objects in the robot's base frame or world frame.

By understanding and effectively utilizing URDF and TF2, developers can accurately model, simulate, and control the complex kinematics and dynamics of humanoid robots, forming the bedrock for advanced behaviors and interactions.
