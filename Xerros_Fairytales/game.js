const scene = document.getElementById("scene-text");
const image = document.getElementById("scene-image");
const passage = document.getElementById("passage-text");
const options = document.getElementById("option-buttons");
// const storyBtn = document.getElementById("story-info");
// const loreBtn = document.getElementById("lore-links");
// const restartBtn = document.getElementById("restart-link");
let state = {}

//Starts the game
function startGame() {
    state = {}
    showPassageNode(1)
}

//Creates passage text, and options from a list, and displays them.
function showPassageNode(passageNodeIndex) {
    const passageNode = passageNodes.find(passageNode => passageNode.id === passageNodeIndex)

    scene.innerHTML = passageNode.sceneText
    passage.innerHTML = passageNode.passage // Might need to change variables (note to self)
    image.src = passageNode.imageURL
    image.style.visibility = "visible"

    while (options.firstChild) {
        options.removeChild(options.firstChild)
    }

    passageNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('option-btn')
            button.addEventListener('click', () => selectOption(option))
            options.appendChild(button) // Figure out how to do the same with the menu buttons
        }
    });
}

//Will show options if they meet the requirements
function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

// // I overthought about how to make the side buttons function for over an hour, nice.. (come back to this when you figure out a save/load system?)
// //Story Button
// storyBtn.onclick = function () {
//     showPassageNode(2)
// }
// //Lore Button
// loreBtn.onclick = function () {
//     showPassageNode(2)
// }
// //Restart Button
// restartBtn.onclick = function () {
//     showPassageNode(4)
// }


