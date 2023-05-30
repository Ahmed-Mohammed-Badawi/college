// FRAMEWORK
import React from "react";
// SELECT PACKAGE
import Select from "react-select";
// import "./technologies.css";

const options = [
    { value: "angular", label: "Angular" },
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "ember", label: "Ember.js" },
    { value: "backbone", label: "Backbone.js" },
    { value: "jquery", label: "jQuery" },
    { value: "nodejs", label: "Node.js" },
    { value: "express", label: "Express.js" },
    { value: "hapi", label: "Hapi.js" },
    { value: "koa", label: "Koa.js" },
    { value: "nestjs", label: "Nest.js" },
    { value: "meteor", label: "Meteor.js" },
    { value: "loopback", label: "LoopBack" },
    { value: "strapi", label: "Strapi" },
    { value: "sails", label: "Sails.js" },
    { value: "laravel", label: "Laravel" },
    { value: "symfony", label: "Symfony" },
    { value: "django", label: "Django" },
    { value: "flask", label: "Flask" },
    { value: "spring", label: "Spring" },
    { value: "express-gateway", label: "Express Gateway" },
    { value: "graphql", label: "GraphQL" },
    { value: "apollo", label: "Apollo" },
    { value: "relay", label: "Relay" },
    { value: "nextjs", label: "Next.js" },
    { value: "nuxtjs", label: "Nuxt.js" },
    { value: "gatsby", label: "Gatsby" },
    { value: "ionic", label: "Ionic" },
    { value: "native-script", label: "NativeScript" },
    { value: "flutter", label: "Flutter" },
    { value: "react-native", label: "React Native" },
    { value: "xamarin", label: "Xamarin" },
    { value: "phonegap", label: "PhoneGap" },
    { value: "cordova", label: "Apache Cordova" },
    { value: "electron", label: "Electron" },
    { value: "nwjs", label: "NW.js" },
    { value: "ionic-capacitor", label: "Ionic Capacitor" },
    { value: "ionic-cordova", label: "Ionic Cordova" },
    { value: "quasar", label: "Quasar" },
    { value: "vuetify", label: "Vuetify" },
    { value: "tailwind", label: "Tailwind CSS" },
    { value: "bootstrap", label: "Bootstrap" },
    { value: "foundation", label: "Foundation" },
    { value: "semantic-ui", label: "Semantic UI" },
    { value: "material-ui", label: "Material UI" },
    { value: "bulma", label: "Bulma" },
    { value: "antd", label: "Ant Design" },
    { value: "primefaces", label: "PrimeFaces" },
    { value: "jss", label: "JSS" },
];

const customStyles = {
    control: (provided) => ({
        ...provided,
        height: "100%",
        borderRadius: "none",
        borderColor: "#ced4da",
        boxShadow: "none",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? "#f8f9fa" : "white",
        color: "black",
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        paddingTop: 0,
        paddingBottom: 0,
    }),
};

const App = ({ changed, value }) => {

    function searchArray(array1, array2) {
        // Filter the array of objects by checking if their value property is in the first array
        return  array2.filter((obj) =>
            array1.includes(obj.value)
        );
    }

    const selectedValues = searchArray(value, options)

    return (
        <div className='container'>
            <Select
                value={selectedValues}
                onChange={changed}
                options={options}
                styles={customStyles}
                isClearable={true}
                isMulti
                isSearchable={true}
                placeholder='Select a technology'
            />
        </div>
    );
};

export default App;
