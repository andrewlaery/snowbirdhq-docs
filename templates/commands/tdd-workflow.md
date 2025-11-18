# Test-Driven Development Workflow

Implement Test-Driven Development (TDD) for: $ARGUMENTS

This is Anthropic's favorite workflow for changes that are easily verifiable with tests.

## Phase 1: Write Tests First
**IMPORTANT**: We are doing Test-Driven Development. Avoid creating mock implementations, even for functionality that doesn't exist yet.

1. **Write Comprehensive Tests**:
   - Write tests based on expected input/output pairs for $ARGUMENTS
   - Cover both happy path and edge cases
   - Be explicit about expected behavior
   - Include integration tests if applicable

2. **Focus on Test Quality**:
   - Ensure tests are clear and maintainable
   - Use descriptive test names that explain the behavior
   - Avoid testing implementation details
   - Make sure tests will fail when functionality doesn't exist

3. **Document Test Strategy**:
   - Explain what each test validates
   - Note any testing patterns or conventions used
   - Identify areas that need additional test coverage

## Phase 2: Verify Tests Fail
**DO NOT WRITE IMPLEMENTATION CODE YET**

1. **Run the Tests**:
   - Execute all tests and confirm they fail
   - Verify failures are for the right reasons (missing functionality)
   - Fix any test setup or syntax issues

2. **Validate Test Logic**:
   - Ensure failing tests accurately represent desired behavior
   - Check that test assertions are correct
   - Confirm tests will pass when implementation is correct

## Phase 3: Commit Tests
**Commit the tests when satisfied with them**

1. **Review Test Quality**:
   - Double-check test coverage and clarity
   - Ensure tests follow project conventions
   - Verify no implementation code was accidentally included

2. **Create Test Commit**:
   - Commit only the tests
   - Write clear commit message explaining test scope
   - Reference the feature or issue being implemented

## Phase 4: Implement to Pass Tests
**NOW write the code to make tests pass**

1. **Focus on Making Tests Pass**:
   - Write minimal code needed to make tests pass
   - Do NOT modify the tests during implementation
   - Keep going until all tests pass

2. **Iterative Implementation**:
   - Write code, run tests, adjust code, run tests again
   - Focus on one failing test at a time
   - Refactor only after tests are passing

3. **Use Subagents for Verification**:
   - Use independent subagents to verify implementation quality
   - Have subagents check that implementation isn't overfitting to tests
   - Ensure the solution solves the general problem, not just the test cases

## Phase 5: Verify and Refine
**Ensure implementation is robust and maintainable**

1. **Comprehensive Testing**:
   - Run full test suite to ensure no regressions
   - Verify all new tests pass consistently
   - Check test coverage meets project standards

2. **Code Quality Review**:
   - Review implementation for clarity and maintainability
   - Ensure code follows project standards and patterns
   - Refactor if needed while maintaining green tests

3. **Integration Verification**:
   - Test integration with existing codebase
   - Verify no breaking changes to other functionality
   - Run linting and type checking

## Phase 6: Commit Implementation
**Commit the code once satisfied with changes**

1. **Final Verification**:
   - All tests pass
   - Code quality meets standards
   - No regressions introduced

2. **Create Implementation Commit**:
   - Commit implementation code
   - Write detailed commit message
   - Reference test commit and explain implementation approach

## Success Criteria
- [ ] Comprehensive tests written first
- [ ] Tests fail appropriately before implementation
- [ ] Tests committed separately from implementation
- [ ] Implementation makes all tests pass
- [ ] No tests were modified during implementation
- [ ] Subagents verified implementation quality
- [ ] Final implementation is robust and maintainable

## Benefits of This Approach
- **Clear Requirements**: Tests define exactly what needs to be built
- **Better Design**: Writing tests first leads to better API design
- **Confidence**: Green tests provide confidence in correctness
- **Regression Protection**: Tests prevent future breaking changes
- **Documentation**: Tests serve as living documentation

## Claude Performance Notes
- Claude performs best when it has clear targets to iterate against
- Tests provide expected outputs that Claude can work toward
- The iterative nature (code → test → adjust) plays to Claude's strengths
- Subagent verification helps ensure robust implementations

Remember: **TDD becomes even more powerful with agentic coding** - the clear targets and iterative feedback loops maximize Claude's effectiveness.