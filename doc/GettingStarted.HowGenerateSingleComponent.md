# Table Of Contents
{TOC}

# Create a Component

The UE platform è strongly based on [Angular 1 Components](https://docs.angularjs.org/guide/component) and promote their use in Application development. A **Component** is a special kind of **directive** that uses a simpler configuration which is suitable for a component-based application structure.

This enable your web application to be written following a way that's similar to using **Web Components** or using **Angular 2**'s style of application architecture.

## Advantages of Components:

* Simpler configuration than plain directives
* Promote sane defaults and best practices
* Optimized for component-based architecture
* Writing component directives will make it easier to upgrade to Angular 2

### 1.) Use the "gen:component" task for create a new Component
> A new component **must belong to a Module** so we have to be sure to identify an existent **owner Module**

```bash

gulp gen:component --name <Snake Cased DirectiveName Without Prefix>
                   --path <Existing Module Path>
                   --module <Module Name>

```

For example, if we would create a new Component named **test** belong to **example** module into module's directory **example-module** we have to run the following task


```bash

gulp gen:component --name test --path example-module --module example

```

Such task will generate  the following assets:

```bash

  app  
  |--components  
    |--example-module  
      # Component's assets
      |-- test.component.html      # component template view  
      |-- test.component.ts        # component definition  
      |-- test.component.spec.ts   # component unit test specs   
      # Module's assets
      |-- example.scss                # styles   
      |-- example.ts                  # entry point for imports / main definition   
      |-- example.module.ts           # module definition  
      |-- example.module.spec.ts      # module unit test specs  

```

## 2.) Import the new component to the owner module

Component automatically register itself to the owned module, the only step that we have to do is **import the new component definition within module entry point**. It is enough to open **module definition file** (eg. ```example.ts```) and add the following import directive

Assuming, for example, that the component's name is **test** then:

```javascript

import './test.component';

```
## 3.) Start working with Component

The component's definition is in ```.component.ts``` file and it manages a view contained in ```.component.html``` file.

Assuming, for example,  that the component's name is **test** then we will have

file | Description
```test.component.ts``` | **Component Definition** where we have to develop Component's behavior
```test.component.html``` | **Component View** that contains the **Component's Graphical Interface** implemented as an **HTML template**

Moreover the component will be available to the application through a new tag named ```<tsfn-test></tsfn-test>```


# References

* [Angular 1 Component](https://docs.angularjs.org/guide/component)
* [Platform Accelerators][Accelerators]