//Progressed the current node to the next when an option is chosen.
function selectOption(option) {
    const nextPassageNodeID = option.nextPassageNode

    //Use -1 for the option value to start game
    if (nextPassageNodeID <= 0){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showPassageNode(nextPassageNodeID)


}

const passageNodes = [
    // {
    //     id: 0,
    //     sceneText: "",
    //     passage: "",
    //     imageURL: "",
    //     options: [
    //         {
    //             text: "",
    //             requiredState: { stateIsSet : true },
    //             setState: { stateIsSet: true},
    //             linkURL: "",
    //             nextPassageNode: 0,
    //         }
    //     ]
    // },
    {
        //Landing Page
        id: 1,
        sceneText: "Welcome to Xerro's Fairytales [DEMO]",
        passage: "<p>Note: I'm working on a save/load feature, and the side panel, so they'll hopefully be functional soon enough.</p><p>=============================================================</p><p>This is, and will be, a collection of stories that you can interact with.</p><p>You take the role of Xerro, a scholar, who is telling stories to children around a bonfire.</p>",
        imageURL: 'scenes/test.png',
        options: [
            {
                text: "Start the Storytelling",
                nextPassageNode: 5,
            }
        ]
    },
    {
        // Story Link
        id: 2,
        sceneText: "",
        passage: "",
        imageURL: '',
        options: [
            {
                text: "",
                nextPassageNode: 0,
            }
        ]
    },
    {
        // Lore Link
        id: 3,
        sceneText: '',
        passage: '',
        imageURL: '',
        options: [
            {
                text: "",
                nextPassageNode: 5,
            }
        ]
    },
    {
        // Restart Link
        id: 4,
        sceneText: '',
        passage: '',
        imageURL: '',
        options: [
            {
                text: "",
                nextPassageNode: 5,
            }
        ]
    },
    {
        id: 5,
        sceneText: "Story Selection",
        passage: "<p>\"Xerro, can you tell us a story?\" said a young child. As you look around, more children are looking at you with eyes asking the same question.</p> <p>What story do you think you remember well enough to recite to the children.</p>" ,
        imageURL: "scenes/scene_select.png",
        options: [
            {
                text: "My encounter with the \"Turned\"",
                nextPassageNode: 6,
            },
            {
                text: "I̶ ̶f̴o̸r̶g̷e̶t̴ ̸t̵h̸e̵ ̷s̷t̵o̶r̸y̶",
                nextPassageNode: -1,
            },
            {
                text: "I̶ ̶f̴o̸r̶g̷e̶t̴ ̸t̵h̸e̵ ̷s̷t̵o̶r̸y̶",
                nextPassageNode: -1,
            },
            {
                text: "I̶ ̶f̴o̸r̶g̷e̶t̴ ̸t̵h̸e̵ ̷s̷t̵o̶r̸y̶",
                nextPassageNode: -1,
            }

        ]
    },
    {
        id: 6,
        sceneText: 'The "Turned"',
        passage: 'You chose to tell about your encounter with the "Turned", creatures that seem to have been tortured and genetically altered. <p> You try to recall the night it started.</p>',
        imageURL: 'scenes/test.png',
        options: [
            {
                text: "It was a nice, summer evening.",
                setState: { setSummer : true } ,
                nextPassageNode: 13,
            },
            {
                text: "It was a cold, winter night.",
                setState: { setWinter : true } ,
                nextPassageNode: 7,
            }
        ]
    },
    {
        id: 7,
        sceneText: "The \"Turned\"",
        passage: "\"It was a cold, and wintry night,\" you said. You shivered to show the children how cold it was, and they laughed. <p>\"Before I left Akashrikk, I knew I was heading out to meet with an informant, and so I headed out...\"",
        imageURL: "scenes/test.png",
        options: [
            {
                text: "\"...Alone.\"",
                nextPassageNode: 14,
            },
            {
                text:"\"...With a group.\"",
                nextPassageNode: 8,
            }
        ]
    },
    {
        id: 8,
        sceneText: "The \"Turned\" - Caravan",
        passage: "\"Yeah, I headed out with a caravan. I figured it'd give me a good amount of coin, and a safer route to my informant.\" You mentioned it was heading towards Ve'Neylah, which was across the world. Did you make it?",
        imageURL: "scenes/test.png",
        options: [
            {
                text: "\"The caravan made it to Ve'Neylah.\"",
                nextPassageNode: 15,
            },
            {
                text: "\"The caravan didn't make it to Ve'Neylah.\"",
                nextPassageNode: 9,
            }
        ]
    },
    {
        id: 9,
        sceneText: "The \"Turned\" - Caravan / Ambushed",
        passage: "\"It was so dark, and we didn't even consider anyone would be after us. It was a dumb mistake, because we got ambushed.\" <p>Maybe you should spare the details, this is a story you're telling children after all..",
        imageURL: "scenes/test.png",
        options: [
            {
                text: "Spare the details.",
                nextPassageNode: 12,
            },
            {
                text: "Tell the details.",
                nextPassageNode: 10,
            }
        ]
    },
    {
        id: 10,
        sceneText: "The \"Turned\" - Caravan / Ambushed",
        passage: "\"It started slow. At first we hadn't noticed, but once we noticed time felt slower, the first caravan got thrown off the road.\"<p> \"Before we could react, we felt paralyzed for forever, then we were thrown off the road too. You could tell everyone wanted to scream, especially from all the bloodshed, yet you couldn't hear anyone. It was horrifying.\"",
        imageURL: "scenes/test.png",
        options: [
            {
                text: "I survived..",
                nextPassageNode: 11,
            }
        ]
    },
    {
        id: 11,
        sceneText: "The \"Turned\" - Caravan / Survived",
        passage: "\"Somehow, I survived. I managed to find my way back here, after I decided that the information I was looking for was not worth my life, yet.\"",
        imageURL: "scenes/test.png",
        options: [
            {
                text: "The End",
                requiredState: (currentState) => currentState.setWinter,
                nextPassageNode: 100,
            },
            {
            text: "The End",
            requiredState: (currentState) => currentState.setSummer,
            nextPassageNode: 101,
            }
        ]
    },
    {
        id: 12,
        sceneText: "The \"Turned\" - Survived",
        passage: "\"All that matters though, is that I survived. I didn't continute on the journey, I came back home.\"",
        imageURL: "scenes/test.png",
        options: [
            {
                text: "The End",
                nextPassageNode: 101,
            }
        ]
    },
    {
        id: 13,
        sceneText: "The \"Turned\"",
        passage: "\"It was a nice, summer evening,\" you said. You mentioned the beauty of the sunset, and they smiled. <p>\"Before I left Akashrikk, I knew I was heading out to meet with an informant, and so I headed out...\"",
        imageURL: "scenes/test.png",
        options: [
            {
                text: "\"...Alone.\"",
                nextPassageNode: 14,
            },
            {
                text:"\"...With a group.\"",
                nextPassageNode: 8,
            }
        ]
    },
    {
        id: 14,
        sceneText: "The \"Turned\" - Alone",
        passage: "\"Yeah, I headed out alone. I travelled at night, because I'd be less visible to most people, and I was traveling across the world.\" <p> \"But in the darkness, it made it a lot harder to notice something watching me. It attacked, but I managed to get away. I lost a few things, but..\"",
        imageURL: "scenes/test.png",
        options: [
            {
                text: "I survived.",
                nextPassageNode: 12,
            }
        ]
    },
    {
        id: 15,
        sceneText: "The \"Turned\" - Caravan",
        passage: "\"The caravan made it to Ve'Neylah, and we delivered our cargo. Once we got paid, I headed to see my informant. The information turned out to be wrong, so I headed home.\"",
        imageURL: "scenes/test.png",
        options: [
            {
                text: "The End",
                nextPassageNode: 101,
            }
        ]
    },
    {
        id: 100,
        sceneText: "The \"Turned\" - Canon Ending",
        passage: "Congrats. You got the ending that correctly told the story of Xerro's encounter with the Turned. Feel free to check out a different path.",
        imageURL: "scenes/test.png",
        options: [
            {
                text: "Restart",
                nextPassageNode: -1,
            }
        ]
    },
    {
        id: 101,
        sceneText: "The \"Turned\" - Non-Canon Ending",
        passage: "You almost got it, but this isn't the correct ending. Feel free to try again, with a different path.",
        imageURL: "scenes/test.png",
        options: [
            {
                text: "Restart",
                nextPassageNode: -1,
            }
        ]
    },
]

startGame()

