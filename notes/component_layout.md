# Layout for React Native Components
Each component can be initialized by specifying certain properties (called Props) that vary from component to component.

We show how to read the React Native documentation
https://reactnative.dev/docs/components-and-apis
about the core components and focus on the following ones:

* View  - this is the main component we use to layout other components
* Text - this is add text to a view. We can include Text components inside Text Components
* TextInput
* Image
* ScrollView
* Stylesheet
* Button
* 
Next we look at the [style prop](https://reactnative.dev/docs/style) 
and especially the flex box properties.

Here is a cheat sheet with many of the style properties:
https://github.com/vhpoet/react-native-styling-cheat-sheet

and we look at the key concept of Flex boxes in layout
https://reactnative.dev/docs/flexbox

## Key style concepts:
* flex:N
* flexdirection:{row, column}
* justifyContent ....   positioning of elements on primary axis (row or column)
* alignItems ... positioning of elements on secondary axis (column or row)

* width: "auto",number, percent
* height: "auto", number, percent

* flexWrap:flexWrap ... dealing with overflow along primary axis
* alignContent .. positioning along secondary axis when using flexWrap

Axis independent way to specify size of an element.
* flexBasis
* flexGrow
* flexShrink
