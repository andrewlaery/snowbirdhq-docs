# Feature Implementation Command

Implement a complete feature: $ARGUMENTS

## Planning Phase
1. **Think hard** about the implementation approach before coding
2. Consider architecture, dependencies, and integration points
3. Identify potential challenges and edge cases
4. Plan the testing strategy
5. Save the implementation plan to `feature-plans/[feature-name].md`

## Implementation Process
1. Create and checkout feature branch: `feature-[feature-name]`
2. Implement the core functionality following project standards
3. Add comprehensive tests (unit, integration, E2E as appropriate)
4. Ensure proper error handling and edge case coverage
5. Add proper TypeScript types and interfaces
6. Follow the existing code patterns and architecture

## Quality Checks
Before committing:
1. Compile the code and fix any compilation errors
2. Run all tests and ensure they pass with good coverage
3. Run linter and formatter
4. Test the feature manually in development
5. Verify integration with existing features
6. Check performance implications

## Documentation Requirements
1. Update relevant documentation files
2. Add inline code comments for complex logic
3. Create or update API documentation if applicable
4. Add feature documentation to project docs
5. Include usage examples where helpful

## Integration Considerations
1. Ensure feature works with existing state management
2. Verify proper database schema changes if needed
3. Check impact on existing API contracts
4. Test cross-feature interactions
5. Verify responsive design and accessibility

## Final Steps
1. Create detailed commit with descriptive message
2. Verify feature branch is ready for review/merge
3. Document any breaking changes or migration notes
4. Note any follow-up tasks or future improvements needed

Remember: Focus on building complete, production-ready features that integrate seamlessly with the existing codebase.