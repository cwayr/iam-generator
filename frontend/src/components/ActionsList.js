import { Box, Spinner, Button, Tip, Text, PageHeader, Page } from "grommet";
import { CircleInformation } from "grommet-icons";

const ActionsList = ({
  actionsData,
  setActionsData,
  stagedStatement,
  setStagedStatement,
}) => {
  const handleActionSelection = (actionName) => {
    console.log(actionName);

    // get access level of selected action
    let accessLevel;
    for (const key in actionsData) {
      for (let actionDetails of actionsData[key]) {
        if (actionDetails.name === actionName) {
          accessLevel = key;
        }
      }
    }

    // update actionsData
    let poppedAction;
    const updatedArray = actionsData[accessLevel].map((val) => {
      if (val.name === actionName) {
        val.disabled = true;
        poppedAction = val;
      }
      return val;
    });

    setActionsData((existingValues) => ({
      ...existingValues,
      [accessLevel]: updatedArray,
    }));

    // update staging area
    let stagedActions = stagedStatement.actions;
    if (!stagedActions[accessLevel]) {
      stagedActions[accessLevel] = [];
    }
    stagedActions[accessLevel].push(poppedAction);

    // let updatedStageAccess = stagedStatement.actions;
    // if (!updatedStageAccess.includes(accessLevel))
    //   updatedStageAccess.push(accessLevel);

    setStagedStatement((existingValues) => ({
      ...existingValues,
      actions: stagedActions,
    }));
  };

  const actionsDataKeys = Object.keys(actionsData);
  console.log("☄️ ACTIONSDATA in actionslist", actionsData);

  if (actionsDataKeys.length) {
    return (
      <Box margin={{ top: "small", bottom: "medium" }}>
        <Button
          color="primary"
          label="ADD ALL ACTIONS (*)"
          size="small"
          pad="xsmall"
          alignSelf="center"
          hoverIndicator
          value="*"
          fill={false}
          plain
          reverse
        />
        {actionsDataKeys.map((accessLevel) => {
          console.log("LOOPING THROUGH KEY:", accessLevel);
          return (
            <Box
              justify="stretch"
              fill="horizontal"
              align="start"
              alignContent="start"
              direction="row"
              wrap
              overflow="auto"
            >
              <Page>
                <PageHeader
                  title={accessLevel}
                  actions={
                    <Button
                      label="Add all"
                      color="primary"
                      size="small"
                      primary
                    />
                  }
                  size="small"
                  margin={{
                    left: "small",
                    top: "xxsmall",
                    right: "xxsmall",
                    bottom: "xxsmall",
                  }}
                />
              </Page>
              {actionsData[accessLevel].map((action) => {
                console.log("LOOPING THROUGH ACTION:", action);
                return (
                  <Box key={action.name + Date.now()}>
                    <Button
                      color="primary"
                      label={action.name}
                      size="small"
                      fill={false}
                      hoverIndicator
                      margin="xxsmall"
                      disabled={action.disabled}
                      reverse
                      value={action.name}
                      onClick={(e) =>
                        handleActionSelection(e.currentTarget.value)
                      }
                      icon={
                        <Tip
                          plain
                          dropProps={{ align: { bottom: "top" } }}
                          size="small"
                          content={
                            <Box
                              pad="small"
                              gap="small"
                              margin="small"
                              width={{ max: "medium" }}
                              background="tertiary"
                              round="small"
                            >
                              <Text size="small">{action.description}</Text>
                            </Box>
                          }
                        >
                          <Box round="small">
                            <CircleInformation
                              size="small"
                              background="secondary"
                            />
                          </Box>
                        </Tip>
                      }
                    />
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>
    );
  } else {
    return <Spinner margin="medium" />;
  }
};

export default ActionsList;
